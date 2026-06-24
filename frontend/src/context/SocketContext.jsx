import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      // Connect socket with authentication token
      const newSocket = io(import.meta.env.VITE_API_URL || "", {
        auth: { token },
        transports: ["websocket", "polling"],
      });

      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("Socket connected to server");
      });

      newSocket.on("connect_error", (err) => {
        console.error("Socket connection error:", err.message);
      });

      return () => {
        newSocket.disconnect();
        console.log("Socket disconnected");
      };
    } else {
      setSocket(null);
    }
  }, [token]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
