import React from "react";

const PersonRow = (props) => {
  const { name, email } = props;
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <div>{name}</div>
        <div>{email}</div>
      </div>
    </>
  );
};

export default PersonRow;
