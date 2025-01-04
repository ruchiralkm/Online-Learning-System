import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Import the CSS file

const Header = ({ student }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          <Link className="nav-link" to="/Home" state={{ student }}>
            📚Elearning
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/Profile" state={{ student }}>
                  {/* Display student's first name and last name */}
                  Welcome,{" "}
                  {student
                    ? `${student.first_name} ${student.last_name}`
                    : "Guest"}
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/OtherPage" state={{ student }}>
                  OtherPage
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
