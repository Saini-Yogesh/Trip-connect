import React, { useState } from "react";
import "./SignInSignUpCSS.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
              <p className="welcome-text">Welcome To TripConnect</p>
              <h3 className="Sign-in-With-ID-Passowrd">
                Sign in With ID & Password
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
            <form className="login-form" onSubmit={handleSubmit}>
              <p className="Sign-in-text">Create Account</p>
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
              <p className="enter-email-password">Register with E-mail</p>
              <input
                className="login-input"
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <select
                className="login-input"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  --Select Gender--
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary-other">Non-Binary / Other</option>
              </select>
              <input
                className="login-input"
                type="email"
                name="email"
                placeholder="Enter E-mail"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                className="login-input"
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                className="login-input"
                type="password"
                name="confirmPassword"
                placeholder="Re-Enter Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button className="signUp-button" type="submit">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
