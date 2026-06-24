import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Compass, Calendar, Edit, ChevronLeft, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./EditTripPage.module.css";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";

const EditTripPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [maxMembers, setMaxMembers] = useState("");
  const [currentMemberCount, setCurrentMemberCount] = useState(0);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await axios.get(`/api/trips/${id}`);
        if (res.data.success) {
          const trip = res.data.trip;

          // Double check hosting authority
          if (user && trip.createdBy._id !== user._id) {
            alert("You are not authorized to edit this trip.");
            return navigate(`/trips/${id}`);
          }

          // Format dates for input tags (YYYY-MM-DD)
          const formatDateForInput = (dStr) => {
            const d = new Date(dStr);
            return d.toISOString().split("T")[0];
          };

          setDestination(trip.destination);
          setStartDate(formatDateForInput(trip.startDate));
          setEndDate(formatDateForInput(trip.endDate));
          setBudget(trip.budget.toString());
          setDescription(trip.description);
          setMaxMembers(trip.maxMembers.toString());
          setCurrentMemberCount(trip.members.length);
        }
      } catch (err) {
        console.error("Error fetching trip details:", err);
        setError("Failed to load trip details.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchTrip();
    }
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!destination || !startDate || !endDate || !budget || !description || !maxMembers) {
      return setError("Please fill in all fields.");
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      return setError("End date must be after the start date.");
    }

    if (Number(budget) < 0) {
      return setError("Budget cannot be negative.");
    }

    if (Number(maxMembers) < currentMemberCount) {
      return setError(
        `Crew limit cannot be less than your current confirmed crew size (${currentMemberCount} travelers).`
      );
    }

    try {
      setSubmitting(true);
      const res = await axios.put(`/api/trips/${id}`, {
        destination: destination.trim(),
        startDate,
        endDate,
        budget: Number(budget),
        description: description.trim(),
        maxMembers: Number(maxMembers),
      });

      if (res.data.success) {
        navigate(`/trips/${id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update trip details.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className={`${styles.pageWrapper} container`}>
      <Link to={`/trips/${id}`} className={styles.backLink}>
        <ChevronLeft size={16} /> Back to Trip Details
      </Link>

      <div className={`${styles.card} glass-panel animate-fade-in`}>
        {/* Header */}
        <div className={styles.header}>
          <h2>Edit Trip Details</h2>
          <p>Update your travel itinerary, budget, or capacity limitations.</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className={styles.alert}>
            <AlertCircle size={16} className={styles.alertIcon} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Destination"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />

          <div className={styles.row}>
            <Input
              label="Start Date"
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />

            <Input
              label="End Date"
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <div className={styles.row}>
            <Input
              label="Estimated Budget ($ USD)"
              id="budget"
              type="number"
              min="0"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />

            <Input
              label="Max Crew Members"
              id="maxMembers"
              type="number"
              min="2"
              placeholder={`Current confirmed: ${currentMemberCount}`}
              value={maxMembers}
              onChange={(e) => setMaxMembers(e.target.value)}
              required
            />
          </div>

          <Input
            label="Trip Description & Itinerary Plan"
            id="description"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <div className={styles.actionButtons}>
            <Button
              type="submit"
              variant="primary"
              disabled={submitting}
              className={styles.submitBtn}
            >
              {submitting ? "Saving..." : "Save Changes"}
            </Button>
            <Link to={`/trips/${id}`}>
              <Button type="button" variant="glass">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTripPage;
