import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";

const Profile = () => {
  const location = useLocation();
  const { student } = location.state || {}; // Access the passed state

  return (
    <>
      <Header student={student} />
      <div>
        <h1>Profile Section</h1>
        <h3>First Name: {student.first_name}</h3>

        <h3>Last Name: {student.last_name}</h3>

        <h3>Mobile Number: {student.mobile_number}</h3>

        <h3>City: {student.city}</h3>

        <h3>Email: {student.email}</h3>

        <h3>Password: {student.password}</h3>

        <button className="btn btn-success">Edit</button>
      </div>
    </>
  );
};

export default Profile;
