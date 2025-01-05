import React, { useState } from "react";
import AdminHeader from "./AdminHeader/AdminHeader";
import axios from "axios";

const AddCourses = () => {
  const [courseData, setCourseData] = useState({
    title: "",
    teacher_name: "",
    lessons: "",
    price: "",
  });
  const [image, setImage] = useState(null); // Separate state for the image file

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Store the selected file
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form refresh
    const formData = new FormData();
    formData.append("title", courseData.title);
    formData.append("teacher_name", courseData.teacher_name);
    formData.append("lessons", courseData.lessons);
    formData.append("price", courseData.price);
    if (image) formData.append("image", image); // Attach the image file

    try {
      const response = await axios.post(
        "http://localhost:5000/add-course",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert(response.data); // Success message
    } catch (error) {
      console.error(error);
      alert("Error adding course. Please try again.");
    }
  };

  return (
    <div>
      <AdminHeader />
      <h1>Admin Courses</h1>

      <div>
        <h2>Simple React Form</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Course Title</label>
          <input
            type="text"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            required
          />
          <br />

          <label htmlFor="image">Course Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png"
            required
          />
          <br />

          <label htmlFor="teacher_name">Teacher's Name</label>
          <input
            type="text"
            name="teacher_name"
            value={courseData.teacher_name}
            onChange={handleChange}
            required
          />
          <br />

          <label htmlFor="lessons">Lessons</label>
          <input
            type="number"
            name="lessons"
            value={courseData.lessons}
            onChange={handleChange}
            required
          />
          <br />

          <label htmlFor="price">Price (LKR)</label>
          <input
            type="number"
            name="price"
            value={courseData.price}
            onChange={handleChange}
            required
          />
          <br />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddCourses;
