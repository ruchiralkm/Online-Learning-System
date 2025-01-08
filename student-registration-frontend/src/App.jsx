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
import ViewCources from "./components/Home/Courses/ViewCources";
import AdminCourseDetails from "./components/Admin/AdminCourseDetails";
import MyCourses from "./components/Home/Courses/MyCourses";

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
        <Route path="/MyCourses" element={<MyCourses />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/ViewCources" element={<ViewCources />} />
        //*!====== Admin Header Controls=====*//
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/AdminStudent" element={<AdminStudent />} />
        <Route path="/AddCourses" element={<AddCourses />} />
        <Route path="/AdminCourseDetails" element={<AdminCourseDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
