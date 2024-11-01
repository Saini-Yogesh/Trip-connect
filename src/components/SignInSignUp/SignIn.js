import React, { useState } from "react";
import "./SignInSignUpCSS.css";
import { useNavigate } from "react-router-dom";
import SignUpIcons from "./loginIcons";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:5000/api/user/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      response = await response.json();
      if (!response.success) {
        return alert(response.result);
      }
      // Set token and expiration time in localStorage
      localStorage.setItem("authToken", response.token);
      const expirationTime = Date.now() + 1 * 60 * 1000; // 15 minutes from now
      localStorage.setItem("tokenExpiration", expirationTime.toString());
      navigate("/Trip-connect");
      window.location.reload();
    } catch (err) {
      console.error("Error during sign-in");
    }
  };

  return (
    <>
      <div className="main-signINUP">
        <div className="main-signINUP-container">
          <form className={"login-form form-slide-in"} onSubmit={handleSubmit}>
            <p className="Sign-in-text">Let's Start New Tour</p>
            <SignUpIcons />
            <p className="enter-email-password">Login With Email & Password</p>
            <input
              className="login-input"
              type="email"
              name="email"
              placeholder="Enter E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="login-input"
              type="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="signIn-button" type="submit">
              Sign In
            </button>
            <a href="/Trip-connect/signin" className="forget-password">
              Forgot Password?
            </a>
            <p className="already-registered-text">
              Haven't registered yet?
              <a href="/Trip-connect/signup" className="forget-password">
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
