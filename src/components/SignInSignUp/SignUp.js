import React, { useState } from "react";
import "./SignInSignUpCSS.css";
import { useNavigate } from "react-router-dom";
import SignUpIcons from "./loginIcons";

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    dob: "",
    gender: "",
    username: "",
  });
  // eslint-disable-next-line
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextStep = async (e) => {
    e.preventDefault();
    if (step === 1) {
      try {
        let response = await fetch(
          "http://localhost:5000/api/user/check-email/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: formData.email }),
          }
        );
        response = await response.json();
        if (!response.success) {
          return alert("User alrady exists");
        }
        setStep(step + 1);
      } catch (err) {
        console.error("Error checking email uniqueness", err);
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:5000/api/user/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      response = await response.json();
      if (!response.success) {
        return alert(response.result);
      }
      localStorage.setItem("authToken", response.token);
      const token = localStorage.getItem("authToken");
      console.log(token);

      alert("user added");
      navigate("/Trip-connect");
    } catch (err) {
      console.error("Error during sign-up");
    }
  };

  return (
    <div className="main-signINUP">
      <div className="main-signINUP-container">
        <form
          className="login-form"
          onSubmit={step === 3 ? handleSubmit : handleNextStep}
        >
          <p className="Sign-in-text">Welcome To TripConnect</p>
          <SignUpIcons />
          <p className="enter-email-password">Register with E-mail</p>

          {step === 1 && (
            <>
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
              {error && <p className="error">{error}</p>}
              <button className="signUp-button" type="submit">
                Continue
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                className="login-input"
                type="text"
                name="name"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                className="login-input"
                type="date"
                name="dob"
                placeholder="Enter Date of Birth"
                value={formData.dob}
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
              <button className="signUp-button" type="submit">
                Continue
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <input
                className="login-input"
                type="text"
                name="username"
                placeholder="Enter Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <button className="signUp-button" type="submit">
                Submit
              </button>
            </>
          )}

          <p
            className="already-registered-text"
            style={{ paddingTop: "2vmin" }}
          >
            Already registered?
            <a href="/Trip-connect/signin" className="forget-password">
              Sign in here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
