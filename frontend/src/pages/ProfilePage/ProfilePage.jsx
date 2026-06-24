import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { MapPin, User, Star, Mail, Edit, Calendar, Compass, MessageSquare } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./ProfilePage.module.css";
import Button from "../../components/Button/Button.jsx";

const ProfilePage = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  
  const [profileUser, setProfileUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Determine whose profile to fetch
  const profileId = id || (currentUser ? currentUser._id : null);

  useEffect(() => {
    const fetchProfileAndReviews = async () => {
      if (!profileId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Fetch user info
        const userRes = await axios.get(`/api/users/${profileId}`);
        if (userRes.data.success) {
          setProfileUser(userRes.data.user);
        }

        // Fetch user reviews
        const reviewsRes = await axios.get(`/api/reviews/${profileId}`);
        if (reviewsRes.data.success) {
          setReviews(res => reviewsRes.data.reviews || []);
        }
        
        setError("");
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to load profile details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndReviews();
  }, [profileId]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <div className="loader"></div>
      </div>
    );
  }

  if (error || !profileUser) {
    return (
      <div className={`${styles.errorContainer} container`}>
        <div className={`${styles.errorCard} glass-panel`}>
          <Compass size={48} className={styles.errorIcon} />
          <h3>Profile Not Found</h3>
          <p>{error || "The traveler profile you are trying to view does not exist."}</p>
          <Link to="/trips">
            <Button variant="primary">Explore Trips</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser && currentUser._id === profileUser._id;

  return (
    <div className={`${styles.pageContainer} container`}>
      <div className={styles.profileHeaderGrid}>
        {/* Main Profile Info Card */}
        <div className={`${styles.profileCard} glass-panel`}>
          <div className={styles.avatarWrapper}>
            <img
              src={profileUser.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
              alt={profileUser.name}
              className={styles.avatar}
            />
            {isOwnProfile && (
              <Link to="/edit-profile" className={styles.editBadge}>
                <Edit size={14} /> Edit
              </Link>
            )}
          </div>

          <h2 className={styles.name}>{profileUser.name}</h2>
          
          <div className={styles.ratingRow}>
            <Star size={16} className={styles.starIcon} />
            <span className={styles.ratingNumber}>
              {profileUser.rating ? profileUser.rating.toFixed(1) : "5.0"}
            </span>
            <span className={styles.ratingCount}>/ 5.0 Rating</span>
          </div>

          <div className={styles.metaList}>
            <div className={styles.metaItem}>
              <User size={16} />
              <span>
                {profileUser.age} years old • {profileUser.gender}
              </span>
            </div>
            
            <div className={styles.metaItem}>
              <MapPin size={16} />
              <span>Lives in {profileUser.city}</span>
            </div>

            <div className={styles.metaItem}>
              <Mail size={16} />
              <span className={styles.emailText}>{profileUser.email}</span>
            </div>
          </div>

          {isOwnProfile && (
            <div className={styles.ownProfileActions}>
              <Link to="/edit-profile" className={styles.fullWidth}>
                <Button variant="primary" fullWidth>Edit Profile Details</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Bio & Reviews Panel */}
        <div className={styles.detailsPanel}>
          {/* Bio */}
          <div className={`${styles.panelCard} glass-panel`}>
            <h3>Bio & Travel Philosophy</h3>
            <p className={styles.bioText}>
              {profileUser.bio || "This traveler has not written a bio yet. Travel stories coming soon!"}
            </p>

            {profileUser.travelInterests && profileUser.travelInterests.length > 0 && (
              <div className={styles.interestsWrapper}>
                <h4>Travel Interests</h4>
                <div className={styles.interestsList}>
                  {profileUser.travelInterests.map((interest, idx) => (
                    <span key={idx} className={styles.interestBadge}>
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reviews list */}
          <div className={`${styles.panelCard} glass-panel`}>
            <h3>Reviews & Co-traveler Feedback ({reviews.length})</h3>
            
            {reviews.length === 0 ? (
              <div className={styles.emptyReviews}>
                <MessageSquare size={36} className={styles.emptyReviewsIcon} />
                <p>No co-traveler reviews submitted for this traveler yet.</p>
              </div>
            ) : (
              <div className={styles.reviewsList}>
                {reviews.map((rev) => (
                  <div key={rev._id} className={styles.reviewItem}>
                    <div className={styles.reviewHeader}>
                      <Link to={`/profile/${rev.reviewer._id}`} className={styles.reviewerLink}>
                        <img
                          src={rev.reviewer.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                          alt={rev.reviewer.name}
                          className={styles.reviewerAvatar}
                        />
                        <div className={styles.reviewerDetails}>
                          <span className={styles.reviewerName}>{rev.reviewer.name}</span>
                          <span className={styles.reviewDate}>Reviewed in {formatDate(rev.createdAt)}</span>
                        </div>
                      </Link>

                      <div className={styles.reviewStars}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < rev.rating ? styles.starFilled : styles.starEmpty}
                          />
                        ))}
                      </div>
                    </div>

                    <div className={styles.reviewBody}>
                      <p>{rev.comment}</p>
                      {rev.trip && (
                        <span className={styles.reviewContext}>
                          Context: Co-traveled to <strong>{rev.trip.destination}</strong>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
