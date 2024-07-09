import React from "react";
import "./SignInSignUpCSS.css";

const SignIn = () => {
  return (
    <>
      <div className="main-signINUP">
        <div className="SignUpIn-page">
          <div className="part1">
            <div className="part1-box">
              <p className="welcome-text">Hii Travelers</p>
              <h3 className="Lets-Start-New-Tour">Let's Start New Tour</h3>
              <button className="signUp-button" id="login">
                Sign Up here
              </button>
            </div>
          </div>
          <div className="part2">
            <form className="login-form">
              <p className="Sign-in-text">Sign In</p>
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
              <p className="enter-email-password">
                Login With Email & Password
              </p>
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
              <a href="/" className="forget-password">
                Forget Password?
              </a>
              <button className="signIn-button">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
