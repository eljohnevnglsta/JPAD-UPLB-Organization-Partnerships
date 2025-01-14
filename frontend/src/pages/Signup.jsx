import React, { useState } from 'react';
import '../stylesheets/styles.css'; 

const Signup = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState('');
  const [osaId, setOsaId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup Submitted', { email, name, password, confirmPassword, accountType, osaId });
  };

  const toggleOrganizationField = () => {
    const orgField = document.getElementById('organization-field');
    if (accountType === 'organization') {
      orgField.style.display = 'block';
    } else {
      orgField.style.display = 'none';
    }
  };

  return (
    <div>
      <div className="navbar">
        <div className="logo">sitename</div>
        <div className="nav-auth">
          <button className="nav-button" onClick={() => setCurrentPage('login')}>
            Log In
          </button>
        </div>
      </div>

      <div className="signup-page">
        <div className="signup-right">
          <h1><span className="bold">Create</span> your account</h1>
        </div>
        <div className="signup-left">
          <div className="form-container">
            <form id="signup-form" onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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

              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <label htmlFor="account-type">Account Type</label>
              <div className="account-type">
                <input
                  type="radio"
                  id="organization"
                  name="account-type"
                  value="organization"
                  onClick={() => setAccountType('organization')}
                />
                <label htmlFor="organization">Organization</label>

                <input
                  type="radio"
                  id="individual"
                  name="account-type"
                  value="individual"
                  onClick={() => setAccountType('individual')}
                />
                <label htmlFor="individual">Individual</label>
              </div>

              <div id="organization-field" style={{ display: 'none' }}>
                <label htmlFor="osa-id">OSA Org ID (For verification):</label>
                <input
                  type="text"
                  id="osa-id"
                  placeholder="Enter your OSA Org ID"
                  value={osaId}
                  onChange={(e) => setOsaId(e.target.value)}
                />
              </div>

              <button type="submit" className="auth-button">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
