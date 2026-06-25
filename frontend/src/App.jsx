import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";

// Components
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";

// Pages
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import TripsPage from "./pages/TripsPage/TripsPage.jsx";
import TripDetailsPage from "./pages/TripDetailsPage/TripDetailsPage.jsx";
import CreateTripPage from "./pages/CreateTripPage/CreateTripPage.jsx";
import EditTripPage from "./pages/EditTripPage/EditTripPage.jsx";
import MyTripsPage from "./pages/MyTripsPage/MyTripsPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage.jsx";
import ChatPage from "./pages/ChatPage/ChatPage.jsx";

// Informational Pages
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage/PrivacyPolicyPage.jsx";
import TermsOfServicePage from "./pages/TermsOfServicePage/TermsOfServicePage.jsx";
import SafetyGuidelinesPage from "./pages/SafetyGuidelinesPage/SafetyGuidelinesPage.jsx";
import HelpCenterPage from "./pages/HelpCenterPage/HelpCenterPage.jsx";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage.jsx";

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Loader styling inside App.css
const App = () => {
  const { loading } = useAuth();

  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/trips" element={<TripsPage />} />
            <Route path="/trips/:id" element={<TripDetailsPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/safety" element={<SafetyGuidelinesPage />} />
            <Route path="/support" element={<HelpCenterPage />} />
            <Route path="/about" element={<AboutUsPage />} />

            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <ProtectedRoute>
                  <EditProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-trip"
              element={
                <ProtectedRoute>
                  <CreateTripPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-trip/:id"
              element={
                <ProtectedRoute>
                  <EditTripPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-trips"
              element={
                <ProtectedRoute>
                  <MyTripsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat/:tripId"
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
            />

            {/* Catch-all Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

// CSS overrides for basic layout alignment in this file
const styleTag = document.createElement("style");
styleTag.innerHTML = `
  .app-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .main-content {
    flex: 1; /* Stretch and push footer down */
    padding-top: 80px; /* Navbar offset */
    padding-bottom: 80px; /* Ensure content never overlaps/merges with footer */
  }
  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: var(--bg-primary);
  }
  .loader {
    border: 4px solid rgba(255, 255, 255, 0.1);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border-left-color: var(--accent-primary);
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleTag);

export default App;
