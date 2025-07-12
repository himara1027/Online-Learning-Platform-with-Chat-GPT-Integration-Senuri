import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EnrolledDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/enrollments/enroll/${id}`)
      .then(res => setCourse(res.data))
      .catch(err => console.error('Error loading course:', err));
  }, [id]);

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p><strong>Description:</strong> {course.description}</p>
      <p><strong>Content:</strong> {course.content}</p>
      <p><strong>Instructor:</strong> {course.instructor?.username}</p>
    </div>
  );
};

export default EnrolledDetail;
