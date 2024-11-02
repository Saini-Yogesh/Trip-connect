import React from "react";

const PersonRow = (props) => {
  const { name, email, index } = props;
  return (
    <div className="each-row">
      <div>
        {index + 1}
        {"."} {name}
      </div>
      <div>
        {email}
        <a href={`mailto:${email}`}>
          <i className="fa-regular fa-envelope"></i>
        </a>
      </div>
    </div>
  );
};

export default PersonRow;
