import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = ({ authUser }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Welcome, Student {authUser.username}</h2>
      <button onClick={() => navigate('/courses')}>🎓 View Available Courses</button>
    </div>
  );
};

export default StudentDashboard;
