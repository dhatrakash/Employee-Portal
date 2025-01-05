import React, { useState } from "react";
import axios from "axios";
import "./RegistrationPage.css";
import { Link } from "react-router-dom";

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Password validation function
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8;

    if (!isValidLength) return "Password must be at least 8 characters long";
    if (!hasUpperCase) return "Password must contain at least one uppercase letter";
    if (!hasNumber) return "Password must contain at least one number";
    if (!hasSpecialChar) return "Password must contain at least one special character";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password
    const validationMessage = validatePassword(password);
    if (validationMessage) {
      setMessage(validationMessage);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/register", {
        username,
        name,
        email,
        password,
      });
      setMessage("Registration successful! You can now log in.");
    } catch (error) {
      setMessage(error.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <div className="registration-header">
          <h1>Register</h1>
          <p>Create your account to access the portal</p>
        </div>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-field">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>
          <div className="form-field">
            <label>Full Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-field">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-field">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="registration-button">
            Register
          </button>
          <p className="message">{message}</p>
        </form>
        <div className="registration-links">
          <p>
            Already have an account? <Link to="/">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
