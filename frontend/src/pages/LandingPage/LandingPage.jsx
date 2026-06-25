import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Shield, Sparkles, DollarSign, ArrowRight, MapPin, Compass, Search, Star, UserCheck, Smile, Globe, Users, CheckCircle, MessageSquare } from "lucide-react";
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

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>15,000+</span>
              <span className={styles.statLabel}>Trips Completed</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>45,000+</span>
              <span className={styles.statLabel}>Active Members</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>120+</span>
              <span className={styles.statLabel}>Countries Explored</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>4.9 / 5.0</span>
              <span className={styles.statLabel}>Average Member Rating</span>
            </div>
          </div>
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

      {/* How It Works Section */}
      <section className={styles.howSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>How TripConnect Works</h2>
            <p>Your journey to matching and traveling with reliable companions in 4 simple steps.</p>
          </div>

          <div className={styles.howGrid}>
            <div className={`${styles.howCard} glass-panel`}>
              <span className={styles.stepNumber}>1</span>
              <div className={styles.howIconWrapper}>
                <UserCheck size={24} />
              </div>
              <h3>Create & Verify Profile</h3>
              <p>Sign up, list your travel interests, and verify your account details to start building trust.</p>
            </div>

            <div className={`${styles.howCard} glass-panel`}>
              <span className={styles.stepNumber}>2</span>
              <div className={styles.howIconWrapper}>
                <Globe size={24} />
              </div>
              <h3>Create or Find Trips</h3>
              <p>Browse existing itineraries or create your own custom trip with destinations and budgets.</p>
            </div>

            <div className={`${styles.howCard} glass-panel`}>
              <span className={styles.stepNumber}>3</span>
              <div className={styles.howIconWrapper}>
                <MessageSquare size={24} />
              </div>
              <h3>Match & Group Chat</h3>
              <p>Request to join groups, get approved by hosts, and finalize details inside secure group chats.</p>
            </div>

            <div className={`${styles.howCard} glass-panel`}>
              <span className={styles.stepNumber}>4</span>
              <div className={styles.howIconWrapper}>
                <Smile size={24} />
              </div>
              <h3>Travel & Share Costs</h3>
              <p>Embark on your adventure, split expenses safely, and rate your companion afterwards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Trust Section */}
      <section className={styles.trustSection}>
        <div className="container">
          <div className={styles.trustContainer}>
            <div className={styles.trustContent}>
              <h2>Your Safety is Our Priority</h2>
              <p>
                We understand that traveling with new people requires confidence. That's why we've built layers of trust and verification into the core of TripConnect to ensure you feel secure every step of the way.
              </p>
              <div className={styles.trustPoints}>
                <div className={styles.trustPointItem}>
                  <CheckCircle size={20} className={styles.trustPointIcon} />
                  <div>
                    <h3 className={styles.trustPointTitle}>Community Vouching & Reviews</h3>
                    <p className={styles.trustPointDesc}>Every traveler leaves feedback. Read real ratings and reviews from previous co-travelers before sharing a trip.</p>
                  </div>
                </div>

                <div className={styles.trustPointItem}>
                  <CheckCircle size={20} className={styles.trustPointIcon} />
                  <div>
                    <h3 className={styles.trustPointTitle}>Secure In-App Chatting</h3>
                    <p className={styles.trustPointDesc}>No need to exchange phone numbers or social media profiles immediately. Coordinate all plans safely inside our encrypted channels.</p>
                  </div>
                </div>

                <div className={styles.trustPointItem}>
                  <CheckCircle size={20} className={styles.trustPointIcon} />
                  <div>
                    <h3 className={styles.trustPointTitle}>Mandatory Profiles & Bios</h3>
                    <p className={styles.trustPointDesc}>Profiles require details like age, gender, specific interests, and bios, making it easier to select companions with similar vibes.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.trustBadgeCard} glass-panel`}>
              <Shield size={64} className={styles.shieldIconLarge} />
              <h3>TripConnect Secure Badge</h3>
              <p>We work tirelessly to verify profiles and maintain community guidelines for a respectful travel community.</p>
              <div className={styles.badgeGrid}>
                <div className={styles.badgeItem}>Verified Accounts</div>
                <div className={styles.badgeItem}>Zero Spam Policy</div>
                <div className={styles.badgeItem}>Encrypted Socket Chat</div>
                <div className={styles.badgeItem}>24/7 Support Center</div>
              </div>
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

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>What Our Travelers Say</h2>
            <p>Read inspiring success stories from solo travelers who found friends and shared adventures.</p>
          </div>

          <div className={styles.testimonialsGrid}>
            <div className={`${styles.testimonialCard} glass-panel`}>
              <div className={styles.ratingRow}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#fbbf24" stroke="none" />
                ))}
              </div>
              <p className={styles.quoteText}>
                "I was extremely hesitant to travel solo to Bali, but I found three amazing co-travelers on TripConnect. We split the villa costs, shared a driver, and had the most incredible trip of my life. We're already planning Rome next summer!"
              </p>
              <div className={styles.clientMeta}>
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
                  alt="Alice Vance"
                  className={styles.clientAvatar}
                  loading="lazy"
                />
                <div>
                  <h3 className={styles.clientName}>Alice Vance</h3>
                  <span className={styles.clientRole}>Solo Traveler since 2024</span>
                </div>
              </div>
            </div>

            <div className={`${styles.testimonialCard} glass-panel`}>
              <div className={styles.ratingRow}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#fbbf24" stroke="none" />
                ))}
              </div>
              <p className={styles.quoteText}>
                "Remote work can be lonely, but coordinating cross-country road trips with fellow developers on TripConnect has completely changed my lifestyle. Spreading accommodation costs makes visiting premium locations extremely affordable."
              </p>
              <div className={styles.clientMeta}>
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
                  alt="Bob Miller"
                  className={styles.clientAvatar}
                  loading="lazy"
                />
                <div>
                  <h3 className={styles.clientName}>Bob Miller</h3>
                  <span className={styles.clientRole}>Digital Nomad</span>
                </div>
              </div>
            </div>

            <div className={`${styles.testimonialCard} glass-panel`}>
              <div className={styles.ratingRow}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#fbbf24" stroke="none" />
                ))}
              </div>
              <p className={styles.quoteText}>
                "I prefer cultural tours and historic sights but none of my local friends share this interest. Through TripConnect, I matched with Charlie for museum-hopping in Kyoto. Having a companion who appreciates slow travel made a huge difference."
              </p>
              <div className={styles.clientMeta}>
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
                  alt="Diana Prince"
                  className={styles.clientAvatar}
                  loading="lazy"
                />
                <div>
                  <h3 className={styles.clientName}>Diana Prince</h3>
                  <span className={styles.clientRole}>History Enthusiast</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
