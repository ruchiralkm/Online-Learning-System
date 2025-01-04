import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    city: "",
    email: "",
    password: "",
  });

  const [showSuccess, setShowSuccess] = useState(false); // State for success modal
  const [showError, setShowError] = useState(false); // State for error modal
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        formData
      );
      setShowSuccess(true); // Show success modal
      setFormData({
        first_name: "",
        last_name: "",
        mobile_number: "",
        city: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
      setShowError(true); // Show error modal
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate("/Login"); // Redirect to login page
  };

  const handleErrorClose = () => setShowError(false);

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
          <h3 className="mb-0">Student Registration</h3>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="first_name"
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="first_name">First Name</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="last_name"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="last_name">Last Name</label>
                </div>
              </div>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="mobile_number"
                name="mobile_number"
                placeholder="Mobile Number"
                value={formData.mobile_number}
                onChange={handleChange}
                required
              />
              <label htmlFor="mobile_number">Mobile Number</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <label htmlFor="city">City</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
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
                value={formData.password}
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
                Register Now
              </button>
            </div>
            <div className="text-center mt-4">
              <p className="text-muted">
                Already have an account?
                <span
                  className="text-primary ms-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/Login")}
                >
                  Login here
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <Modal show={showSuccess} onHide={handleSuccessClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registration Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your account has been created successfully. Please log in to continue.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSuccessClose}>
            Go to Login
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
      <Modal show={showError} onHide={handleErrorClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Failed to register. Please try again later.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleErrorClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Register;
