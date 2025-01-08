import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Header/Header";

const MyCourses = () => {
  const location = useLocation();
  const { student } = location.state || {}; // Access the passed state
  return (
    <div>
      <Header student={student} />
      <h1>MyCourses Page</h1>
      <p>{student.first_name}</p>
      <p>{student.last_name}</p>
    </div>
  );
};

export default MyCourses;
