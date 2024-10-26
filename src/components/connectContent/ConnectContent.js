import React from "react";
import "./ConnectContentCSS.css";
import { useState } from "react";

const ConnectContent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    let response = await fetch("http://localhost:5000/api/contactUs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    response = await response.json();

    if (!response.success) return alert(response.error);

    setFormData({
      name: "",
      email: "",
      message: "",
    });
    alert("Successfully submitted");
  };
  return (
    <>
      <main>
        <div className="contactForm">
          <div className="contact-form">
            <p>Contact us</p>
            <h4>Our friendly team would love to hear from you.</h4>
            <label className="name-text" htmlFor="name">
              Name<sup>*</sup>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
            />
            <label className="email-text" htmlFor="email">
              Email<sup>*</sup>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label className="massage-text" htmlFor="message">
              Message<sup>*</sup>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message...."
              required
              minLength={10}
            ></textarea>
            <button className="submit-button" onClick={handleOnSubmit}>
              Submit
            </button>
          </div>
        </div>
        <div className="contactinfo">
          <div className="contactinfo-box">
            <p className="main-contact-icons">
              <i className="fas fa-mail-bulk"></i>
            </p>
            <p className="contactinfo-text1">Emails</p>
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
