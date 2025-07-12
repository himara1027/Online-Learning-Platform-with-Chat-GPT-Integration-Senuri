// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import InstructorDashboard from './pages/InstructorDashboard/InstructorDashboard';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import EditCourse from './components/Instructor/EditCourse';
import CourseDetail from './components/Instructor/CourseDetail';
import DeleteCourse from './components/Instructor/DeleteCourse';
import CourseList from './components/student/CourseList';
import EnrolledDetail from './components/student/EnrolledDetail';
import EnrolledCourses from './components/student/EnrolledCourses';
import EnrolledStudents from './components/Instructor/EnrolledStudents';
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
        <Route path="/instructor-dashboard" element={<InstructorDashboard authUser={authUser} token={token} />} />
        <Route path="/edit-course/:id" element={<EditCourse token={token} />} />
        <Route path="/delete-course/:id" element={<DeleteCourse token={token} />} />
        <Route path="/student-dashboard" element={<StudentDashboard authUser={authUser} />} />
        <Route path="/instructor/courses/:courseId/students" element={<EnrolledStudents token={token} />}
        />

        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/courses" element={<CourseList token={token} />} />
        <Route path="/courses/:id" element={<EnrolledDetail />} />
        <Route path="/my-courses" element={<EnrolledCourses token={token} />} />




      </Routes>
    </Router>
  );
};

export default App;
