import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader/AdminHeader";
import "./ww.css";

const ViewCourses = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null); // Track course being edited
  const [courseData, setCourseData] = useState({
    title: "",
    teacher_name: "",
    lessons: "",
    price: "",
    image: null,
  });
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  // Fetch courses from the server
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/courses");
        setCourses(response.data);
      } catch (error) {
        console.error(error);
        alert("Error fetching courses. Please try again.");
      }
    };
    fetchCourses();
  }, []);

  // Handle course data change (for update)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  // Handle file change (for update image)
  const handleFileChange = (e) => {
    setCourseData({ ...courseData, image: e.target.files[0] });
  };

  // Handle update course
  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", courseData.title);
    formData.append("teacher_name", courseData.teacher_name);
    formData.append("lessons", courseData.lessons);
    formData.append("price", courseData.price);
    if (courseData.image) formData.append("image", courseData.image);

    try {
      const response = await axios.put(
        `http://localhost:5000/update-course/${editingCourse.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert(response.data);
      setEditingCourse(null);
      setCourseData({
        title: "",
        teacher_name: "",
        lessons: "",
        price: "",
        image: null,
      });
      setShowModal(false); // Close the modal after successful update
      // Re-fetch courses
      const fetchCourses = await axios.get("http://localhost:5000/courses");
      setCourses(fetchCourses.data);
    } catch (error) {
      console.error(error);
      alert("Error updating course. Please try again.");
    }
  };

  // Handle delete course
  const handleDeleteCourse = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/delete-course/${id}`
      );
      alert(response.data);
      // Re-fetch courses after deletion
      const fetchCourses = await axios.get("http://localhost:5000/courses");
      setCourses(fetchCourses.data);
    } catch (error) {
      console.error(error);
      alert("Error deleting course. Please try again.");
    }
  };

  // Start editing a course and open the modal
  const startEditingCourse = (course) => {
    setEditingCourse(course);
    setCourseData({
      title: course.title,
      teacher_name: course.teacher_name,
      lessons: course.lessons,
      price: course.price,
      image: null,
    });
    setShowModal(true); // Show modal when editing starts
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <AdminHeader />
      <h1>View Courses Details</h1>

      {/* Render Courses in a Table */}
      <table>
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Teacher Name</th>
            <th>Lessons</th>
            <th>Price (LKR)</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{course.teacher_name}</td>
              <td>{course.lessons}</td>
              <td>{course.price}</td>
              <td>
                {course.image && (
                  <img
                    src={`http://localhost:5000${course.image}`}
                    alt={course.title}
                    width="50"
                  />
                )}
              </td>
              <td>
                <button onClick={() => startEditingCourse(course)}>Edit</button>
                <button onClick={() => handleDeleteCourse(course.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for updating course */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Edit Course</h2>
            <form onSubmit={handleUpdateCourse}>
              <label htmlFor="title">Course Title</label>
              <input
                type="text"
                name="title"
                value={courseData.title}
                onChange={handleInputChange}
                required
              />
              <br />

              <label htmlFor="teacher_name">Teacher's Name</label>
              <input
                type="text"
                name="teacher_name"
                value={courseData.teacher_name}
                onChange={handleInputChange}
                required
              />
              <br />

              <label htmlFor="lessons">Lessons</label>
              <input
                type="number"
                name="lessons"
                value={courseData.lessons}
                onChange={handleInputChange}
                required
              />
              <br />

              <label htmlFor="price">Price (LKR)</label>
              <input
                type="number"
                name="price"
                value={courseData.price}
                onChange={handleInputChange}
                required
              />
              <br />

              <label htmlFor="image">Course Image</label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png"
              />
              <br />

              <button type="submit">Update Course</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCourses;
