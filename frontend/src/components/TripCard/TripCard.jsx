import React from "react";
import { Link } from "react-router-dom";
import { Calendar, DollarSign, Users, Award, MapPin } from "lucide-react";
import styles from "./TripCard.module.css";
import Button from "../Button/Button.jsx";

const TripCard = ({ trip, currentUser }) => {
  const {
    _id,
    destination,
    startDate,
    endDate,
    budget,
    maxMembers,
    members = [],
    createdBy,
  } = trip;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isCreator = currentUser && createdBy && createdBy._id === currentUser._id;
  const isMember = currentUser && members.includes(currentUser._id);
  const slotsLeft = maxMembers - (members ? members.length : 0);

  // Fallback creator details
  const creatorName = createdBy?.name || "Unknown Traveler";
  const creatorImg = createdBy?.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150";
  const creatorRating = createdBy?.rating || "5.0";

  return (
    <div className={`${styles.card} glass-panel`}>
      {/* Header Image Overlay / Decoration */}
      <div className={styles.imagePlaceholder}>
        <MapPin size={24} className={styles.pinIcon} />
        <span className={styles.badge}>${budget}</span>
      </div>

      <div className={styles.content}>
        {/* Destination & Description */}
        <h3 className={styles.destination}>{destination}</h3>
        <p className={styles.description}>
          {trip.description.length > 100
            ? `${trip.description.substring(0, 100)}...`
            : trip.description}
        </p>

        {/* Info Grid */}
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <Calendar size={15} className={styles.infoIcon} />
            <span>
              {formatDate(startDate)} - {formatDate(endDate)}
            </span>
          </div>

          <div className={styles.infoItem}>
            <Users size={15} className={styles.infoIcon} />
            <span>
              {members.length} / {maxMembers} Members ({slotsLeft > 0 ? `${slotsLeft} left` : "Full"})
            </span>
          </div>
        </div>

        {/* Creator Info */}
        <div className={styles.creatorRow}>
          <Link to={`/profile/${createdBy?._id || ""}`} className={styles.creatorLink}>
            <img src={creatorImg} alt={creatorName} className={styles.creatorAvatar} loading="lazy" />
            <div className={styles.creatorDetails}>
              <span className={styles.creatorName}>{creatorName}</span>
              <span className={styles.creatorRating}>★ {creatorRating}</span>
            </div>
          </Link>
          
          {/* Action Badge */}
          {isCreator && <span className={`${styles.statusBadge} ${styles.badgeCreator}`}>Host</span>}
          {!isCreator && isMember && <span className={`${styles.statusBadge} ${styles.badgeJoined}`}>Joined</span>}
        </div>

        {/* Action Button */}
        <div className={styles.actionBtn}>
          <Link to={`/trips/${_id}`} className={styles.btnLink}>
            <Button variant={isCreator ? "secondary" : "primary"} fullWidth>
              {isCreator ? "Manage Trip" : "View Details"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
