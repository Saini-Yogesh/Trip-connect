import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronLeft, Compass, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./ChatPage.jsx.module.css";
import ChatBox from "../../components/ChatBox/ChatBox.jsx";
import Button from "../../components/Button/Button.jsx";

const ChatPage = () => {
  const { tripId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTripMembers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/trips/${tripId}`);
        if (res.data.success) {
          const tripData = res.data.trip;

          // Double check membership on frontend (backend enforces it too)
          const isMember = tripData.members.some((m) => m._id === user?._id);
          if (!isMember) {
            setError("You do not have access to this chat. Only approved trip members can chat.");
          } else {
            setTrip(tripData);
            setError("");
          }
        }
      } catch (err) {
        console.error("Error loading trip members for chat:", err);
        setError(err.response?.data?.message || "Failed to load chat workspace.");
      } finally {
        setLoading(false);
      }
    };

    if (user && tripId) {
      fetchTripMembers();
    }
  }, [tripId, user]);

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <div className="loader"></div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className={`${styles.errorContainer} container`}>
        <div className={`${styles.errorCard} glass-panel animate-fade-in`}>
          <AlertCircle size={48} className={styles.errorIcon} />
          <h3>Access Restricted</h3>
          <p>{error || "This conversation does not exist or you do not have permission to view it."}</p>
          <Link to={`/trips/${tripId || ""}`}>
            <Button variant="primary">Back to Trip Details</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.pageWrapper} container`}>
      {/* Navigation Headers */}
      <div className={styles.header}>
        <Link to={`/trips/${tripId}`} className={styles.backLink}>
          <ChevronLeft size={16} /> Back to Trip Details
        </Link>
        <h2>Group Chat &mdash; {trip.destination}</h2>
      </div>

      {/* Embedded ChatBox */}
      <div className={styles.chatWrapper}>
        <ChatBox tripId={tripId} tripMembers={trip.members || []} trip={trip} />
      </div>
    </div>
  );
};

export default ChatPage;
