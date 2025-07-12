import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EnrolledStudents = ({ token }) => {
  const { courseId } = useParams(); // expects the courseId in the URL
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/enrollments/course/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setStudents(response.data);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to fetch enrolled students');
      }
    };

    fetchEnrolledStudents();
  }, [courseId, token]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Enrolled Students</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {students.length === 0 ? (
        <p>No students enrolled yet.</p>
      ) : (
        <ul>
          {students.map((enrollment) => (
            <li key={enrollment._id}>
              {enrollment.student?.username || 'Unknown Student'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EnrolledStudents;
