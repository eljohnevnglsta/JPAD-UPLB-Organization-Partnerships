import React, { useState } from 'react';
import '../stylesheets/LoginSignup.css';
import axios from 'axios';

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/account/login', {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);

        // Handle success
        if (response.data.success) {
          alert('Login successful!');
          setErrorMessage('');

          // get accont details
          axios.post ('http://localhost:3001/account/get', { email: email })
          .then((response) => {
            // store account details in local storage
            localStorage.setItem('account', JSON.stringify(response.data));
            if (response.data.role === 'admin') {
              window.location.href = '/reports';
              return;
            }
            window.location.href = '/';
          }).catch((error) => {
            console.log(error.message);
          });

          // TODO: Redirect to dashboard
          
        } else {
          // Handle invalid credentials
          alert('Invalid credentials!');
          setErrorMessage('Invalid credentials!');
        }
      })
      .catch((error) => {
        // Handle server error
        setErrorMessage('An error occurred. Please try again later.');
      });
  };

  return (
    <div>
      <div className="navbar">
        <div className="logo">kasangga</div>
        <div className="nav-auth">
          <button className="nav-button" onClick={() => window.location.href = '/signup'}>
            Sign Up
          </button>
        </div>
      </div>

      <div className="login-page">
        <div className="login-left">
          <h1>
            <span className="bold">Login</span> to your account
          </h1>
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

              {/* Display error message if credentials are invalid */}
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
