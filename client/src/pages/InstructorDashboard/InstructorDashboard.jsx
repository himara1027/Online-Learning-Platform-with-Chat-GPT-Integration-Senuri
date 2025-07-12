import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InstructorDashboard = ({ authUser, token }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    content: ''
  });

  useEffect(() => {
    if (authUser) {
      fetchInstructorCourses();
    }
  }, [authUser]);

  const fetchInstructorCourses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/courses/instructor/courses', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCourses(res.data);
    } catch (err) {
      console.error('Failed to fetch instructor courses:', err);
    }
  };

  const handleInputChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleCreateCourse = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/courses', newCourse, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCourses([...courses, res.data.course]);
      setNewCourse({ title: '', description: '', content: '' });
    } catch (err) {
      console.error('Course creation failed:', err);
    }
  };

  
   const handleDelete = (courseId) => {
    navigate(`/delete-course/${courseId}`);
  };
  const handleEdit = (courseId) => {
    navigate(`/edit-course/${courseId}`);
  };
  const handleView = (courseId) => {
    navigate(`/courses/${courseId}`);
  };
    const handleEnrolledStudent = (courseId) => {
    navigate(`/instructor/courses/${courseId}/students`);
  };

  if (!authUser) {
    return <p>Loading or not authenticated...</p>;
  }

  return (
    <div className="instructor-dashboard">
      <h2>Welcome, Instructor {authUser.username}</h2>

      <h3>Create New Course</h3>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={newCourse.title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={newCourse.description}
        onChange={handleInputChange}
      />
      <textarea
        name="content"
        placeholder="Content"
        value={newCourse.content}
        onChange={handleInputChange}
      />
      <button onClick={handleCreateCourse}>Create Course</button>

      <h3>Your Courses</h3>
      <ul>
        {courses.map(course => (
          <li key={course._id}>
            <strong>{course.title}</strong> <br />
            {course.description} <br />
            <button onClick={() => handleEdit(course._id)}>Edit</button>
            <button onClick={() => handleDelete(course._id)}>Delete</button>
            <button onClick={() => handleView(course._id)}>View</button>
             <button onClick={() => handleEnrolledStudent(course._id)}>View Enrolled Students</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstructorDashboard;
