import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";

const OtherPage = () => {
  const location = useLocation();
  const { student } = location.state || {}; // Access the passed state

  return (
    <div>
      <Header student={student} />
      <h1>OtherPage</h1>
      {student ? (
        <p>
          Welcome, {student.first_name} {student.last_name}!
        </p>
      ) : (
        <p>No student data available</p>
      )}
    </div>
  );
};

export default OtherPage;
