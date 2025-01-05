import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

import "./Login.css";

const Login = ({ setStudent }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showError, setShowError] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if admin credentials are entered
    if (
      loginData.email === "admin@mail.com" &&
      loginData.password === "admin"
    ) {
      navigate("/AdminHome"); // Redirect to AdminHome
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        loginData
      );
      setStudent(response.data.student);
      navigate("/Home"); // Redirect to Home page
    } catch (error) {
      console.error(error);
      setShowError(true); // Show modal on error
    }
  };

  const handleClose = () => setShowError(false); // Close modal

  return (
    <div className="bg container-fluid min-vh-100 d-flex align-items-center justify-content-center">
      <div>
        <h1 className="welcome">
          Welcome to the <span>E-Learning</span>
        </h1>
        <p className="welPara">This is the best online learning platform</p>
      </div>
      <div
        className="card shadow-lg"
        style={{ maxWidth: "500px", width: "100%", marginLeft: "10%" }}
      >
        <div className="card-header bg-primary text-white text-center py-4">
          <h3 className="mb-0">Student Login</h3>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{
                  background: "linear-gradient(to right, #0062cc, #0096ff)",
                  border: "none",
                  transition: "all 0.3s ease",
                }}
              >
                Login
              </button>
            </div>
            <div className="text-center mt-4">
              <p className="text-muted">
                Don't have an account?
                <span
                  className="text-primary ms-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/Register")}
                >
                  Register here
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Modal for error message */}
      <Modal show={showError} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Invalid email or password. Please try again.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
