import React, { useState, useEffect } from "react";

const EditLinks = ({ profileData, updateProfile }) => {
  const [links, setLinks] = useState({
    facebook: profileData.links?.facebook || "",
    twitter: profileData.links?.twitter || "",
    instagram: profileData.links?.instagram || "",
    youtube: profileData.links?.youtube || "",
    website: profileData.links?.website || "",
  });

  useEffect(() => {
    setLinks({
      facebook: profileData.links?.facebook || "",
      twitter: profileData.links?.twitter || "",
      instagram: profileData.links?.instagram || "",
      youtube: profileData.links?.youtube || "",
      website: profileData.links?.website || "",
    });
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLinks({ ...links, [name]: value });
  };

  const handleSave = () => {
    updateProfile({ links });
  };

  return (
    <div className="content-area">
      <h1 className="section-title">Edit Links</h1>

      <div className="form-group">
        <label className="form-label">Facebook</label>
        <input
          type="url"
          name="facebook"
          value={links.facebook}
          onChange={handleChange}
          placeholder="Facebook URL"
          className="edit-form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Twitter</label>
        <input
          type="url"
          name="twitter"
          value={links.twitter}
          onChange={handleChange}
          placeholder="Twitter URL"
          className="edit-form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Instagram</label>
        <input
          type="url"
          name="instagram"
          value={links.instagram}
          onChange={handleChange}
          placeholder="Instagram URL"
          className="edit-form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">YouTube</label>
        <input
          type="url"
          name="youtube"
          value={links.youtube}
          onChange={handleChange}
          placeholder="YouTube URL"
          className="edit-form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Website</label>
        <input
          type="url"
          name="website"
          value={links.website}
          onChange={handleChange}
          placeholder="Website URL"
          className="edit-form-input"
        />
      </div>

      <button className="save-button" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default EditLinks;
