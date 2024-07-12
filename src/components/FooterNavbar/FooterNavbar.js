import React from "react";
import "./FooterNavbarCSS.css";

const FooterNavbar = () => {
  return (
    <>
      <footer>
        <div className="footer">
          {/* footer container 1   */}
          <div className="footer-container1">
            <div>
              <p className="footer-container1-text1">
                Connect Your Dream Trips
              </p>
              <p className="footer-container1-text2">
                Plan trips, meet fellow travelers, share experiences, and embark
                on unforgettable
              </p>
              <p className="footer-container1-text2">
                journeys with TripConnect.
              </p>
              <button className="footer-container1-join-now-button">
                <a href="/Trip-connect/register" className="no-outline-footer">
                  Join Now
                </a>
              </button>
            </div>
          </div>
          {/* footer container 2   */}
          <div className="footer-container2">
            <div className="footer-container2-part">
              <div className="footer-container2-part1">
                <p className="footer-container2-part1-text1">
                  <a href="/Trip-connect" className="no-outline-footer">
                    TripConnect
                  </a>
                </p>
                <p className="footer-container2-part1-text2">
                  Connect, Plan, Explore Together.
                </p>
                <button className="footer-container2-part1-Join-Now-button">
                  <a
                    href="/Trip-connect/register"
                    className="no-outline-footer"
                  >
                    Join Now
                  </a>
                </button>
              </div>
              <div className="footer-container2-part2">
                <p className="footer-container2-part2-about-section">About</p>
                <p className="footer-container2-part2-about-section">
                  Resources
                </p>
                <p className="footer-container2-part2-about-section">Support</p>
                <p className="footer-container2-part2-about-section">
                  Help Center
                </p>
              </div>
              <div className="footer-container2-part3">
                <p className="footer-container2-part3-contact-info">
                  Contact us
                </p>
                <p className="footer-container2-part3-contact-info">
                  info@tripconnect.com
                </p>
                <p className="footer-container2-part3-contact-info">
                  +91-885-298-3794
                </p>
                <p className="footer-container2-part3-contact-info-social">
                  <i className="fa-brands fa-instagram"></i>
                  <i className="fa-brands fa-facebook"></i>
                  <i className="fa-brands fa-square-youtube"></i>
                </p>
              </div>
            </div>
          </div>
          {/* copy rights  */}
          <div className="footer-container3">
            © 2024 TripConnect, we love our users!
            <i>
              <b> desigied and built by Yogesh</b>
            </i>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterNavbar;
