import React, { useEffect, useState } from "react";
import "./PeopleInfoCSS.css";
import PersonRow from "./PersonRow";
import PeopleData from "./rowPeopleData";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ConfirMation.module.css";
import { jwtDecode } from "jwt-decode";

const PeopleInfo = () => {
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(""); // New state for input page
  const rowsPerPage = 10;

  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    // Check for authToken on component mount
    const token = localStorage.getItem("authToken");
    if (!token) {
      return navigate("/Trip-connect/signIn", { replace: true });
    }
  }, [navigate]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(PeopleData.length / rowsPerPage);

  // Get the data for the current page
  const currentData = PeopleData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle page change
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setInputPage(""); // Reset input after valid navigation
    }
  };

  const handleInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber)) {
      goToPage(pageNumber);
    }
  };

  const handleOnSureButton = async () => {
    const tourName = data?.TourName?.heading; // Safely access heading
    if (tourName) {
      const historyEntry = tourName;

      try {
        await updateUserProfileWithHistoryEntry(historyEntry);
        setConfirmation(true); // Set confirmation on successful update
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
      {confirmation ? (
        <div className="List">
          <header className="People-List">
            <h1>Travellers List</h1>
          </header>
          <div className="rows">
            {currentData.map((person, index) => (
              <PersonRow
                key={index}
                name={person.name}
                email={person.email}
                index={index + (currentPage - 1) * 10}
              />
            ))}
          </div>

          <div className="pagination">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>

          {/* Direct Page Input */}
          <form onSubmit={handleInputSubmit} className="pageInputForm">
            <label className="pageLabel">Go to page: </label>
            <input
              type="number"
              value={inputPage}
              onChange={handleInputChange}
              min="1"
              max={totalPages}
              className="pageInput"
            />
            <button type="submit" className="goButton">
              Go
            </button>
          </form>
          <button
            onClick={() =>
              navigate("/Trip-connect/trips/peopleInfo/support-partner")
            }
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "1vmin",
              padding: "2vmin 2.5vmin",
              fontSize: "2.2vmin",
              cursor: "pointer",
              display: "inline-block",
              transition: "background-color 0.3s ease",
              margin: "1vmin",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")} // Darker green on hover
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
          >
            Buy me a coffee on TripConnect{" "}
            <span style={{ color: "#FFD700", fontWeight: "bold" }}>
              Thank You!
            </span>
          </button>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default PeopleInfo;
