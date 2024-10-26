import React, { useState } from "react";

const EditAbout = () => {
  const [profile, setProfile] = useState({
    name: "",
    dob: "03-07-2005",
    username: "",
    city: "",
    about: "",
    hobbiesProfession: "",
    experiences: "",
    gender: "Female",
    email: "yogesh@example.com",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    console.log("Profile saved:", profile);
  };

  return (
    <div className="content-area">
      <h2 className="section-title">Edit About</h2>

      <div className="form-group">
        <label className="form-label">Email</label>
        <input value={profile.email} className="edit-form-input" disabled />
      </div>

      <div className="form-group">
        <label className="form-label">Name</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          className="edit-form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Username</label>
        <input
          type="text"
          name="username"
          value={profile.username}
          onChange={handleChange}
          className="edit-form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">City</label>
        <input
          type="text"
          name="city"
          value={profile.city}
          onChange={handleChange}
          className="edit-form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Date of Birth</label>
        <input value={profile.dob} className="edit-form-input" disabled />
      </div>

      <div className="form-group">
        <label className="form-label">Gender</label>
        <input
          value={profile.gender}
          disabled
          className="edit-form-select"
        ></input>
      </div>

      <div className="form-group">
        <label className="form-label">About</label>
        <textarea
          name="about"
          value={profile.about}
          onChange={handleChange}
          placeholder="Tell us about yourself..."
          className="edit-form-textarea"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Hobbies/Profession</label>
        <textarea
          name="hobbiesProfession"
          value={profile.hobbiesProfession}
          onChange={handleChange}
          placeholder="Tell us your hobbies/profession for a batter matching..."
          className="edit-form-textarea"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Experiences</label>
        <textarea
          name="experiences"
          value={profile.experiences}
          onChange={handleChange}
          placeholder="Tell us your valuenable experiences..."
          className="edit-form-textarea"
        />
      </div>

      <button className="save-button" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default EditAbout;
