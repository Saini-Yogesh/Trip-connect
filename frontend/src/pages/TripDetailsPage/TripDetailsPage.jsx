import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar, DollarSign, Users, Shield, MessageCircle, AlertCircle, Compass, Star, ChevronLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./TripDetailsPage.module.css";
import Button from "../../components/Button/Button.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import Input from "../../components/Input/Input.jsx";

const TripDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null); // JoinRequest object or null
  const [requestsList, setRequestsList] = useState([]); // Array of JoinRequests (host only)
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Review Modal state
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewedUser, setReviewedUser] = useState(null); // User object being reviewed
  const [reviewRating, setReviewRating] = useState("5");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchTripDetails = async () => {
    try {
      const res = await axios.get(`/api/trips/${id}`);
      if (res.data.success) {
        setTrip(res.data.trip);
      }
    } catch (err) {
      console.error("Error loading trip details:", err);
      setError(err.response?.data?.message || "Failed to load trip details.");
    }
  };

  const fetchRequestStatus = async () => {
    if (!user) return;
    try {
      const res = await axios.get(`/api/trips/${id}/my-request-status`);
      if (res.data.success) {
        setRequestStatus(res.data.request);
      }
    } catch (err) {
      console.error("Error fetching request status:", err);
    }
  };

  const fetchHostRequests = async () => {
    if (!user || !trip || trip.createdBy._id !== user._id) return;
    try {
      const res = await axios.get(`/api/trips/${id}/requests`);
      if (res.data.success) {
        setRequestsList(res.data.requests);
      }
    } catch (err) {
      console.error("Error fetching host requests:", err);
    }
  };

  // Initial load
  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      await fetchTripDetails();
      await fetchRequestStatus();
      setLoading(false);
    };
    loadAll();
  }, [id, user]);

  // Load host request list once trip details are fetched and user is verified as creator
  useEffect(() => {
    if (trip && user && trip.createdBy._id === user._id) {
      fetchHostRequests();
    }
  }, [trip, user]);

  const handleSendRequest = async () => {
    if (!user) {
      return navigate("/login");
    }

    try {
      const res = await axios.post(`/api/trips/${id}/request`);
      if (res.data.success) {
        setRequestStatus(res.data.request);
        await fetchTripDetails(); // Refresh members list count if automatically added
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send request.");
    }
  };

  const handleModerateRequest = async (requestId, action) => {
    try {
      const res = await axios.patch(`/api/requests/${requestId}/${action}`);
      if (res.data.success) {
        // Refresh request moderation list
        await fetchHostRequests();
        // Refresh trip details to sync new members
        await fetchTripDetails();
      }
    } catch (err) {
      alert(err.response?.data?.message || `Failed to ${action} request.`);
    }
  };

  const handleDeleteTrip = async () => {
    if (!window.confirm("Are you sure you want to delete this trip? This action is irreversible.")) return;

    try {
      const res = await axios.delete(`/api/trips/${id}`);
      if (res.data.success) {
        navigate("/my-trips");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete trip.");
    }
  };

  // Review submission
  const openReviewModal = (targetUser) => {
    setReviewedUser(targetUser);
    setReviewRating("5");
    setReviewComment("");
    setReviewError("");
    setReviewSuccess("");
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewError("");
    setReviewSuccess("");

    if (!reviewComment.trim()) {
      return setReviewError("Please write a comment.");
    }

    try {
      setSubmittingReview(true);
      const res = await axios.post("/api/reviews", {
        reviewedUserId: reviewedUser._id,
        tripId: id,
        rating: Number(reviewRating),
        comment: reviewComment.trim(),
      });

      if (res.data.success) {
        setReviewSuccess("Review submitted successfully!");
        setTimeout(() => {
          setReviewModalOpen(false);
        }, 1500);
      }
    } catch (err) {
      setReviewError(err.response?.data?.message || "Failed to submit review.");
    } finally {
      setSubmittingReview(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
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

  if (error || !trip) {
    return (
      <div className={`${styles.errorContainer} container`}>
        <div className={`${styles.errorCard} glass-panel`}>
          <Compass size={48} className={styles.errorIcon} />
          <h3>Error</h3>
          <p>{error || "Trip not found."}</p>
          <Link to="/trips">
            <Button variant="primary">Back to Trips</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isHost = user && trip.createdBy._id === user._id;
  const isApprovedMember = user && trip.members.some((m) => m._id === user._id);
  const slotsLeft = trip.maxMembers - trip.members.length;
  const tripFinished = new Date(trip.endDate) < new Date();

  return (
    <div className={`${styles.pageContainer} container`}>
      {/* Back Button */}
      <Link to="/trips" className={styles.backLink}>
        <ChevronLeft size={16} /> Back to Trips
      </Link>

      <div className={styles.layoutGrid}>
        {/* Main Details Panel */}
        <div className={styles.mainCol}>
          <div className={`${styles.tripHeaderCard} glass-panel`}>
            <div className={styles.destinationBadge}>Destination</div>
            <h1>{trip.destination}</h1>
            
            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <Calendar size={18} className={styles.metaIcon} />
                <div>
                  <label>Dates</label>
                  <span>
                    {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                  </span>
                </div>
              </div>

              <div className={styles.metaItem}>
                <DollarSign size={18} className={styles.metaIcon} />
                <div>
                  <label>Budget</label>
                  <span>${trip.budget} USD</span>
                </div>
              </div>

              <div className={styles.metaItem}>
                <Users size={18} className={styles.metaIcon} />
                <div>
                  <label>Capacity</label>
                  <span>
                    {trip.members.length} / {trip.maxMembers} Members
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.detailsCard} glass-panel`}>
            <h3>About the Trip</h3>
            <p className={styles.description}>{trip.description}</p>
          </div>

          {/* Members List */}
          <div className={`${styles.membersCard} glass-panel`}>
            <h3>Travel Crew ({trip.members.length})</h3>
            <div className={styles.membersGrid}>
              {trip.members.map((member) => {
                const isMemberHost = member._id === trip.createdBy._id;
                const showReviewBtn =
                  tripFinished &&
                  isApprovedMember &&
                  member._id !== user?._id;

                return (
                  <div key={member._id} className={styles.memberItemCard}>
                    <Link to={`/profile/${member._id}`} className={styles.memberLink}>
                      <img
                        src={member.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                        alt={member.name}
                        className={styles.memberAvatar}
                      />
                      <div className={styles.memberDetails}>
                        <span className={styles.memberName}>
                          {member.name} {isMemberHost && <span className={styles.hostText}>(Host)</span>}
                        </span>
                        <span className={styles.memberSub}>
                          {member.age} yrs • {member.city}
                        </span>
                        <span className={styles.memberRating}>★ {member.rating?.toFixed(1) || "5.0"}</span>
                      </div>
                    </Link>

                    {showReviewBtn && (
                      <Button
                        variant="secondary"
                        onClick={() => openReviewModal(member)}
                        className={styles.reviewBtn}
                      >
                        Review Co-traveler
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Status / Actions */}
        <div className={styles.sidebarCol}>
          <div className={`${styles.statusCard} glass-panel`}>
            {/* Host Details */}
            <div className={styles.hostHeader}>
              <label>Organized by</label>
              <Link to={`/profile/${trip.createdBy._id}`} className={styles.hostLink}>
                <img
                  src={trip.createdBy.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                  alt={trip.createdBy.name}
                  className={styles.hostAvatar}
                />
                <div>
                  <h4>{trip.createdBy.name}</h4>
                  <span>★ {trip.createdBy.rating?.toFixed(1) || "5.0"} Rating</span>
                </div>
              </Link>
            </div>

            <div className={styles.divider}></div>

            {/* Application status dashboard */}
            <div className={styles.actionsArea}>
              {tripFinished && (
                <div className={`${styles.banner} ${styles.bannerMuted}`}>
                  <AlertCircle size={16} />
                  <span>This trip has already ended.</span>
                </div>
              )}

              {!tripFinished && (
                <>
                  {isHost ? (
                    <div className={styles.hostActions}>
                      <div className={`${styles.banner} ${styles.bannerHost}`}>
                        <Shield size={16} />
                        <span>You are hosting this trip!</span>
                      </div>
                      
                      <Link to={`/chat/${trip._id}`} className={styles.actionBtnLink}>
                        <Button variant="primary" fullWidth>
                          <MessageCircle size={16} style={{ marginRight: 8 }} /> Go to Group Chat
                        </Button>
                      </Link>

                      <div className={styles.hostEditRow}>
                        <Link to={`/edit-trip/${trip._id}`} className={styles.actionBtnLink}>
                          <Button variant="glass" fullWidth>Edit Details</Button>
                        </Link>
                        <Button variant="danger" onClick={handleDeleteTrip}>
                          Delete Trip
                        </Button>
                      </div>
                    </div>
                  ) : isApprovedMember ? (
                    <div className={styles.memberActions}>
                      <div className={`${styles.banner} ${styles.bannerMember}`}>
                        <Shield size={16} />
                        <span>You are a confirmed traveler!</span>
                      </div>
                      
                      <Link to={`/chat/${trip._id}`} className={styles.actionBtnLink}>
                        <Button variant="primary" fullWidth>
                          <MessageCircle size={16} style={{ marginRight: 8 }} /> Go to Group Chat
                        </Button>
                      </Link>
                    </div>
                  ) : requestStatus?.status === "pending" ? (
                    <div className={styles.requestPending}>
                      <div className={`${styles.banner} ${styles.bannerPending}`}>
                        <AlertCircle size={16} />
                        <span>Join Request is Pending Approval...</span>
                      </div>
                      <Button variant="glass" fullWidth disabled>
                        Awaiting Response
                      </Button>
                    </div>
                  ) : requestStatus?.status === "rejected" ? (
                    <div className={styles.requestRejected}>
                      <div className={`${styles.banner} ${styles.bannerRejected}`}>
                        <AlertCircle size={16} />
                        <span>Host declined your join request.</span>
                      </div>
                      <Button variant="glass" fullWidth onClick={handleSendRequest}>
                        Resend Join Request
                      </Button>
                    </div>
                  ) : slotsLeft <= 0 ? (
                    <div className={styles.tripFull}>
                      <div className={`${styles.banner} ${styles.bannerFull}`}>
                        <AlertCircle size={16} />
                        <span>Trip is currently full.</span>
                      </div>
                      <Button variant="glass" fullWidth disabled>
                        No slots available
                      </Button>
                    </div>
                  ) : (
                    <div className={styles.joinAction}>
                      <p className={styles.spotsText}>
                        Only <strong>{slotsLeft}</strong> of <strong>{trip.maxMembers}</strong> spots available!
                      </p>
                      <Button variant="primary" fullWidth onClick={handleSendRequest}>
                        Request to Join
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Join Requests Moderation list - only visible to Host */}
          {isHost && !tripFinished && (
            <div className={`${styles.requestsCard} glass-panel`}>
              <h3>Join Requests ({requestsList.filter(r => r.status === "pending").length})</h3>
              
              {requestsList.filter((r) => r.status === "pending").length === 0 ? (
                <p className={styles.noRequests}>No pending join requests.</p>
              ) : (
                <div className={styles.requestsList}>
                  {requestsList
                    .filter((r) => r.status === "pending")
                    .map((req) => (
                      <div key={req._id} className={styles.requestItem}>
                        <div className={styles.requesterInfo}>
                          <img
                            src={req.user.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                            alt={req.user.name}
                            className={styles.requesterAvatar}
                          />
                          <div className={styles.requesterDetails}>
                            <Link to={`/profile/${req.user._id}`} className={styles.requesterName}>
                              {req.user.name}
                            </Link>
                            <span className={styles.requesterSub}>
                              {req.user.age} yrs • {req.user.city} • ★ {req.user.rating?.toFixed(1) || "5.0"}
                            </span>
                          </div>
                        </div>

                        <div className={styles.requestActions}>
                          <button
                            onClick={() => handleModerateRequest(req._id, "accept")}
                            className={styles.acceptBtn}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleModerateRequest(req._id, "reject")}
                            className={styles.rejectBtn}
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Review Submit Modal */}
      {reviewedUser && (
        <Modal
          isOpen={reviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          title={`Review Traveler: ${reviewedUser.name}`}
        >
          {reviewSuccess ? (
            <div className={styles.reviewSuccessCard}>{reviewSuccess}</div>
          ) : (
            <form onSubmit={handleReviewSubmit} className={styles.reviewForm}>
              {reviewError && <p className={styles.formError}>{reviewError}</p>}
              
              <Input
                label="Rating (1 to 5 Stars)"
                id="reviewRating"
                type="select"
                options={[
                  { value: "5", label: "5 - Exceptional travel buddy" },
                  { value: "4", label: "4 - Great companion" },
                  { value: "3", label: "3 - Okay" },
                  { value: "2", label: "2 - Had some issues" },
                  { value: "1", label: "1 - Not recommended" },
                ]}
                value={reviewRating}
                onChange={(e) => setReviewRating(e.target.value)}
                required
              />

              <Input
                label="Your Comments"
                id="reviewComment"
                type="textarea"
                placeholder="Share your experience traveling with this person. Be honest and constructive..."
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                required
              />

              <Button type="submit" variant="primary" fullWidth disabled={submittingReview}>
                {submittingReview ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
};

export default TripDetailsPage;
