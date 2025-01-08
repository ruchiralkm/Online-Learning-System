import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Header/Header";
import "./MyCourses.css";

const MyCourses = () => {
  const location = useLocation();
  const { student } = location.state || {}; // Access the passed state

  const [courses, setCourses] = useState([]); // State to hold course data

  useEffect(() => {
    if (student?.email) {
      // Fetch courses for the logged-in student
      fetch(`http://localhost:5000/my-courses?email=${student.email}`)
        .then((response) => response.json())
        .then((data) => setCourses(data))
        .catch((error) => console.error("Error fetching courses:", error));
    }
  }, [student?.email]);

  return (
    <div>
      <Header student={student} />
      <div className="container mt-4">
        <h1 className="text-center mb-4">My Courses</h1>
        <p className="text-center">
          Welcome, {student.first_name} {student.last_name}!
        </p>

        <h2 className="text-center mt-4">Your Courses:</h2>
        {courses.length > 0 ? (
          <div className="row">
            {courses.map((course) => (
              <div className="col-md-4 mb-4" key={course.course_id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={`http://localhost:5000${course.course_image}`}
                    className="card-img-top"
                    alt={course.course_title}
                    style={{
                      maxHeight: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{course.course_title}</h5>
                    <p className="card-text">
                      <strong>Price:</strong> LKR {course.course_price}
                    </p>
                  </div>
                  <div className="card-footer text-center">
                    <button className="btn btn-primary">Start Course</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">You have no courses yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
