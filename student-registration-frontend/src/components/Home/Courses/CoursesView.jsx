import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Hook to get URL parameters
import axios from "axios";
import Header from "../../Header/Header";
import "./CoursesView.css";

const CoursesView = () => {
  const { id } = useParams(); // Get course ID from URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Simulate a delay for 2 seconds
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/courses`);
        const selectedCourse = response.data.find((c) => c.id === parseInt(id));
        setCourse(selectedCourse);
        setTimeout(() => setLoading(false), 2000); // Set loading to false after 2 seconds
      } catch (error) {
        console.error("Error fetching course details:", error);
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">Course not found.</p>
      </div>
    );
  }

  return (
    <>
      <Header />
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
              <p>Web Development හරු පෙසල්කාපික හලාබ NodeJs...</p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container py-5">
        <div className="card">
          <img
            src={`http://localhost:5000${course.image}`}
            className="card-img-top"
            alt={course.title}
          />
          <div className="card-body">
            <h1 className="card-title">{course.title}</h1>
            <p className="card-text">
              <strong>Teacher:</strong> {course.teacher_name}
            </p>
            <p className="card-text">
              <strong>Lessons:</strong> {course.lessons}
            </p>
            <p className="card-text">
              <strong>Price:</strong> LKR. {course.price}
            </p>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default CoursesView;
