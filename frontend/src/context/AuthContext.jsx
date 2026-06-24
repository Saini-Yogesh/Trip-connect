import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Configure Axios baseURL from environment variables
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // Set Authorization header for Axios
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  // Load user data on startup if token exists
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("user");
      if (token && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          // Fetch fresh user data to verify token and sync profile data (e.g. rating updates)
          const res = await axios.get(`/api/users/${parsedUser._id}`);
          if (res.data.success) {
            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
          } else {
            logout();
          }
        } catch (err) {
          console.error("Session verification failed, logging out:", err.message);
          logout();
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [token]);

  // Login handler
  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      if (res.data.success) {
        const { token, user: userData } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(token);
        setUser(userData);
        return { success: true };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed. Please check your credentials.",
      };
    }
  };

  // Register handler
  const register = async (name, email, password, age, gender, city) => {
    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
        age: Number(age),
        gender,
        city,
      });
      if (res.data.success) {
        const { token, user: userData } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(token);
        setUser(userData);
        return { success: true };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed. Try again.",
      };
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  // Update profile handler
  const updateProfile = async (profileData) => {
    try {
      const res = await axios.put("/api/users/profile", profileData);
      if (res.data.success) {
        const updatedUser = res.data.user;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        return { success: true };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Failed to update profile.",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
