import React from "react";
import RegisterContent from "./registerContent/RegisterContent";

const Register = () => {
  const heading = "Plan Your Perfect Travel Adventure!";
  const para =
    "Discover like-minded travelers and create unforgettable journeys together. Sign up in minutes and connect with fellow adventurers today.";
  const btn1 = "Sign Up";
  const btn2 = "Sign In";
  const num1 = "10k+";
  const num2 = "50+";
  const num3 = "4.9";
  const txt1 = "Users";
  const txt2 = "Countries";
  const txt3 = "Rating";
  const Link1 = "/Trip-connect/signup";
  const Link2 = "/Trip-connect/signIn";

  return (
    <>
      <RegisterContent
        heading={heading}
        para={para}
        btn1={btn1}
        btn2={btn2}
        txt1={txt1}
        txt2={txt2}
        txt3={txt3}
        num1={num1}
        num2={num2}
        num3={num3}
        Link1={Link1}
        Link2={Link2}
      />
    </>
  );
};

export default Register;
