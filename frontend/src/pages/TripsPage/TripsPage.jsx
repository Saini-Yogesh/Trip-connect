import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { Compass, Search, DollarSign, Calendar, SlidersHorizontal, RotateCcw } from "lucide-react";
import styles from "./TripsPage.module.css";
import TripCard from "../../components/TripCard/TripCard.jsx";
import Button from "../../components/Button/Button.jsx";
import Input from "../../components/Input/Input.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const TripsPage = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters state
  const [destination, setDestination] = useState(searchParams.get("destination") || "");
  const [maxBudget, setMaxBudget] = useState(searchParams.get("maxBudget") || "");
  const [startDate, setStartDate] = useState(searchParams.get("startDate") || "");

  const fetchTrips = async (paramsObj = {}) => {
    try {
      setLoading(true);
      
      // Build query string
      const query = new URLSearchParams();
      if (paramsObj.destination) query.append("destination", paramsObj.destination);
      if (paramsObj.maxBudget) query.append("maxBudget", paramsObj.maxBudget);
      if (paramsObj.startDate) query.append("startDate", paramsObj.startDate);

      const res = await axios.get(`/api/trips?${query.toString()}`);
      if (res.data.success) {
        setTrips(res.data.trips);
        setError("");
      }
    } catch (err) {
      console.error("Error loading trips:", err);
      setError("Failed to load trips. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch trips on mount and when query params change
  useEffect(() => {
    const params = {
      destination: searchParams.get("destination") || "",
      maxBudget: searchParams.get("maxBudget") || "",
      startDate: searchParams.get("startDate") || "",
    };
    
    // Sync state with URL params
    setDestination(params.destination);
    setMaxBudget(params.maxBudget);
    setStartDate(params.startDate);

    fetchTrips(params);
  }, [searchParams]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    
    const newParams = {};
    if (destination.trim()) newParams.destination = destination.trim();
    if (maxBudget.trim()) newParams.maxBudget = maxBudget.trim();
    if (startDate.trim()) newParams.startDate = startDate.trim();

    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setDestination("");
    setMaxBudget("");
    setStartDate("");
    setSearchParams({});
  };

  return (
    <div className={`${styles.pageContainer} container`}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h2>Explore Trips</h2>
          <p>Browse trips planned by fellow solo travelers and request to join their group.</p>
        </div>
        {user && (
          <Link to="/create-trip">
            <Button variant="primary">Create a Trip</Button>
          </Link>
        )}
      </div>

      {/* Filter Bar Panel */}
      <form onSubmit={handleFilterSubmit} className={`${styles.filterBar} glass-panel`}>
        <div className={styles.filterTitle}>
          <SlidersHorizontal size={16} />
          <span>Filters</span>
        </div>

        <div className={styles.filterInputs}>
          <div className={styles.inputCol}>
            <Search size={16} className={styles.inputIcon} />
            <input
              type="text"
              placeholder="Destination (e.g. Bali)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className={styles.filterInput}
            />
          </div>

          <div className={styles.inputCol}>
            <DollarSign size={16} className={styles.inputIcon} />
            <input
              type="number"
              placeholder="Max Budget ($)"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
              className={styles.filterInput}
            />
          </div>

          <div className={styles.inputCol}>
            <Calendar size={16} className={styles.inputIcon} />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={styles.filterInput}
            />
          </div>
        </div>

        <div className={styles.filterButtons}>
          <Button type="submit" variant="primary">
            Apply
          </Button>
          <Button type="button" variant="glass" onClick={handleResetFilters}>
            <RotateCcw size={14} style={{ marginRight: 6 }} /> Reset
          </Button>
        </div>
      </form>

      {/* Trips Display Grid */}
      {loading ? (
        <div className={styles.loaderWrapper}>
          <div className="loader"></div>
        </div>
      ) : error ? (
        <div className={styles.errorText}>{error}</div>
      ) : trips.length === 0 ? (
        <div className={`${styles.emptyState} glass-panel`}>
          <Compass size={48} className={styles.emptyIcon} />
          <h3>No trips match your search</h3>
          <p>Try modifying your filters or create a new trip to invite travel companions.</p>
          <div className={styles.emptyActions}>
            <Button variant="primary" onClick={handleResetFilters}>
              Clear Filters
            </Button>
            {user && (
              <Link to="/create-trip">
                <Button variant="secondary">Create Trip</Button>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.tripsGrid}>
          {trips.map((trip) => (
            <TripCard key={trip._id} trip={trip} currentUser={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TripsPage;
