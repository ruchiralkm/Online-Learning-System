import React from "react";
import { Link } from "react-router-dom";
import "./AdminHeader.css";

const AdminHeader = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          <Link className="nav-link" to="/AdminHome">
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
                <Link className="nav-link">Welcome, Admin</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/AdminStudent">
                  Students
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="coursesDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Courses
                </a>
                <ul className="dropdown-menu" aria-labelledby="coursesDropdown">
                  <li>
                    <Link className="dropdown-item" to="/AddCourses">
                      Add Courses
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/AdminCourseDetails">
                      View Courses
                    </Link>
                  </li>
                </ul>
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

export default AdminHeader;
