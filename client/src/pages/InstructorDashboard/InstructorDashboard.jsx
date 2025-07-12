import React from 'react';
import { useNavigate } from 'react-router-dom';



const InstructorDashboard = ({ authUser }) => {
  const navigate = useNavigate();
   if (!authUser) {
    return <p>Loading or not authenticated...</p>;
  }

  return (
    <div>
      <h2>Welcome, Instructor {authUser.username}</h2>
      
      
    </div>
  );
};

export default InstructorDashboard;
