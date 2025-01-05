import React, { useState } from "react";
import "./LoginPage.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/login", {
        email,
        password,
      });

      console.log("Login successful:", response.data);

      // Navigate to dashboard page
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Emplify</h1>
          <p>Signifying Growth and Empowerment</p>
        </div>
        <div className="login-form">
          <h2>Account Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            <div className="login-links">
              <a href="#">Forgot Email?</a>
              <a href="#">Forgot Password?</a>
            </div>
          </form>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
