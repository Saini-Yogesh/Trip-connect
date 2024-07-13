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
        <div className="SignUpIn-page">
          <div className="part1">
            <div className="part1-box">
              <p className="welcome-text">Hii Travelers</p>
              <h3 className="Lets-Start-New-Tour">Let's Start New Tour</h3>
              <button
                className="signUp-button"
                id="login"
                onClick={() => {
                  navigate("/Trip-connect/signup");
                }}
              >
                Sign Up here
              </button>
            </div>
          </div>
          <div className="part2">
            <form className="login-form" onSubmit={handleSubmit}>
              <p className="Sign-in-text">Sign In</p>
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
              <p className="enter-email-password">
                Login With Email & Password
              </p>
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
              <a href="/Trip-connect/signin" className="forget-password">
                Forget Password?
              </a>
              <button className="signIn-button" type="submit">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
