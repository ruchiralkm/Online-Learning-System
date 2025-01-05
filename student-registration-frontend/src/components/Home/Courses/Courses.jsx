import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <div className="row">
      {courses.map((course) => (
        <div className="col-md-4" key={course.id}>
          <div className="card" style={{ width: "18rem" }}>
            {/* Use the full image URL */}
            <img
              src={`http://localhost:5000${course.image}`} // Correct image path
              className="card-img-top"
              alt={course.title}
              style={{ height: "180px", objectFit: "cover" }} // Optional styling for image size
            />
            <div className="card-body">
              <h5 className="card-title">{course.title}</h5>
              <p className="card-text">
                Teacher: {course.teacher_name} <br />
                Lessons: {course.lessons} <br />
                Price: LKR.{course.price}
              </p>
              <a href="#" className="btn btn-primary">
                View Course
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Courses;
