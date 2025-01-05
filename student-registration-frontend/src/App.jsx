import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register";
import OtherPage from "./components/Home/OtherPage";
import Profile from "./components/Home/Profile";
import AdminHome from "./components/Admin/AdminHome";
import AdminStudent from "./components/Admin/AdminStudent";
import AddCourses from "./components/Admin/AddCourses";

const App = () => {
  const [student, setStudent] = useState(null); // Manage student state

  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login setStudent={setStudent} />} />
        //*!====== Student Header Controls=====*//
        <Route path="/" element={<Login setStudent={setStudent} />} />
        <Route path="/Home" element={<Home student={student} />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/OtherPage" element={<OtherPage />} />
        <Route path="/Profile" element={<Profile />} />
        //*!====== Admin Header Controls=====*//
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/AdminStudent" element={<AdminStudent />} />
        <Route path="/AddCourses" element={<AddCourses />} />
      </Routes>
    </Router>
  );
};

export default App;
