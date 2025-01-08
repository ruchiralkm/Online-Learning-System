import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Import the CSS file

const Header = ({ student }) => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg custom-navbar"
        style={{
          background: "linear-gradient(to right, #2c3e50, #3498db)",
          padding: "1rem",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
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
                <Link className="nav-link" to="/MyCourses" state={{ student }}>
                  My Courses
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
