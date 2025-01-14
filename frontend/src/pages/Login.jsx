import React, { useState } from 'react';
import '../stylesheets/styles.css';

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Submitted', { email, password });
  };

  return (
    <div>
      <div className="navbar">
        <div className="logo">sitename</div>
        <div className="nav-auth">
          <button className="nav-button" onClick={() => setCurrentPage('signup')}>
            Sign Up
          </button>
        </div>
      </div>

      <div className="login-page">
        <div className="login-left">
          <h1><span className="bold">Login</span> to your account</h1>
        </div>
        <div className="login-right">
          <div className="auth-container">
            <form id="login-form" onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
              <button type="submit" className="auth-button">Log In</button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
