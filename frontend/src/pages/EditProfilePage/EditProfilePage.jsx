import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { User, ChevronLeft, AlertCircle } from "lucide-react";
import styles from "./EditProfilePage.module.css";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";

const EditProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [interestsString, setInterestsString] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Fill in current values
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setAge(user.age?.toString() || "");
      setGender(user.gender || "");
      setCity(user.city || "");
      setBio(user.bio || "");
      setProfileImage(user.profileImage || "");
      setInterestsString(user.travelInterests ? user.travelInterests.join(", ") : "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !age || !gender || !city) {
      return setError("Name, Age, Gender, and City are required.");
    }

    if (Number(age) < 18) {
      return setError("You must be at least 18 years old.");
    }

    // Convert comma-separated string to string array
    const travelInterests = interestsString
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    try {
      setLoading(true);
      const res = await updateProfile({
        name,
        age: Number(age),
        gender,
        city,
        bio,
        profileImage,
        travelInterests,
      });

      if (res.success) {
        setSuccess("Profile updated successfully!");
        setTimeout(() => {
          navigate(`/profile/${user._id}`);
        }, 1500);
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "non-binary", label: "Non-binary" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className={`${styles.pageWrapper} container`}>
      <Link to={`/profile/${user?._id}`} className={styles.backLink}>
        <ChevronLeft size={16} /> Back to Profile
      </Link>

      <div className={`${styles.card} glass-panel animate-fade-in`}>
        {/* Header */}
        <div className={styles.header}>
          <h2>Edit Profile</h2>
          <p>Update your details, biography, and travel interests to find matching travel crew.</p>
        </div>

        {/* Alert states */}
        {error && (
          <div className={`${styles.alert} ${styles.alertError}`}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className={`${styles.alert} ${styles.alertSuccess}`}>
            <AlertCircle size={16} />
            <span>{success}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Full Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className={styles.row}>
            <Input
              label="Age"
              id="age"
              type="number"
              min="18"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />

            <Input
              label="Gender"
              id="gender"
              type="select"
              options={genderOptions}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            />
          </div>

          <Input
            label="Current City"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />

          <Input
            label="Profile Image URL"
            id="profileImage"
            placeholder="e.g. https://images.unsplash.com/... (leave blank for default avatar)"
            value={profileImage}
            onChange={(e) => setProfileImage(e.target.value)}
          />

          <Input
            label="Travel Interests (comma separated list)"
            id="interests"
            placeholder="e.g. Hiking, Photography, Camping, Beaches, Local Food"
            value={interestsString}
            onChange={(e) => setInterestsString(e.target.value)}
          />

          <Input
            label="Profile Bio & Travel Philosophy"
            id="bio"
            type="textarea"
            placeholder="Introduce yourself to the TripConnect community! Share your favorite travel styles, past trips, and what you look for in a travel buddy..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <div className={styles.actionButtons}>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className={styles.submitBtn}
            >
              {loading ? "Saving..." : "Save Profile"}
            </Button>
            <Link to={`/profile/${user?._id}`}>
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

export default EditProfilePage;
