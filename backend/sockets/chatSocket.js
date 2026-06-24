const Conversation = require("../models/Conversation");
const Trip = require("../models/Trip");
const Message = require("../models/Message");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Active user tracking: Map of tripId -> Map of userId -> Set of socketIds
const activeTripUsers = new Map();

// Map of socketId -> { userId, tripId } for quick cleanup on disconnect
const socketMap = new Map();

const initChatSocket = (io) => {
  // Authentication middleware for Socket.io connections
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.query.token;

      if (!token) {
        return next(new Error("Authentication error: No token provided"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
      const user = await User.findById(decoded.id).select("name profileImage");

      if (!user) {
        return next(new Error("Authentication error: User not found"));
      }

      socket.user = user;
      next();
    } catch (err) {
      console.error("Socket authentication error:", err.message);
      next(new Error("Authentication error: Token invalid or expired"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id} (User: ${socket.user.name})`);

    // Handle joining a trip room
    socket.on("join_trip", async ({ tripId }) => {
      try {
        if (!tripId) return;

        // Verify the trip exists and the user is a member
        const trip = await Trip.findById(tripId);
        if (!trip) {
          return socket.emit("error_message", { message: "Trip not found" });
        }

        if (!trip.members.includes(socket.user._id.toString())) {
          return socket.emit("error_message", { message: "You are not a member of this trip" });
        }

        const userId = socket.user._id.toString();

        // Join room
        socket.join(tripId);
        socketMap.set(socket.id, { userId, tripId });

        // Update online user tracker
        if (!activeTripUsers.has(tripId)) {
          activeTripUsers.set(tripId, new Map());
        }
        const tripUsers = activeTripUsers.get(tripId);
        if (!tripUsers.has(userId)) {
          tripUsers.set(userId, new Set());
        }
        tripUsers.get(userId).add(socket.id);

        console.log(`User ${socket.user.name} joined room ${tripId}`);

        // Broadcast updated list of online user IDs in this trip
        io.to(tripId).emit("online_users", Array.from(tripUsers.keys()));
      } catch (err) {
        console.error("Error joining trip room:", err);
      }
    });

    // Handle incoming messages
    socket.on("send_message", async ({ tripId, text }) => {
      try {
        const { userId } = socketMap.get(socket.id) || {};
        if (!userId || !tripId || !text) return;

        // Find the conversation
        const conversation = await Conversation.findOne({ trip: tripId });
        if (!conversation) {
          return socket.emit("error_message", { message: "Conversation not found" });
        }

        // Double check membership
        if (!conversation.members.includes(userId)) {
          return socket.emit("error_message", { message: "You do not have access to this chat" });
        }

        // Create and save message
        const message = await Message.create({
          conversation: conversation._id,
          sender: userId,
          text,
        });

        // Populate sender info
        const populatedMessage = await Message.findById(message._id).populate(
          "sender",
          "name profileImage rating"
        );

        // Emit message to everyone in the room (including sender)
        io.to(tripId).emit("receive_message", populatedMessage);
      } catch (err) {
        console.error("Error sending message:", err);
      }
    });

    // Handle typing indicator
    socket.on("typing", ({ tripId }) => {
      const socketData = socketMap.get(socket.id);
      if (socketData && socketData.tripId === tripId) {
        socket.to(tripId).emit("user_typing", {
          userId: socketData.userId,
          name: socket.user.name,
          isTyping: true,
        });
      }
    });

    // Handle stop typing indicator
    socket.on("stop_typing", ({ tripId }) => {
      const socketData = socketMap.get(socket.id);
      if (socketData && socketData.tripId === tripId) {
        socket.to(tripId).emit("user_typing", {
          userId: socketData.userId,
          name: socket.user.name,
          isTyping: false,
        });
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      const socketData = socketMap.get(socket.id);
      if (socketData) {
        const { userId, tripId } = socketData;
        socketMap.delete(socket.id);

        const tripUsers = activeTripUsers.get(tripId);
        if (tripUsers && tripUsers.has(userId)) {
          const sockets = tripUsers.get(userId);
          sockets.delete(socket.id);

          // If no more active sockets for this user in this room, remove them from online list
          if (sockets.size === 0) {
            tripUsers.delete(userId);
          }

          // Cleanup trip entry if empty
          if (tripUsers.size === 0) {
            activeTripUsers.delete(tripId);
          } else {
            // Broadcast updated online list
            io.to(tripId).emit("online_users", Array.from(tripUsers.keys()));
          }
        }
      }
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};

module.exports = initChatSocket;
