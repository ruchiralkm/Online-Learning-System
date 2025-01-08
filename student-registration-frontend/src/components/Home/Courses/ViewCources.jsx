import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Header/Header";
import "./ViewCources.css";

const ViewCources = () => {
  const location = useLocation();
  const { student, course } = location.state || {}; // Access the passed state

  return (
    <div>
      <Header student={student} />

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
                <button class="buy-button" style={{ marginLeft: "30px" }}>
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
      <p>
        Welcome, {student.first_name} {student.last_name}!
      </p>
      <h1>{course.title}</h1>
      <p>
        <strong>Teacher:</strong> {course.teacher_name}
      </p>
      <p>
        <strong>Lessons:</strong> {course.lessons}
      </p>
      <p>
        <strong>Price:</strong> LKR. {course.price}
      </p>
      <img
        src={`http://localhost:5000${course.image}`}
        alt={course.title}
        style={{ maxWidth: "100%", height: "auto" }}
      /> */}
    </div>
  );
};

export default ViewCources;
