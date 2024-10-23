import React, { useState } from "react";
import "./SignInSignUpCSS.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/Trip-connect");
  };

  return (
    <>
      <div className="main-signINUP">
        <div className="main-signINUP-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <p className="Sign-in-text">Let's Start New Tour</p>
            <div className="social-icons">
              <a href="/Trip-connect" className="icons">
                <i className="fa-brands fa-google"></i>
              </a>
              <a href="/Trip-connect" className="icons">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="/Trip-connect" className="icons">
                <i className="fa-brands fa-square-x-twitter"></i>
              </a>
            </div>
            <p className="enter-email-password">Login With Email & Password</p>
            <input
              className="login-input"
              type="email"
              placeholder="Enter E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="login-input"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="signIn-button" type="submit">
              Sign In
            </button>
            <a href="/Trip-connect/signin" className="forget-password">
              Forget Password?
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
