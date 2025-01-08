import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Header/Header";
import axios from "axios";

import "./ViewCources.css";

const ViewCources = () => {
  const location = useLocation();
  const { student, course } = location.state || {}; // Access the passed state

  const handleOrder = async () => {
    try {
      const orderData = {
        first_name: student.first_name,
        last_name: student.last_name,
        email: student.email,
        mobile_number: student.mobile_number,
        course_id: course.id,
        course_title: course.title,
        course_price: course.price,
      };

      const response = await axios.post(
        "http://localhost:5000/order-course",
        orderData
      );

      if (response.status === 200) {
        alert("Order placed successfully!");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order");
    }
  };

  return (
    <div>
      <Header student={student} />
      {/* <h3>Student Details</h3>
      <p>{student.first_name}</p>
      <p>{student.last_name}</p>
      <p>{student.email}</p>
      <p>{student.mobile_number}</p> */}
      <div class="container mt-5">
        <div class="course-header d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <img
              src={`http://localhost:5000${course.image}`}
              alt="Node JS Logo"
            />
            <div class="ms-3">
              <h1 style={{ fontSize: "2rem" }} class="course-title">
                {course.title}
              </h1>
              <p style={{ fontSize: "1.1rem" }}>
                Welcome to the Elerarning online learning management system.
                This is our course content. You can enter the course by clicking
                the Enroll Now
              </p>
              <h3 class="price-section">LKR.{course.price}</h3>
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
                  Lecture:{course.teacher_name}
                </p>
                <button
                  type="button"
                  class="btn btn-primary"
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

        <div class="row">
          <div class="col-md-8">
            <div class="lessons-section">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>
                  <strong>Course Content</strong>
                </h3>
                <h4>
                  <strong>Lessons: {course.lessons}</strong>
                </h4>
              </div>
              <div class="lesson">
                <span>1. JavaScript & JavaScript Engines</span>
                <span>08m 54s</span>
              </div>
              <div class="lesson">
                <span>2. What is NodeJS</span>
                <span>06m 38s</span>
              </div>
              <div class="lesson">
                <span>3. Installing NodeJS</span>
                <span>09m 12s</span>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="lessons-section">
              <h3>
                <strong>Description</strong>
              </h3>
              <p>
                This course is about {course.title} and host by Mr/Mrs.{" "}
                {course.teacher_name}. There are {course.lessons} lessons in
                this course.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*       

      {/* ============================================================= */}
      {/* Model */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Are you want to sure?
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <h5>Course details</h5>
              <p>ID{course.id}</p>
              <p>Title{course.title}</p>
              <p>Price{course.price}</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-primary"
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
