import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { Compass, AlertCircle } from "lucide-react";
import styles from "./RegisterPage.module.css";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";

const RegisterPage = () => {
  const { register, user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If user is already logged in, redirect them
  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !age || !gender || !city) {
      return setError("Please fill in all required fields.");
    }

    if (Number(age) < 18) {
      return setError("You must be at least 18 years old to join TripConnect.");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }

    try {
      setLoading(true);
      const res = await register(name, email, password, age, gender, city);
      if (res.success) {
        navigate("/");
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
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
    <div className={styles.pageWrapper}>
      <div className={`${styles.card} glass-panel animate-fade-in`}>
        {/* Header */}
        <div className={styles.header}>
          <Link to="/" className={styles.logo}>
            <Compass className={styles.logoIcon} />
            <span>Trip<span>Connect</span></span>
          </Link>
          <h2>Create Account</h2>
          <p>Join TripConnect to discover trips and find your travel crew.</p>
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
            label="Full Name"
            id="name"
            placeholder="e.g. Alice Vance"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Email Address"
            id="email"
            type="email"
            placeholder="e.g. alice@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="Minimum 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className={styles.row}>
            <Input
              label="Age"
              id="age"
              type="number"
              min="18"
              placeholder="e.g. 25"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />

            <Input
              label="Gender"
              id="gender"
              type="select"
              placeholder="Select"
              options={genderOptions}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            />
          </div>

          <Input
            label="Current City"
            id="city"
            placeholder="e.g. New York"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={loading}
            style={{ marginTop: 8 }}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        {/* Footer */}
        <div className={styles.cardFooter}>
          <p>
            Already have an account?{" "}
            <Link to="/login" className={styles.link}>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
