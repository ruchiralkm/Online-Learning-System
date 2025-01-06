import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Courses.css"; // Import the custom CSS

const Courses = () => {
  const [courses, setCourses] = useState([]);

  // Fetch courses data from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/courses") // Make sure your API URL is correct
      .then((response) => {
        setCourses(response.data); // Store the fetched data in state
      })
      .catch((error) => {
        console.error("There was an error fetching the courses!", error);
      });
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 title-gradient">Explore Our Courses</h1>
      <div className="row g-4">
        {courses.map((course) => (
          <div className="col-lg-4 col-md-6" key={course.id}>
            <div className="card shadow-sm course-card">
              <img
                src={`http://localhost:5000${course.image}`} // Correct image path
                className="card-img-top"
                alt={course.title}
              />
              <div className="card-body">
                <h5 className="card-title text-primary">{course.title}</h5>
                <p className="card-text text-muted">
                  <strong>Teacher:</strong> {course.teacher_name} <br />
                  <strong>Lessons:</strong> {course.lessons} <br />
                  <strong>Price:</strong> LKR. {course.price}
                </p>
                <a href="#" className="btn btn-outline-primary w-100">
                  View Course
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
