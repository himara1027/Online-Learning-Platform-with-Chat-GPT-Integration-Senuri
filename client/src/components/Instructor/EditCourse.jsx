import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditCourse = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({ title: '', description: '', content: '' });

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
      setCourse(res.data);
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/courses/${id}`, course, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/instructor-dashboard');
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <div>
      <h2>Edit Course</h2>
      <input name="title" value={course.title} onChange={handleChange} />
      <input name="description" value={course.description} onChange={handleChange} />
      <textarea name="content" value={course.content} onChange={handleChange} />
      <button onClick={handleUpdate}>Update Course</button>
    </div>
  );
};

export default EditCourse;
