import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Site Name</h1>
      <ul className="navbar-links">
        <li>
          <Link to="/" className="navbar-link">
            Accounts
          </Link>
        </li>
        <li>
          <Link to="/reports" className="navbar-link">
            Reports
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
