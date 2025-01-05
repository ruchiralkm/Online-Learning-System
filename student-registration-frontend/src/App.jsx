import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register";
import OtherPage from "./components/Home/OtherPage";
import Profile from "./components/Home/Profile";
import AdminHome from "./components/Admin/AdminHome";
import AdminStudent from "./components/Admin/AdminStudent";

const App = () => {
  const [student, setStudent] = useState(null); // Manage student state

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setStudent={setStudent} />} />
        <Route path="/Home" element={<Home student={student} />} />
        <Route path="/Login" element={<Login setStudent={setStudent} />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/OtherPage" element={<OtherPage />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/AdminStudent" element={<AdminStudent />} />
      </Routes>
    </Router>
  );
};

export default App;
