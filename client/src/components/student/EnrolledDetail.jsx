"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import axios from "axios"
import "./EnrolledDetail.scss"

const EnrolledDetail = ({ token }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:5000/api/enrollments/enroll/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setCourse(response.data)
        setError(null)
      } catch (err) {
        console.error("Error loading course:", err)
        setError("Failed to load course details")
      } finally {
        setLoading(false)
      }
    }

    if (id && token) {
      fetchCourseDetail()
    }
  }, [id, token])

  const handleContinueLearning = () => {
    navigate(`/courses/${id}/learn`)
  }

  const handleDownloadMaterials = () => {
    // Create a downloadable content
    const content = `
Course: ${course.title}
Description: ${course.description}
Content: ${course.content}
Instructor: ${course.instructor?.username || "Unknown"}
    `
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${course.title.replace(/\s+/g, "_")}_materials.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleShareCourse = () => {
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: course.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Course link copied to clipboard!")
    }
  }

  const handleBookmark = () => {
    alert("Course bookmarked! (Feature to be implemented)")
  }

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="enrolled-detail-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading course details...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="enrolled-detail-container">
        <div className="enrolled-detail-content">
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h3>Error Loading Course</h3>
            <p>{error}</p>
            <button className="retry-btn" onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="enrolled-detail-container">
        <div className="enrolled-detail-content">
          <div className="error-container">
            <div className="error-icon">📚</div>
            <h3>Course Not Found</h3>
            <p>The course you're looking for doesn't exist or you don't have access to it.</p>
            <Link to="/my-courses" className="retry-btn">
              Back to My Courses
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Mock progress data - replace with real data from your API
  const progress = Math.floor(Math.random() * 100) + 1
  const progressDegrees = (progress / 100) * 360
  const completedLessons = Math.floor((progress / 100) * 20)
  const totalLessons = 20
  const timeSpent = `${Math.floor(Math.random() * 30) + 10} hours`

  return (
    <div className="enrolled-detail-container">
      <div className="enrolled-detail-content">
        {/* Navigation */}
        <div className="detail-navigation">
          <Link to="/my-courses" className="back-btn">
            <span className="back-icon">←</span>
            Back to My Courses
          </Link>
        </div>

        {/* Course Header */}
        <div className="course-header-section">
          <div className="header-content">
            <div className="course-info">
              <h1 className="course-title">{course.title}</h1>
              <p className="course-description">{course.description}</p>

              <div className="course-instructor">
                <div className="instructor-avatar">{course.instructor?.username?.charAt(0).toUpperCase() || "I"}</div>
                <div className="instructor-info">
                  <h4 className="instructor-name">{course.instructor?.username || "Unknown Instructor"}</h4>
                  <p className="instructor-title">Course Instructor</p>
                </div>
              </div>
            </div>

            <div className="course-status">
              <div className="status-badge">Enrolled</div>
              <div className="progress-section">
                <div
                  className="progress-circle"
                  style={{
                    background: `conic-gradient(#10b981 0deg ${progressDegrees}deg, #e5e7eb ${progressDegrees}deg 360deg)`,
                  }}
                >
                  <div className="progress-text">{progress}%</div>
                </div>
                <p className="progress-label">Course Progress</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="course-content-section">
          <div className="main-content">
            <div className="content-card">
              <div className="content-header">
                <h3>
                  <span className="content-icon">📖</span>
                  Course Content
                </h3>
                <div className="content-actions">
                  <button className="action-btn" onClick={handleBookmark} title="Bookmark">
                    🔖
                  </button>
                  <button className="action-btn" onClick={handlePrint} title="Print">
                    🖨️
                  </button>
                </div>
              </div>
              <div className="content-body">
                <div className="course-content-text">
                  {course.content ? (
                    <div>
                      <h4>Course Materials</h4>
                      <p>{course.content}</p>
                    </div>
                  ) : (
                    <div>
                      <p>
                        Welcome to <strong>{course.title}</strong>! This comprehensive course will guide you through all
                        the essential concepts and practical applications.
                      </p>

                      <h4>What You'll Learn:</h4>
                      <ul>
                        <li>Core concepts and fundamental principles</li>
                        <li>Practical applications and real-world examples</li>
                        <li>Advanced techniques and best practices</li>
                        <li>Hands-on projects and case studies</li>
                      </ul>

                      <h4>Course Structure:</h4>
                      <p>
                        This course is organized into progressive modules, each building upon the previous one. You can
                        learn at your own pace and revisit any section as needed.
                      </p>

                      <h4>Getting Started:</h4>
                      <ol>
                        <li>Review the course materials and objectives</li>
                        <li>Follow along with the practical exercises</li>
                        <li>Complete the assignments and projects</li>
                        <li>Track your progress and celebrate milestones</li>
                      </ol>

                      <p>
                        <strong>Need Help?</strong> Don't hesitate to reach out if you have any questions or need
                        clarification on any topic. Your success is our priority!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="sidebar">
            {/* Course Stats */}
            <div className="sidebar-card course-stats">
              <h4 className="card-title">
                <span className="title-icon">📊</span>
                Your Progress
              </h4>
              <div className="stats-list">
                <div className="stat-item">
                  <span className="stat-label">Completed Lessons</span>
                  <span className="stat-value">
                    {completedLessons}/{totalLessons}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Time Spent</span>
                  <span className="stat-value">{timeSpent}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Progress</span>
                  <span className="stat-value">{progress}%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Status</span>
                  <span className="stat-value">
                    {progress >= 100 ? "Completed" : progress > 0 ? "In Progress" : "Not Started"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="sidebar-card quick-actions">
              <h4 className="card-title">
                <span className="title-icon">⚡</span>
                Quick Actions
              </h4>
              <div className="actions-list">
                <button className="action-button continue-btn" onClick={handleContinueLearning}>
                  <span>▶️</span>
                  {progress >= 100 ? "Review Course" : progress > 0 ? "Continue Learning" : "Start Course"}
                </button>
                <button className="action-button download-btn" onClick={handleDownloadMaterials}>
                  <span>📥</span>
                  Download Materials
                </button>
                <button className="action-button share-btn" onClick={handleShareCourse}>
                  <span>🔗</span>
                  Share Course
                </button>
              </div>
            </div>

            {/* Course Info */}
            <div className="sidebar-card course-info-card">
              <h4 className="card-title">
                <span className="title-icon">ℹ️</span>
                Course Info
              </h4>
              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">Instructor</span>
                  <span className="info-value">{course.instructor?.username || "Unknown"}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Difficulty</span>
                  <span className="info-value">Intermediate</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Duration</span>
                  <span className="info-value">8 weeks</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Language</span>
                  <span className="info-value">English</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnrolledDetail
