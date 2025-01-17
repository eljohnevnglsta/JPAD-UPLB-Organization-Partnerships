import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/YSES-logo.png';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header-container">
      {/* Logo Section */}
      <div className="logo-section">
        <p className="site-name">sitename</p>
      </div>

      {/* Navigation Section */}
      <div className="nav-section">
        <div 
          className="nav-item" 
          onClick={() => navigate('/')}
        >
          Accounts
        </div>
        <div 
          className="nav-item" 
          onClick={() => navigate('/reports')}
        >
          Reports
        </div>
        <div className="nav-item search-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <button className="search-icon">🔍</button>
        </div>
        <div className="nav-item name-section">
          <img 
            src={logo}
            alt="YSES Logo" 
            className="yses-logo" 
          />
          <span className="name">YSES</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
