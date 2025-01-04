import React from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";

const Home = ({ student }) => {
  return (
    <>
      <Header student={student} /> {/* Pass student as a prop */}
      <div style={{ margin: "20px" }}>
        <h1>Welcome to the Home Page</h1>
        <p>
          Hello, {student ? `${student.city} ${student.last_name}` : "Guest"}!
        </p>

        <button>
          <Link to="/OtherPage" state={{ student }}>
            OtherPage
          </Link>
        </button>
      </div>
    </>
  );
};

export default Home;
