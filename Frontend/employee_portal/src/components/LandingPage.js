import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import axios from "axios";

const LandingPage = () => {
  const [userName, setUserName] = useState(null); // Set to null to check if the user is logged in
  const [announcements, setAnnouncements] = useState([]);

  // Fetch user details and announcements when the page loads
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        // Fetch user profile (only if logged in)
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get("http://127.0.0.1:8000/user/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserName(response.data.name || response.data.email);
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        setUserName(null); // User is not logged in
      }
    };

    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/announcements");
        setAnnouncements(response.data || []);
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      }
    };

    fetchUserName();
    fetchAnnouncements();
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token"); // Remove token from storage
      setUserName(null); // Reset user state
      console.log("User logged out");
    }
  };

  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Welcome to the Employee Portal</h1>
        <p>Empowering employees to work smarter.</p>
        <div className="header-buttons">
          {!userName ? (
            <>
              <Link to="/login" className="header-button">
                Login
              </Link>
              <Link to="/register" className="header-button">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="user-greeting">Hello, {userName}!</span>
              <button className="header-button logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </header>
      <main className="landing-content">
        <section className="portal-section">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li>
              <Link to="/reports">Reports</Link>
            </li>
          </ul>
        </section>
        <section className="portal-section">
          <h2>Announcements</h2>
          {announcements.length > 0 ? (
            <ul>
              {announcements.map((announcement, index) => (
                <li key={index}>{announcement.message}</li>
              ))}
            </ul>
          ) : (
            <p>No new announcements at this time.</p>
          )}
        </section>
      </main>
      <footer className="landing-footer">
        <p>&copy; 2025 Employee Portal. All rights reserved.</p>
        <p>
          <Link to="/contact">Contact Us</Link> | <Link to="/privacy">Privacy Policy</Link>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
