import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { Compass, Plus, LogOut, User, Settings, Menu, X, ChevronDown, Map } from "lucide-react";
import styles from "./Navbar.module.css";
import Button from "../Button/Button.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close menus on path changes
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  // Handle dropdown auto-close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownOpen && !e.target.closest(`.${styles.userProfile}`)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [dropdownOpen]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={styles.navbar}>
      <div className={`${styles.navContainer} container`}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <Compass className={styles.logoIcon} />
          <span>Trip<span>Connect</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <Link to="/trips" className={`${styles.navLink} ${isActive("/trips") ? styles.active : ""}`}>
            Explore Trips
          </Link>
          <Link to="/about" className={`${styles.navLink} ${isActive("/about") ? styles.active : ""}`}>
            About Us
          </Link>
          
          {user ? (
            <>
              <Link to="/my-trips" className={`${styles.navLink} ${isActive("/my-trips") ? styles.active : ""}`}>
                My Trips
              </Link>
              <Link to="/create-trip" className={`${styles.createTripBtn} ${isActive("/create-trip") ? styles.activeBtn : ""}`}>
                <Plus size={16} /> Create Trip
              </Link>
              
              {/* User Dropdown */}
              <div className={styles.userProfile}>
                <button
                  className={styles.avatarButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(!dropdownOpen);
                  }}
                >
                  <img
                    src={user.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                    alt={user.name}
                    className={styles.avatar}
                  />
                  <ChevronDown size={14} className={`${styles.chevron} ${dropdownOpen ? styles.rotate : ""}`} />
                </button>

                {dropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <div className={styles.dropdownHeader}>
                      <span className={styles.dropdownName}>{user.name}</span>
                      <span className={styles.dropdownEmail}>{user.email}</span>
                      {user.rating && (
                        <span className={styles.dropdownRating}>★ {user.rating} / 5.0</span>
                      )}
                    </div>
                    
                    <Link to={`/profile/${user._id}`} className={styles.dropdownItem}>
                      <User size={16} /> View Profile
                    </Link>
                    <Link to="/edit-profile" className={styles.dropdownItem}>
                      <Settings size={16} /> Edit Profile
                    </Link>
                    <div className={styles.dropdownDivider}></div>
                    <button onClick={handleLogout} className={`${styles.dropdownItem} ${styles.logoutBtn}`}>
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className={styles.authButtons}>
              <Link to="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary">Register</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button className={styles.mobileMenuToggle} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className={styles.mobileDrawer}>
          <Link to="/trips" className={`${styles.mobileNavLink} ${isActive("/trips") ? styles.mobileActive : ""}`}>
            Explore Trips
          </Link>
          <Link to="/about" className={`${styles.mobileNavLink} ${isActive("/about") ? styles.mobileActive : ""}`}>
            About Us
          </Link>

          {user ? (
            <>
              <Link to="/my-trips" className={`${styles.mobileNavLink} ${isActive("/my-trips") ? styles.mobileActive : ""}`}>
                My Trips
              </Link>
              <Link to="/create-trip" className={`${styles.mobileNavLink} ${isActive("/create-trip") ? styles.mobileActive : ""}`}>
                Create Trip
              </Link>
              <Link to={`/profile/${user._id}`} className={`${styles.mobileNavLink} ${isActive(`/profile/${user._id}`) ? styles.mobileActive : ""}`}>
                View Profile
              </Link>
              <Link to="/edit-profile" className={`${styles.mobileNavLink} ${isActive("/edit-profile") ? styles.mobileActive : ""}`}>
                Edit Profile
              </Link>
              <div className={styles.mobileDivider}></div>
              <button onClick={handleLogout} className={styles.mobileLogoutBtn}>
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <div className={styles.mobileAuthButtons}>
              <Link to="/login" className={styles.fullWidthLink}>
                <Button variant="outline" fullWidth>Sign In</Button>
              </Link>
              <Link to="/register" className={styles.fullWidthLink}>
                <Button variant="primary" fullWidth>Register</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
