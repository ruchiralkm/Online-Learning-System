import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const location = useLocation();
  const { student } = location.state || {}; // Access the passed state

  // Initialize state with the current student data
  const [updatedData, setUpdatedData] = useState({
    first_name: student.first_name,
    last_name: student.last_name,
    mobile_number: student.mobile_number,
    city: student.city,
    email: student.email,
    password: student.password,
  });

  // State for modal visibility
  const [showModal, setShowModal] = useState(false);

  // Handle changes in input fields
  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  // Handle update submission
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/update",
        updatedData
      );
      setShowModal(true); // Show the modal
    } catch (error) {
      console.error(error);
      alert("Error updating profile. Please try again later.");
    }
  };

  // Close modal handler
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Header student={student} />
      <div className="container-fluid profile-container min-vh-100 d-flex align-items-center justify-content-center">
        <div className="card profile-card shadow-lg">
          <div className="card-header bg-primary text-white text-center">
            <h2>Update Profile</h2>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  className="form-control"
                  value={updatedData.first_name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  className="form-control"
                  value={updatedData.last_name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Mobile Number</label>
                <input
                  type="text"
                  name="mobile_number"
                  className="form-control"
                  value={updatedData.mobile_number}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  value={updatedData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={updatedData.email}
                  readOnly
                />
              </div>

              <div className="form-group mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={updatedData.password}
                  onChange={handleChange}
                />
              </div>

              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={handleUpdate}
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal for success message */}
      {showModal && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Success</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body text-center">
                <p>Student information updated successfully!</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
