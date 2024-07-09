import React from "react";
import "./ConnectContentCSS.css";

const ConnectContent = () => {
  return (
    <>
      <main>
        <div className="contactForm">
          <form className="contact-form">
            <p>Contact us</p>
            <h4>Our friendly team would love to hear from you.</h4>
            <label className="name-text" htmlFor="name">
              Name:
            </label>
            <input type="text" id="name" name="name" required minLength={3} />
            <label className="email-text" htmlFor="email">
              Email:
            </label>
            <input type="email" id="email" name="email" required />
            <label className="massage-text" htmlFor="message">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Type your massage...."
              required
              minLength={10}
            ></textarea>
            <div className="chekbox-Text">
              <input type="checkbox" id="terms" name="terms" required />
              <label className="terms-text" htmlFor="terms">
                Terms and Conditions
              </label>
            </div>
            <input className="submit-button" type="submit" value="Submit" />
          </form>
        </div>
        <div className="contactinfo">
          <div className="contactinfo-box">
            <p className="main-contact-icons">
              <i className="fas fa-mail-bulk"></i>
            </p>
            <p className="contactinfo-text1">Email</p>
            <p className="contactinfo-text2">hello@tripconnect.com</p>
            <p className="contactinfo-text2">info@tripconnect.com</p>
          </div>
          <div className="contactinfo-box">
            <p className="main-contact-icons">
              <i className="fa-solid fa-phone"></i>
            </p>
            <p className="contactinfo-text1">Phone</p>
            <p className="contactinfo-text2">+91-885-298-3794</p>
            <p className="contactinfo-text2">+91-885-298-3794</p>
          </div>
          <div className="contactinfo-box">
            <p className="main-contact-icons">
              <i className="fa-solid fa-location-dot"></i>
            </p>
            <p className="contactinfo-text1">Location</p>
            <p className="contactinfo-text2">4th-flor,Godrej Plaza</p>
            <p className="contactinfo-text2">Delhi-110046</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default ConnectContent;
