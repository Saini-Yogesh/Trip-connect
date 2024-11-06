import React, { useEffect } from "react";
import "./PeopleInfoCSS.css";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ConfirMation.module.css";
import { jwtDecode } from "jwt-decode";

const Confirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for authToken on component mount
    const token = localStorage.getItem("authToken");
    if (!token) {
      return navigate("/Trip-connect/signIn", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    // Lock scroll when the component mounts
    document.body.style.overflow = "hidden";

    // Unlock scroll when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const location = useLocation();
  const data = location.state;

  const handleOnSureButton = async () => {
    const tourName = data?.TourName; // Safely access heading
    if (tourName) {
      const historyEntry = tourName;

      try {
        await updateUserProfileWithHistoryEntry(historyEntry);
        navigate(`/Trip-connect/${data.category}/peopleInfo`, {
          replace: true,
        });
      } catch (error) {
        console.error("Error updating profile history:" + error);
      }
    } else {
      console.error("Tour name is not available.");
    }
  };

  const updateUserProfileWithHistoryEntry = async (newEntry) => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("No auth token found. Please sign in.");
      navigate("/Trip-connect/signIn", { replace: true });
      return;
    }

    try {
      // Decode the JWT to get email
      const decodedToken = jwtDecode(authToken);
      const emailFromToken = decodedToken.email;

      // Update the profile history using the email
      let response = await fetch(
        "http://localhost:5000/api/user/profile/updateHistory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`, // Include auth token in header
          },
          body: JSON.stringify({
            tourName: newEntry,
            email: emailFromToken,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile history");
      }
      // eslint-disable-next-line
      const updatedProfile = await response.json();
    } catch (error) {
      console.error("Error updating profile:" + error);
      return navigate(-1);
    }
  };

  return (
    <>
      <div style={{ margin: "15vmin" }}></div>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <h2>Confirm Action</h2>
          <p>
            Are you sure you want to discover a travel partner on TripConnect?
          </p>
          <div className={styles.buttonGroup}>
            <button
              className={styles.confirmButton}
              onClick={handleOnSureButton}
            >
              Yes, I'm Sure
            </button>
            <button
              className={styles.cancelButton}
              onClick={() => navigate(-1)} // Navigates back to the previous page
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Confirmation;
