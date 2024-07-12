import React from "react";
import "./SignInSignUpCSS.css";
import { useNavigate } from "react-router-dom";
import FooterNavbar from "../FooterNavbar/FooterNavbar";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="main-signINUP">
        <div className="SignUpIn-page">
          <div className="part1">
            <div className="part1-box">
              <p className="welcome-text">Welcome To TripConnect</p>
              <h3 className="Sign-in-With-ID-Passowrd">
                Sign in With ID & Passowrd
              </h3>
              <button
                className="signIn-button"
                id="login"
                onClick={() => {
                  navigate("/Trip-connect/signin");
                }}
              >
                Sign In here
              </button>
            </div>
          </div>
          <div className="part2">
            <form className="login-form">
              <p className="Sign-in-text">Create Account</p>
              <div className="social-icons">
                <a href="/" className="icons">
                  <i className="fa-brands fa-google"></i>
                </a>
                <a href="/" className="icons">
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a href="/" className="icons">
                  <i className="fa-brands fa-square-x-twitter"></i>
                </a>
              </div>
              <p className="enter-email-password">Register with E-mail</p>
              <input
                className="login-input"
                type="text"
                placeholder="Enter Name"
                required
              />
              <select
                className="login-input"
                id="gender"
                name="gender"
                required
              >
                <option value="" disabled defaultValue>
                  --Select Gender--
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary-other">Non-Binary / Other</option>
              </select>
              <input
                className="login-input"
                type="email"
                placeholder="Enter E-mail"
                required
              />
              <input
                className="login-input"
                type="password"
                placeholder="Enter Password"
                required
              />
              <input
                className="login-input"
                type="password"
                placeholder="Re-Enter Password"
                required
              />
              <button
                className="signUp-button"
                onClick={() => {
                  navigate("/Trip-connect");
                }}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
      <FooterNavbar />
    </>
  );
};

export default SignUp;
