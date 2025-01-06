import React, { useState } from "react";
import AdminHeader from "./AdminHeader/AdminHeader";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AddCourses = () => {
  const [courseData, setCourseData] = useState({
    title: "",
    teacher_name: "",
    lessons: "",
    price: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", courseData.title);
    formData.append("teacher_name", courseData.teacher_name);
    formData.append("lessons", courseData.lessons);
    formData.append("price", courseData.price);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/add-course",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert(response.data);
    } catch (error) {
      console.error(error);
      alert("Error adding course. Please try again.");
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow-lg">
              <div className="card-header bg-primary text-white text-center">
                <h3 className="mb-0">Add New Course</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Course Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={courseData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Course Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="image"
                      onChange={handleFileChange}
                      accept=".jpg,.jpeg,.png"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="teacher_name" className="form-label">
                      Teacher's Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="teacher_name"
                      name="teacher_name"
                      value={courseData.teacher_name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="lessons" className="form-label">
                      Lessons
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="lessons"
                      name="lessons"
                      value={courseData.lessons}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Price (LKR)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      value={courseData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Add Course
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourses;
