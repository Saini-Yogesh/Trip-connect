import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Compass, Briefcase, Plus, Calendar } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./MyTripsPage.module.css";
import TripCard from "../../components/TripCard/TripCard.jsx";
import Button from "../../components/Button/Button.jsx";

const MyTripsPage = () => {
  const { user } = useAuth();
  const [tripsData, setTripsData] = useState({ created: [], joined: [], requested: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("hosting"); // hosting, joined, pending

  const fetchMyTrips = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/trips/my-trips");
      if (res.data.success) {
        setTripsData({
          created: res.data.created || [],
          joined: res.data.joined || [],
          requested: res.data.requested || [],
        });
        setError("");
      }
    } catch (err) {
      console.error("Error loading my trips:", err);
      setError("Failed to load your trips. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyTrips();
    }
  }, [user]);

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <div className="loader"></div>
      </div>
    );
  }

  // Get active list based on tab
  const getActiveList = () => {
    switch (activeTab) {
      case "hosting":
        return tripsData.created;
      case "joined":
        return tripsData.joined;
      case "pending":
        return tripsData.requested;
      default:
        return [];
    }
  };

  const activeList = getActiveList();

  return (
    <div className={`${styles.pageContainer} container`}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h2>My Trips Dashboard</h2>
          <p>Manage the trips you are hosting, travel crew memberships, and pending requests.</p>
        </div>
        <Link to="/create-trip">
          <Button variant="primary">
            <Plus size={16} style={{ marginRight: 6 }} /> Plan a Trip
          </Button>
        </Link>
      </div>

      {/* Tabs Row */}
      <div className={styles.tabsRow}>
        <button
          onClick={() => setActiveTab("hosting")}
          className={`${styles.tabBtn} ${activeTab === "hosting" ? styles.tabActive : ""}`}
        >
          Hosting ({tripsData.created.length})
        </button>
        <button
          onClick={() => setActiveTab("joined")}
          className={`${styles.tabBtn} ${activeTab === "joined" ? styles.tabActive : ""}`}
        >
          Joined Crew ({tripsData.joined.length})
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`${styles.tabBtn} ${activeTab === "pending" ? styles.tabActive : ""}`}
        >
          Pending Requests ({tripsData.requested.length})
        </button>
      </div>

      {/* Dashboard display */}
      {error ? (
        <p className={styles.errorText}>{error}</p>
      ) : activeList.length === 0 ? (
        <div className={`${styles.emptyState} glass-panel`}>
          <Briefcase size={40} className={styles.emptyIcon} />
          {activeTab === "hosting" && (
            <>
              <h3>You are not hosting any trips</h3>
              <p>Create a trip plan and invite other solo travelers to join your journey!</p>
              <Link to="/create-trip">
                <Button variant="primary" style={{ marginTop: 8 }}>Create a Trip</Button>
              </Link>
            </>
          )}
          {activeTab === "joined" && (
            <>
              <h3>You haven't joined any travel crew</h3>
              <p>Browse trips created by others and request to join co-traveling plans.</p>
              <Link to="/trips">
                <Button variant="primary" style={{ marginTop: 8 }}>Explore Trips</Button>
              </Link>
            </>
          )}
          {activeTab === "pending" && (
            <>
              <h3>No pending requests</h3>
              <p>When you request to join a trip, your pending status will show up here.</p>
              <Link to="/trips">
                <Button variant="primary" style={{ marginTop: 8 }}>Explore Trips</Button>
              </Link>
            </>
          )}
        </div>
      ) : (
        <div className={styles.tripsGrid}>
          {activeList.map((trip) => (
            <TripCard key={trip._id} trip={trip} currentUser={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTripsPage;
