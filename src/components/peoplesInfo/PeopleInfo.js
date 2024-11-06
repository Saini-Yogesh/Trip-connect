import React, { useEffect, useState } from "react";
import "./PeopleInfoCSS.css";
import PersonRow from "./PersonRow";
import PeopleData from "./rowPeopleData";
import { useNavigate } from "react-router-dom";

const PeopleInfo = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState(""); // New state for input page
  const rowsPerPage = 10;

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

  return (
    <>
      <div style={{ margin: "15vmin" }}></div>

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
          onClick={() => navigate("/Trip-connect/support-partner")}
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
    </>
  );
};

export default PeopleInfo;
