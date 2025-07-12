// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import InstructorDashboard from './pages/InstructorDashboard/InstructorDashboard';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';



import { jwtDecode } from 'jwt-decode';


const App = () => {
  const [authUser, setAuthUser] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAuthUser(decoded);
      } catch (err) {
        console.error('Invalid token:', err.message);
        localStorage.removeItem('token');
        setAuthUser(null);
      }
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setAuthUser(decoded); // Contains id and maybe role
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setAuthUser={setAuthUser} />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard authUser={authUser} />} />
        <Route path="/student-dashboard" element={<StudentDashboard authUser={authUser} />} />

     


      </Routes>
    </Router>
  );
};

export default App;
