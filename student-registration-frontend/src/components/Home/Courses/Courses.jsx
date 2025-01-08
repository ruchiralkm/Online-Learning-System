import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import axios from "axios";

import "./Courses.css"; // Import the custom CSS

const Courses = ({ student }) => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term

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

  // Filter courses based on the search term
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5">
      {/* //*====== STYLISH SEARCH BAR =====// */}
      <div className="searchBox mb-5">
        <input
          type="text"
          className="stylish-search"
          placeholder="🔍 Search for your favorite course..."
          value={searchTerm} // Bind input value to searchTerm
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
        />
      </div>
      <div className="row g-4 mb-5">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
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
                  {/* Navigate to CoursesView.jsx */}
                  <Link
                    className="btn btn-outline-primary w-100"
                    to="/ViewCources"
                    state={{ student, course }}
                  >
                    View Course
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
