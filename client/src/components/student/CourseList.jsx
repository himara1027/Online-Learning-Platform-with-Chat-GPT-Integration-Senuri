import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CourseList = ({ token }) => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error('Failed to fetch courses:', err));
  }, []);

  const handleEnroll = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/enrollments/enroll/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Enrolled successfully!');
    } catch (err) {
      console.error('Enrollment failed:', err);
      alert(err.response?.data?.message || 'Enrollment failed');
    }
  };

  const handleView = (id) => {
    navigate(`/courses/${id}`);
  };

  return (
    <div>
      <h2>Available Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course._id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Instructor: {course.instructor?.username}</p>
            <button onClick={() => handleView(course._id)}>View</button>
            <button onClick={() => handleEnroll(course._id)}>Enroll</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
