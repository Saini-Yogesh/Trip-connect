import React from "react";
import { Link } from "react-router-dom";
import { Compass, Github, Twitter, Instagram, Heart } from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        <div className={styles.grid}>
          {/* Logo & Slogan */}
          <div className={styles.brandCol}>
            <Link to="/" className={styles.logo}>
              <Compass className={styles.logoIcon} />
              <span>Trip<span>Connect</span></span>
            </Link>
            <p className={styles.description}>
              Connecting solo travelers around the globe. Find travel buddies, share adventures, split costs, and travel smarter.
            </p>
          </div>

          {/* Navigation Links */}
          <div className={styles.linksCol}>
            <h4>Quick Links</h4>
            <ul className={styles.linksList}>
              <li><Link to="/trips">Explore Trips</Link></li>
              <li><Link to="/create-trip">Create a Trip</Link></li>
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/register">Join TripConnect</Link></li>
            </ul>
          </div>

          {/* Support / Info */}
          <div className={styles.linksCol}>
            <h4>Legal</h4>
            <ul className={styles.linksList}>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#safety">Safety Guidelines</a></li>
              <li><a href="#support">Help Center</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className={styles.socialCol}>
            <h4>Follow Our Journey</h4>
            <p className={styles.socialDesc}>Get updates, travel tips, and stories from fellow tripconnectors.</p>
            <div className={styles.socialIcons}>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p className={styles.copy}>
            &copy; {new Date().getFullYear()} TripConnect. All rights reserved.
          </p>
          <p className={styles.heartText}>
            Made with <Heart size={14} className={styles.heartIcon} /> for adventurers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
