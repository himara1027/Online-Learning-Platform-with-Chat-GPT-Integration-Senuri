import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EnrolledCourses = ({ token }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/enrollments/my-courses', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setEnrolledCourses(res.data))
    .catch(err => console.error('Failed to load enrolled courses:', err));
  }, [token]);

  return (
    <div>
      <h2>My Enrolled Courses</h2>
      <ul>
        {enrolledCourses.map(course => (
          <li key={course._id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnrolledCourses;
