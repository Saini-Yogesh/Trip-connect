import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Compass, Calendar, Plus, ChevronLeft, AlertCircle } from "lucide-react";
import styles from "./CreateTripPage.module.css";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";

const CreateTripPage = () => {
  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [description, setDescription] = useState("");
  const [maxMembers, setMaxMembers] = useState("5");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic Validations
    if (!destination || !startDate || !endDate || !budget || !description || !maxMembers) {
      return setError("Please fill in all fields.");
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      return setError("Start date cannot be in the past.");
    }

    if (end <= start) {
      return setError("End date must be after the start date.");
    }

    if (Number(budget) < 0) {
      return setError("Budget cannot be negative.");
    }

    if (Number(maxMembers) < 2) {
      return setError("Crew limit must be at least 2 people.");
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/trips", {
        destination: destination.trim(),
        startDate,
        endDate,
        budget: Number(budget),
        description: description.trim(),
        maxMembers: Number(maxMembers),
      });

      if (res.data.success) {
        navigate("/my-trips");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create trip. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.pageWrapper} container`}>
      <Link to="/trips" className={styles.backLink}>
        <ChevronLeft size={16} /> Back to Explore
      </Link>

      <div className={`${styles.card} glass-panel animate-fade-in`}>
        {/* Header */}
        <div className={styles.header}>
          <h2>Plan a New Trip</h2>
          <p>Set your destination, details, and search for co-travelers to join you.</p>
        </div>

        {/* Error alert */}
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
            placeholder="e.g. Kyoto, Japan or Paris, France"
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
              placeholder="e.g. 1500"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />

            <Input
              label="Max Crew Members"
              id="maxMembers"
              type="number"
              min="2"
              placeholder="e.g. 5"
              value={maxMembers}
              onChange={(e) => setMaxMembers(e.target.value)}
              required
            />
          </div>

          <Input
            label="Trip Description & Itinerary Plan"
            id="description"
            type="textarea"
            placeholder="Describe what you plan to do, sights you want to see, accommodation details, and what kind of travel buddies you're looking for..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <div className={styles.actionButtons}>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className={styles.submitBtn}
            >
              {loading ? "Publishing..." : "Publish Trip Plan"}
            </Button>
            <Link to="/trips">
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

export default CreateTripPage;
