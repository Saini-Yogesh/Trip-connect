import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Shield, Sparkles, DollarSign, ArrowRight, MapPin, Compass, Search } from "lucide-react";
import styles from "./LandingPage.module.css";
import Button from "../../components/Button/Button.jsx";
import TripCard from "../../components/TripCard/TripCard.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recentTrips, setRecentTrips] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch recent trips
  useEffect(() => {
    const fetchRecentTrips = async () => {
      try {
        const res = await axios.get("/api/trips");
        if (res.data.success) {
          // Keep only first 3 trips
          setRecentTrips(res.data.trips.slice(0, 3));
        }
      } catch (err) {
        console.error("Error fetching recent trips:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentTrips();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/trips?destination=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/trips");
    }
  };

  return (
    <div className={styles.landingWrapper}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={`${styles.heroContainer} container`}>
          <div className={`${styles.heroContent} animate-fade-in`}>
            <div className={styles.tagline}>
              <Sparkles size={16} className={styles.taglineIcon} />
              <span>Co-traveling Made Simple</span>
            </div>
            
            <h1 className={styles.headline}>
              Find Travel Buddies. <br />
              <span className="text-gradient">Travel Smarter.</span>
            </h1>
            
            <p className={styles.subheadline}>
              Connect with reliable, like-minded solo travelers. Create plans, coordinate itineraries, split expenses, and share lifelong memories together.
            </p>

            <div className={styles.ctaButtons}>
              <Link to="/trips">
                <Button variant="primary">
                  Explore Trips <ArrowRight size={16} style={{ marginLeft: 8 }} />
                </Button>
              </Link>
              <Link to={user ? "/create-trip" : "/register"}>
                <Button variant="glass">Create a Trip</Button>
              </Link>
            </div>

            {/* Quick Search Overlay */}
            <form onSubmit={handleSearchSubmit} className={`${styles.searchBox} glass-panel`}>
              <div className={styles.searchInputWrapper}>
                <Search size={18} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Where is your next adventure?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
              <Button type="submit" variant="secondary" className={styles.searchBtn}>
                Search
              </Button>
            </form>
          </div>
          
          <div className={styles.heroGlow}></div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Why Use TripConnect?</h2>
            <p>We build connections that turn trips into collaborative sharing experiences.</p>
          </div>

          <div className={styles.featuresGrid}>
            {/* Feature 1 */}
            <div className={`${styles.featureCard} glass-panel`}>
              <div className={`${styles.featureIconWrapper} ${styles.iconGreen}`}>
                <Compass size={24} />
              </div>
              <h3>Find Travel Partners</h3>
              <p>Match with travelers based on shared interests, age, gender, budget, and destination preferences.</p>
            </div>

            {/* Feature 2 */}
            <div className={`${styles.featureCard} glass-panel`}>
              <div className={`${styles.featureIconWrapper} ${styles.iconViolet}`}>
                <DollarSign size={24} />
              </div>
              <h3>Share Travel Costs</h3>
              <p>Split costs on accommodation, transport, meals, and excursions to make dream destinations affordable.</p>
            </div>

            {/* Feature 3 */}
            <div className={`${styles.featureCard} glass-panel`}>
              <div className={`${styles.featureIconWrapper} ${styles.iconRed}`}>
                <Shield size={24} />
              </div>
              <h3>Secure Communication</h3>
              <p>Coordinate details safely. Chat with verified, accepted members through dedicated group chat rooms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Trips Section */}
      <section className={styles.recentSection}>
        <div className="container">
          <div className={styles.sectionHeaderRow}>
            <div>
              <h2>Recent Trips Added</h2>
              <p>Explore some of our members' upcoming itineraries and submit requests to join.</p>
            </div>
            <Link to="/trips" className={styles.viewAllLink}>
              View All Trips <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className={styles.loadingWrapper}>
              <div className="loader"></div>
            </div>
          ) : recentTrips.length === 0 ? (
            <div className={`${styles.emptyState} glass-panel`}>
              <Compass size={40} className={styles.emptyIcon} />
              <p>No trips have been added yet. Be the first to create one!</p>
              <Link to={user ? "/create-trip" : "/register"}>
                <Button variant="primary" style={{ marginTop: 12 }}>Create a Trip</Button>
              </Link>
            </div>
          ) : (
            <div className={styles.tripsGrid}>
              {recentTrips.map((trip) => (
                <TripCard key={trip._id} trip={trip} currentUser={user} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
