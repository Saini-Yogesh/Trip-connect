import React, { useEffect, useState } from "react";
import "./PeopleInfoCSS.css";
import PersonRow from "./PersonRow";
import PeopleData from "./rowPeopleData";
import { useNavigate } from "react-router-dom";

const PeopleInfo = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for authToken on component mount
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/Trip-connect/signIn", { replace: true });
      return;
    }
  });

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Calculate the total number of pages
  const totalPages = Math.ceil(PeopleData.length / rowsPerPage);

  // Get the data for the current page
  const currentData = PeopleData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle page change
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
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
          {[...Array(totalPages)].map((ele, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default PeopleInfo;
