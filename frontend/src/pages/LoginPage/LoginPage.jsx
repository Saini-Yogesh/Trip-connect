import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { Compass, Mail, Lock, AlertCircle } from "lucide-react";
import styles from "./LoginPage.module.css";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    if (!email || !password) {
      return setError("Please fill in all fields.");
    }

    try {
      setLoading(true);
      const res = await login(email, password);
      if (res.success) {
        // Redirect to where they were going, or home page
        const origin = location.state?.from?.pathname || "/";
        navigate(origin, { replace: true });
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={`${styles.card} glass-panel animate-fade-in`}>
        {/* Header */}
        <div className={styles.header}>
          <Link to="/" className={styles.logo}>
            <Compass className={styles.logoIcon} />
            <span>Trip<span>Connect</span></span>
          </Link>
          <h2>Welcome Back</h2>
          <p>Login to find travel companions and start your journey.</p>
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
            label="Email Address"
            id="email"
            type="email"
            placeholder="e.g. name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={loading}
            style={{ marginTop: 8 }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        {/* Footer */}
        <div className={styles.cardFooter}>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className={styles.link}>
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
