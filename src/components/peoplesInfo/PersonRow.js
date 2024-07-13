import React from "react";

const PersonRow = (props) => {
  const { name, email } = props;
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid black",
          alignItems: "center",
          flexWrap: "wrap",
          padding: "1rem",
          minHeight: "5vmin",
        }}
      >
        <div>{name}</div>
        <div>{email}</div>
      </div>
    </>
  );
};

export default PersonRow;
