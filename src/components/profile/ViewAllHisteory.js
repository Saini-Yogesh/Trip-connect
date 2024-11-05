import React, { useState } from "react";
import styles from "./ViewAllHisteoryCSS.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import formatRelativeTime from "./formRelativeTime";

const AllHistory = () => {
  const location = useLocation();
  const history = location.state?.history || [];
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const entriesPerPage = 8;
  const navigate = useNavigate();

  const totalPages = Math.ceil(history.length / entriesPerPage);
  const currentHistory = history
    .slice()
    .reverse()
    .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    const page = parseInt(inputPage, 10);
    if (page >= 1 && page <= totalPages) {
      goToPage(page);
      setInputPage("");
    } else {
      alert(`Please enter a number between 1 and ${totalPages}`);
    }
  };

  return (
    <>
      <div style={{ height: "15vmin" }}></div>
      <div className={styles.allHistorySection}>
        <h1 className={styles.heading}>All History</h1>
        {currentHistory.length === 0 ? (
          <p className={styles.noHistory}>No history yet...</p>
        ) : (
          currentHistory.map((entry, index) => (
            <div
              key={index}
              className={`${styles.historyEntry} ${
                index % 2 === 0 ? styles.historyEntryBackground : ""
              }`}
            >
              <p>
                Planned an adventure to <strong>{entry.description}</strong>
              </p>
              <p>{formatRelativeTime(entry.date)}</p>
            </div>
          ))
        )}

        <div className={styles.pagination}>
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
        <form onSubmit={handleInputSubmit} className={styles.pageInputForm}>
          <label className={styles.pageLabel}>Go to page: </label>
          <input
            type="number"
            value={inputPage}
            onChange={handleInputChange}
            min="1"
            max={totalPages}
            className={styles.pageInput}
          />
          <button type="submit" className={styles.goButton}>
            Go
          </button>
        </form>

        <button onClick={() => navigate(-1)} className={styles.backButton}>
          Back to Main Page
        </button>
      </div>
    </>
  );
};

export default AllHistory;
