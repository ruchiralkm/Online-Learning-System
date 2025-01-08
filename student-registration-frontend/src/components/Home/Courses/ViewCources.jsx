import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Header/Header";
import Swal from "sweetalert2"; // Import SweetAlert2
import axios from "axios";

import "./ViewCources.css";

const ViewCources = () => {
  const location = useLocation();
  const { student, course } = location.state || {}; // Access the passed state
  const [orderStatus, setOrderStatus] = useState(""); // Track order status

  // Handle "Yes" button click (place the order)
  const handleOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/order-course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_first_name: student.first_name,
          student_last_name: student.last_name,
          student_email: student.email,
          student_mobile_number: student.mobile_number,
          course_id: course.id,
          course_title: course.title,
          course_price: course.price,
          course_image: course.image,
        }),
      });

      const result = await response.text();
      setOrderStatus(result); // Set the response status

      // Show SweetAlert with success message
      Swal.fire({
        title: "Order Placed!",
        text: "Your order has been placed successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error placing the order:", error);
      setOrderStatus("Error placing the order");

      // Show SweetAlert with error message
      Swal.fire({
        title: "Order Failed",
        text: "There was an error placing your order. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>
      <Header student={student} />
      <div className="container mt-5">
        <div className="course-header d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <img
              src={`http://localhost:5000${course.image}`}
              alt="Node JS Logo"
            />
            <div className="ms-3">
              <h1 style={{ fontSize: "2rem" }} className="course-title">
                {course.title}
              </h1>
              <p style={{ fontSize: "1.1rem" }}>
                Welcome to the Elerarning online learning management system.
                This is our course content. You can enter the course by clicking
                the Enroll Now
              </p>
              <h3 className="price-section">LKR.{course.price}</h3>
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <img
                  src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png"
                  alt="ss"
                  style={{ width: "50px", height: "auto" }}
                />
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "550",
                    marginTop: "18px",
                  }}
                >
                  Lecture: {course.teacher_name}
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  style={{ marginLeft: "30px" }}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <div className="lessons-section">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>
                  <strong>Course Content</strong>
                </h3>
                <h4>
                  <strong>Lessons: {course.lessons}</strong>
                </h4>
              </div>
              <div className="lesson">
                <span>1. JavaScript & JavaScript Engines</span>
                <span>08m 54s</span>
              </div>
              <div className="lesson">
                <span>2. What is NodeJS</span>
                <span>06m 38s</span>
              </div>
              <div className="lesson">
                <span>3. Installing NodeJS</span>
                <span>09m 12s</span>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="lessons-section">
              <h3>
                <strong>Description</strong>
              </h3>
              <p>
                This course is about {course.title} and hosted by Mr/Mrs.{" "}
                {course.teacher_name}. There are {course.lessons} lessons in
                this course.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Are you sure you want to enroll?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5>Course details</h5>
              <p>ID: {course.id}</p>
              <p>Title: {course.title}</p>
              <p>Price: {course.price}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleOrder}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCources;
