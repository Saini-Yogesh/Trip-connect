import React from "react";
import { Link } from "react-router-dom";
import { MapPin, User, Star } from "lucide-react";
import styles from "./ProfileCard.module.css";
import Button from "../Button/Button.jsx";

const ProfileCard = ({ user }) => {
  const {
    _id,
    name,
    age,
    gender,
    city,
    bio,
    profileImage,
    travelInterests = [],
    rating,
  } = user;

  const defaultAvatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150";

  // capitalize gender helper
  const formatGender = (g) => {
    if (!g) return "";
    return g.charAt(0).toUpperCase() + g.slice(1);
  };

  return (
    <div className={`${styles.card} glass-panel`}>
      <div className={styles.header}>
        <img
          src={profileImage || defaultAvatar}
          alt={name}
          className={styles.avatar}
        />
        <div className={styles.ratingBadge}>
          <Star size={12} className={styles.starIcon} />
          <span>{rating ? rating.toFixed(1) : "5.0"}</span>
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        
        <div className={styles.metaRow}>
          <span className={styles.metaItem}>
            <User size={13} /> {age} yrs • {formatGender(gender)}
          </span>
          <span className={styles.metaItem}>
            <MapPin size={13} /> {city}
          </span>
        </div>

        <p className={styles.bio}>
          {bio ? (bio.length > 90 ? `${bio.substring(0, 90)}...` : bio) : "No bio provided yet."}
        </p>

        {/* Interests */}
        {travelInterests.length > 0 && (
          <div className={styles.interests}>
            {travelInterests.slice(0, 3).map((interest, idx) => (
              <span key={idx} className={styles.interestBadge}>
                {interest}
              </span>
            ))}
            {travelInterests.length > 3 && (
              <span className={styles.interestMore}>+{travelInterests.length - 3}</span>
            )}
          </div>
        )}

        <div className={styles.actionRow}>
          <Link to={`/profile/${_id}`} className={styles.fullWidth}>
            <Button variant="glass" fullWidth>
              View Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
