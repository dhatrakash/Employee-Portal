import React, {useState} from 'react';
import './LoginPage.css';
import axios from 'axios';


const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/login", {
        email,
        password,
      });
      setMessage(response.data.message); // Handle success
    } catch (error) {
      setMessage(error.response?.data?.detail || "Login failed"); // Handle error
    }
  };



  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Emplify </h1>
          <p>Signifying Growth and Empowerment</p>
        </div>
        <div className="login-form">
          <h2>Account Login</h2>
          <form>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your Email'
            required
          />
            </div>
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='enter your password'
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
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
