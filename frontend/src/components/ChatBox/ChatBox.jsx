import React, { useState, useEffect, useRef } from "react";
import { Send, User, Circle, Compass } from "lucide-react";
import { useSocket } from "../../context/SocketContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import axios from "axios";
import styles from "./ChatBox.module.css";
import Button from "../Button/Button.jsx";

const ChatBox = ({ tripId, tripMembers = [] }) => {
  const socket = useSocket();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [onlineUserIds, setOnlineUserIds] = useState([]);
  const [typers, setTypers] = useState({}); // userId -> name
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const isTypingRef = useRef(false);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch chat history on mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/messages/${tripId}`);
        if (res.data.success) {
          setMessages(res.data.messages);
          setError("");
        }
      } catch (err) {
        console.error("Error loading chat history:", err);
        setError(err.response?.data?.message || "Failed to load chat history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [tripId]);

  // Set up socket listeners
  useEffect(() => {
    if (!socket || !tripId) return;

    // Join room
    socket.emit("join_trip", { tripId });

    // Handle incoming messages
    socket.on("receive_message", (message) => {
      // Add message if it matches the current conversation's conversation ID
      setMessages((prev) => [...prev, message]);
    });

    // Handle online users sync
    socket.on("online_users", (userIds) => {
      setOnlineUserIds(userIds);
    });

    // Handle typing indicator updates
    socket.on("user_typing", ({ userId, name, isTyping }) => {
      setTypers((prev) => {
        const next = { ...prev };
        if (isTyping) {
          next[userId] = name;
        } else {
          delete next[userId];
        }
        return next;
      });
    });

    // Handle error message from socket server
    socket.on("error_message", ({ message }) => {
      setError(message);
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off("receive_message");
      socket.off("online_users");
      socket.off("user_typing");
      socket.off("error_message");
    };
  }, [socket, tripId]);

  // Scroll on message length update
  useEffect(() => {
    scrollToBottom();
  }, [messages, typers]);

  // Typing event handler
  const handleInputChange = (e) => {
    setInputText(e.target.value);

    if (!socket) return;

    // Trigger typing event
    if (!isTypingRef.current && e.target.value.trim() !== "") {
      isTypingRef.current = true;
      socket.emit("typing", { tripId });
    }

    // Reset stop typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (isTypingRef.current) {
        isTypingRef.current = false;
        socket.emit("stop_typing", { tripId });
      }
    }, 2000);
  };

  // Submit/Send message handler
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !socket) return;

    // Clear typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    isTypingRef.current = false;
    socket.emit("stop_typing", { tripId });

    // Send message to server
    socket.emit("send_message", { tripId, text: inputText.trim() });
    setInputText("");
  };

  const formatTime = (dateStr) => {
    return new Date(dateStr).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className="loader"></div>
        <p>Loading messages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.errorContainer} glass-panel`}>
        <Compass size={48} className={styles.errorIcon} />
        <h3>Access Restricted</h3>
        <p>{error}</p>
      </div>
    );
  }

  // Get active typers array
  const activeTypersList = Object.values(typers).filter(Boolean);

  return (
    <div className={`${styles.chatContainer} glass-panel`}>
      {/* Sidebar: Online Members */}
      <div className={styles.sidebar}>
        <h4>Group Members</h4>
        <div className={styles.memberList}>
          {tripMembers.map((member) => {
            const isOnline = onlineUserIds.includes(member._id);
            return (
              <div key={member._id} className={styles.memberItem}>
                <div className={styles.avatarWrapper}>
                  <img
                    src={member.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                    alt={member.name}
                    className={styles.memberAvatar}
                  />
                  <Circle
                    size={10}
                    className={`${styles.statusDot} ${isOnline ? styles.online : styles.offline}`}
                  />
                </div>
                <div className={styles.memberInfo}>
                  <span className={styles.memberName}>{member.name}</span>
                  <span className={styles.memberStatus}>
                    {isOnline ? "online" : "offline"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={styles.chatArea}>
        {/* Messages Header */}
        <div className={styles.chatHeader}>
          <div>
            <h3>Trip Chat Room</h3>
            <p className={styles.chatHeaderSub}>
              {onlineUserIds.length} of {tripMembers.length} active now
            </p>
          </div>
        </div>

        {/* Message Log */}
        <div className={styles.messageLog}>
          {messages.length === 0 ? (
            <div className={styles.emptyChat}>
              <p>No messages yet. Send a message to start planning the trip!</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = msg.sender?._id === user?._id;
              const senderName = msg.sender?.name || "Unknown";
              const senderImg = msg.sender?.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150";

              return (
                <div
                  key={msg._id}
                  className={`${styles.messageWrapper} ${isMe ? styles.messageMe : styles.messageOther}`}
                >
                  {!isMe && (
                    <img
                      src={senderImg}
                      alt={senderName}
                      className={styles.messageAvatar}
                    />
                  )}
                  <div className={styles.messageContent}>
                    {!isMe && <span className={styles.messageSender}>{senderName}</span>}
                    <div className={styles.messageBubble}>
                      <p>{msg.text}</p>
                      <span className={styles.messageTime}>{formatTime(msg.createdAt)}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Typing Indicator */}
          {activeTypersList.length > 0 && (
            <div className={`${styles.messageWrapper} ${styles.messageOther}`}>
              <div className={styles.typingIndicatorWrapper}>
                <div className={styles.typingDots}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className={styles.typingText}>
                  {activeTypersList.join(", ")} {activeTypersList.length === 1 ? "is" : "are"}{" "}
                  typing...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className={styles.inputForm}>
          <input
            type="text"
            className={styles.textInput}
            placeholder="Type a message to your travel group..."
            value={inputText}
            onChange={handleInputChange}
          />
          <Button type="submit" variant="primary" className={styles.sendButton}>
            <Send size={16} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
