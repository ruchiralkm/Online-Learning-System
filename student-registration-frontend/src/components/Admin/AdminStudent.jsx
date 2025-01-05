import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader/AdminHeader";

const AdminStudent = () => {
  const [students, setStudents] = useState([]); // State to hold student data

  // Fetch student data from the API
  useEffect(() => {
    axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data); // Store the student data in the state
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []); // Run only once when the component loads

  return (
    <div>
      <AdminHeader />
      <h1>Student List</h1>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mobile Number</th>
            <th>City</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.mobile_number}</td>
              <td>{student.city}</td>
              <td>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStudent;
