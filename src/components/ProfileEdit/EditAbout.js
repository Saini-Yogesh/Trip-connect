import React, { useState, useEffect } from "react";

const EditAbout = ({ profileData, updateProfile }) => {
  const [profile, setProfile] = useState({
    name: profileData.name || "",
    dob: profileData.dob ? profileData.dob.split("T")[0] : "",
    username: profileData.username || "",
    city: profileData.city || "",
    about: profileData.about || "",
    hobbiesOrProfession: profileData.hobbiesOrProfession || "",
    experiences: profileData.experiences || "",
    gender: profileData.gender || "Female",
    email: profileData.email || "",
  });

  useEffect(() => {
    setProfile({
      name: profileData.name || "",
      dob: profileData.dob ? profileData.dob.split("T")[0] : "",
      username: profileData.username || "",
      city: profileData.city || "",
      about: profileData.about || "",
      hobbiesOrProfession: profileData.hobbiesOrProfession || "",
      experiences: profileData.experiences || "",
      gender: profileData.gender || "Female",
      email: profileData.email || "",
    });
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    updateProfile(profile);
  };

  return (
    <div className="content-area">
      <h2 className="section-title">Edit About</h2>

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
        <label className="form-label">Email</label>
        <input value={profile.email} className="edit-form-input" disabled />
      </div>

      <div className="form-group">
        <label className="form-label">Username</label>
        <input value={profile.username} className="edit-form-input" disabled />
      </div>

      <div className="form-group">
        <label className="form-label">City</label>
        <input
          type="text"
          name="city"
          value={profile.city}
          onChange={handleChange}
          className="edit-form-input"
          placeholder="Add your city"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={profile.dob}
          onChange={handleChange}
          className="edit-form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Gender</label>
        <select
          name="gender"
          value={profile.gender}
          onChange={handleChange}
          className="edit-form-select"
        >
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="non-binary-other">Other</option>
        </select>
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
          name="hobbiesOrProfession"
          value={profile.hobbiesOrProfession}
          onChange={handleChange}
          placeholder="Tell us your hobbies/profession for a better matching..."
          className="edit-form-textarea"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Experiences</label>
        <textarea
          name="experiences"
          value={profile.experiences}
          onChange={handleChange}
          placeholder="Tell us your valuable experiences..."
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
