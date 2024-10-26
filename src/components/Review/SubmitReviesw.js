import React from "react";
import { useState } from "react";
import "./SubmitRevieswCSS.css";

const SubmitReviesw = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    review: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = await fetch("http://localhost:5000/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // Corrected typo here
      body: JSON.stringify(formData),
    });
    response = await response.json();

    if (!response.success) return alert(response.error);

    setFormData({
      name: "",
      email: "",
      review: "",
    });
    alert("Successfully submitted");
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
                Name<sup>*</sup>
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
              <label htmlFor="email" className="submit-review-label">
                Email<sup>*</sup>
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
          </div>
          <div className="submit-review-form-row">
            <label htmlFor="review" className="submit-review-label">
              Write your review<sup>*</sup>
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
