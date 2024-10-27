import React from "react";

const profileNotFound = () => {
  return (
    <>
      <div
        style={{
          textAlign: "center",
          minHeight: "50vmin",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "10vmin 2vmin",
        }}
      >
        <h1>⚠️Sorry, this page isn't available.</h1>
        <p style={{ paddingTop: "20px" }}>
          The link you followed may be broken, or the page may have been
          removed.{" "}
          <a style={{ textDecoration: "none" }} href="/Trip-connect">
            Go back to Trip-Connect.
          </a>
        </p>
      </div>
    </>
  );
};

export default profileNotFound;
