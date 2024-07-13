import React from "react";
import { useState } from "react";
import "./SubmitRevieswCSS.css";

const SubmitReviesw = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    contact: "",
    review: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      name: "",
      company: "",
      email: "",
      contact: "",
      review: "",
    });
    alert("Successfully submited");
  };

  return (
    <div id="ShareYourreview" className="submit-review-section">
      <div className="submit-review-content">
        <h2 className="submit-review-section-heading">
          Share Your Valuable Review
        </h2>
        <form className="submit-review-form" onSubmit={handleSubmit}>
          <div className="submit-review-form-row">
            <div className="submit-review-form-group">
              <label htmlFor="name" className="submit-review-label">
                Name
              </label>
              <input
                placeholder="Your name"
                className="submit-review-input"
                type="text"
                id="submit-review-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="submit-review-form-group">
              <label htmlFor="company" className="submit-review-label">
                Company
              </label>
              <input
                placeholder="Your company"
                className="submit-review-input"
                type="text"
                id="submit-review-company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="submit-review-form-row">
            <div className="submit-review-form-group">
              <label htmlFor="email" className="submit-review-label">
                Email
              </label>
              <input
                placeholder="Your email"
                className="submit-review-input"
                type="email"
                id="submit-review-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="submit-review-form-group">
              <label htmlFor="contact" className="submit-review-label">
                Phone
              </label>
              <input
                placeholder="Your phone"
                className="submit-review-input"
                type="text"
                id="submit-review-contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="submit-review-form-row">
            <label htmlFor="review" className="submit-review-label">
              Write your review...
            </label>
            <textarea
              placeholder="Share your valuable review here....."
              id="submit-review-review"
              name="review"
              value={formData.review}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-review-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitReviesw;
