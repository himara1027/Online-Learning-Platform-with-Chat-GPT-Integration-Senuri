import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CourseDetail.css';

const CourseDetail = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error('Failed to fetch course:', err);
        setError('Failed to load course details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="course-detail-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="course-detail-container">
        <div className="error-container">
          <div className="error-icon">📚</div>
          <h3>Course Not Found</h3>
          <p>The course you're looking for doesn't exist or has been removed.</p>
          <button className="btn btn-outline" onClick={() => navigate(-1)}>
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="course-detail-container">
      <div className="course-detail-content">
        {/* Header */}
        <div className="course-detail-header">
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>
            ← Back to Dashboard
          </button>
        </div>

        <div className="course-detail-grid">
          {/* Main Content */}
          <div className="course-main-content">
            {/* Course Header */}
            <div className="course-header-card">
              <div className="course-header-content">
                <div className="course-title-section">
                  <h1 className="course-title">{course.title}</h1>
                  <p className="course-description">{course.description}</p>
                  <span className="course-badge">Active</span>
                </div>

                {/* Course Stats */}
                <div className="course-stats">
                  <div className="stat-item">
                    <span className="stat-icon">👥</span>
                    <span>Students enrolled</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">⭐</span>
                    <span>Course rating</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">🕒</span>
                    <span>Duration</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">📅</span>
                    <span>Last updated</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="course-content-card">
              <div className="card-header">
                <h2 className="card-title">
                  <span className="title-icon">📚</span>
                  Course Content
                </h2>
              </div>
              <div className="card-content">
                <div className="course-content-text">
                  {course.content}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="course-sidebar">
            {/* Instructor Info */}
            <div className="instructor-card">
              <div className="card-header">
                <h3 className="card-title">
                  <span className="title-icon">👨‍🏫</span>
                  Instructor
                </h3>
              </div>
              <div className="card-content">
                <div className="instructor-info">
                  <div className="instructor-avatar">
                    {course.instructor?.username?.charAt(0) || 'I'}
                  </div>
                  <div className="instructor-details">
                    <h4>{course.instructor?.username || 'Unknown Instructor'}</h4>
                    <p className="instructor-role">{course.instructor?.role || 'Instructor'}</p>
                    <p className="instructor-email">{course.instructor?.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Actions */}
            {/* <div className="actions-card">
              <div className="card-header">
                <h3 className="card-title">Quick Actions</h3>
              </div>
              <div className="card-content">
                <div className="action-buttons">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/edit-course/${course._id}`)}
                  >
                    Edit Course
                  </button>
                  <button
                    className="btn btn-outline"
                    onClick={() => navigate(`/instructor/courses/${course._id}/students`)}
                  >
                    View Students
                  </button>
                  <div className="separator"></div>
                  <button
                    className="btn btn-danger"
                    onClick={() => navigate(`/delete-course/${course._id}`)}
                  >
                    Delete Course
                  </button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
