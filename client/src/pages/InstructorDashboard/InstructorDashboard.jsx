import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './InstructorDashboard.scss'

const InstructorDashboard = ({ authUser, token }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
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
      setShowCreateModal(false);
    } catch (err) {
      console.error('Course creation failed:', err);
    }
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setNewCourse({ title: '', description: '', content: '' });
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
    return <div className="loading">Loading or not authenticated...</div>;
  }

  return (
    <div className="instructor-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Welcome, Instructor {authUser.username}</h1>
          
        </div>
        <button className="logout-btn" onClick={() => navigate('/logout')}>
          <span>🎓</span> LOGOUT
        </button>
      </div>

      <div className="dashboard-content">
        <div className="content-header">
          <h2>Your Courses</h2>
          <button className="create-course-btn" onClick={() => setShowCreateModal(true)}>
            <span>+</span> Create New Course
          </button>
        </div>

        <div className="courses-section">
          {courses.length > 0 ? (
            <div className="courses-grid">
              {courses.map(course => (
                <div key={course._id} className="course-card">
                  <div className="course-header">
                    <h3 className="course-title">{course.title}</h3>
                    <div className="course-badge">Active</div>
                  </div>
                  <p className="course-description">{course.description}</p>
                  <div className="course-stats">
                    <div className="stat-item">
                      <span className="stat-icon">👥</span>
                      <span className="stat-text">Students</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-icon">📚</span>
                      <span className="stat-text">Materials</span>
                    </div>
                  </div>
                  <div className="course-actions">
                    <button className="action-btn view-btn" onClick={() => handleView(course._id)}>
                      View
                    </button>
                    <button className="action-btn edit-btn" onClick={() => handleEdit(course._id)}>
                      Edit
                    </button>
                    <button className="action-btn students-btn" onClick={() => handleEnrolledStudent(course._id)}>
                      Students
                    </button>
                    <button className="action-btn delete-btn" onClick={() => handleDelete(course._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-courses">
              <div className="no-courses-icon">📚</div>
              <h3>No courses created yet</h3>
              <p>Create your first course to get started!</p>
              <button className="create-first-course-btn" onClick={() => setShowCreateModal(true)}>
                Create Your First Course
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Course</h3>
              <button className="close-btn" onClick={handleCloseModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Course Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter course title"
                  value={newCourse.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Course Description</label>
                <input
                  type="text"
                  name="description"
                  placeholder="Enter course description"
                  value={newCourse.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Course Content</label>
                <textarea
                  name="content"
                  placeholder="Enter course content"
                  value={newCourse.content}
                  onChange={handleInputChange}
                  rows="4"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="create-btn" onClick={handleCreateCourse}>
                Create Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;