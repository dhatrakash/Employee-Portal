import React from "react";
import { Link } from "react-router-dom";
import "./DashboardPage.css";

const DashboardPage = () => {
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      window.location.href = "/login";
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, Employee!</h1>
        <p>Your dashboard at a glance.</p>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <main className="dashboard-content">
        <section className="dashboard-section">
          <h2>Tasks Overview</h2>
          <p>Pending Tasks: 5</p>
          <p>Completed Tasks: 10</p>
        </section>
        <section className="dashboard-section">
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
        <section className="dashboard-section">
          <h2>Announcements</h2>
          <p>No new announcements at this time.</p>
        </section>
      </main>
      <footer className="dashboard-footer">
        <p>&copy; 2025 Employee Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DashboardPage;
