import React, { useEffect, useState } from "react";
// import Header from "./Header";
import FirstColumn from "./FirstColumn";
import "./Profile.css";
import SecondColume from "./SecondColumn";
import { useNavigate, useParams } from "react-router-dom";
import ProfileNotFound from "./profileNotFound";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    (async () => {
      try {
        let response = await fetch(
          "http://localhost:5000/api/user/profileDetail",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        response = await response.json();
        if (response.success) {
          setUserDetails(response.result);
        }
      } catch (error) {}
    })();
  }, [username, navigate]);

  const {
    email,
    name,
    gender,
    city,
    hobbiesOrProfession,
    about,
    history,
    experiences,
    links,
  } = userDetails;

  return (
    <>
      <div style={{ height: "15vmin" }}></div>
      {Object.keys(userDetails).length > 0 ? (
        <div>
          {/* <Header /> */}
          <div className="profile-page">
            <div className="first-column">
              <FirstColumn
                email={email}
                name={name}
                gender={gender}
                city={city}
                username={username}
                links={links}
              />
            </div>
            <div className="second-column">
              <SecondColume
                hobbiesOrProfession={hobbiesOrProfession}
                about={about}
                history={history}
                experiences={experiences}
              />
            </div>
          </div>
        </div>
      ) : (
        <ProfileNotFound />
      )}
    </>
  );
};

export default Profile;
