import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteCourse = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmAndDelete = async () => {
      const confirmed = window.confirm('Are you sure you want to delete this course?');

      if (!confirmed) {
        navigate('/instructor-dashboard');
        return;
      }

      try {
        const res = await axios.delete(`http://localhost:5000/api/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


      } catch (err) {
        console.error('Delete failed:', err);

        const msg = err?.response?.data?.message || 'Failed to delete course.';
        alert(msg);
        navigate('/instructor-dashboard');
      }
    };

    confirmAndDelete();
  }, [id, navigate, token]);

  return <p>Deleting course...</p>;
};

export default DeleteCourse;
