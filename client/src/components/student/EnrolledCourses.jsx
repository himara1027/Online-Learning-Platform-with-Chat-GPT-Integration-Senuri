"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./EnrolledCourses.scss"

const EnrolledCourses = ({ token }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
  })
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        setLoading(true)
        const response = await axios.get("http://localhost:5000/api/enrollments/my-courses", {
          headers: { Authorization: `Bearer ${token}` },
        })

        // Filter out null/undefined courses and ensure we have valid data
        const courses = (response.data || []).filter((course) => course !== null && course !== undefined)
        setEnrolledCourses(courses)

        // Calculate stats with null safety
        const total = courses.length
        const completed = courses.filter((course) => {
          const progress = course?.progress || 0
          return progress >= 100
        }).length
        const inProgress = courses.filter((course) => {
          const progress = course?.progress || 0
          return progress > 0 && progress < 100
        }).length

        setStats({ total, completed, inProgress })
      } catch (err) {
        console.error("Failed to fetch enrolled courses:", err)
        // Set empty array on error to prevent crashes
        setEnrolledCourses([])
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchEnrolledCourses()
    }
  }, [token])

  const handleContinueCourse = (courseId) => {
    if (courseId) {
      navigate(`/courses/${courseId}/learn`)
    }
  }

  const handleViewDetails = (courseId) => {
    if (courseId) {
      navigate(`/courses/${courseId}`)
    }
  }

  const handleBrowseCourses = () => {
    navigate("/courses")
  }

  const getProgressColor = (progress) => {
    const safeProgress = progress || 0
    if (safeProgress >= 100) return "#10b981" // Green for completed
    if (safeProgress >= 50) return "#f59e0b" // Orange for in progress
    return "#6b7280" // Gray for just started
  }

  const formatProgress = (progress) => {
    if (progress === null || progress === undefined || isNaN(progress)) {
      return 0
    }
    return Math.round(Number(progress))
  }

  const getTimeSpent = (course) => {
    // Mock time calculation - replace with real data
    return `${Math.floor(Math.random() * 20) + 5}h`
  }

  const getLastAccessed = (course) => {
    // Mock last accessed - replace with real data
    const days = Math.floor(Math.random() * 7) + 1
    return days === 1 ? "1 day ago" : `${days} days ago`
  }

  const getCourseId = (course) => {
    return course?._id || course?.course?._id || course?.id
  }

  const getCourseTitle = (course) => {
    return course?.title || course?.course?.title || "Untitled Course"
  }

  const getCourseDescription = (course) => {
    return course?.description || course?.course?.description || "No description available"
  }

  const getInstructorName = (course) => {
    return course?.instructor?.username || course?.course?.instructor?.username || "Unknown Instructor"
  }

  if (loading) {
    return (
      <div className="enrolled-courses-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading your courses...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="enrolled-courses-container">
      <div className="enrolled-courses-content">
        {/* Page Header */}
        <div className="page-header">
          <h2>My Enrolled Courses</h2>
          <p className="subtitle">Continue your learning journey and track your progress</p>
        </div>

        {enrolledCourses.length === 0 ? (
          /* Empty State */
          <div className="empty-enrolled-state">
            <div className="empty-icon">📚</div>
            <h3>No Enrolled Courses Yet</h3>
            <p>
              You haven't enrolled in any courses yet. Start your learning journey by browsing our course catalog and
              finding something that interests you!
            </p>
            <button className="browse-courses-btn" onClick={handleBrowseCourses}>
              Browse All Courses
            </button>
          </div>
        ) : (
          <>
            {/* Progress Stats */}
            <div className="progress-stats">
              <div className="stat-card total-courses">
                <span className="stat-icon">📊</span>
                <div className="stat-number">{stats.total}</div>
                <div className="stat-label">Total Enrolled</div>
              </div>
              <div className="stat-card completed-courses">
                <span className="stat-icon">✅</span>
                <div className="stat-number">{stats.completed}</div>
                <div className="stat-label">Completed</div>
              </div>
              <div className="stat-card in-progress">
                <span className="stat-icon">⏳</span>
                <div className="stat-number">{stats.inProgress}</div>
                <div className="stat-label">In Progress</div>
              </div>
            </div>

            {/* Enrolled Courses List */}
            <div className="enrolled-courses-list">
              {enrolledCourses.map((course, index) => {
                // Safety check for course object
                if (!course) return null

                const progress = formatProgress(course.progress)
                const progressDegrees = (progress / 100) * 360
                const courseId = getCourseId(course)

                // Skip if no valid course ID
                if (!courseId) return null

                return (
                  <div key={courseId || `course-${index}`} className="enrolled-course-card">
                    <div className="course-content">
                      <div className="course-icon">{progress >= 100 ? "🏆" : progress > 0 ? "📖" : "🚀"}</div>

                      <div className="course-details">
                        <h3 className="course-title">{getCourseTitle(course)}</h3>
                        <p className="course-description">{getCourseDescription(course)}</p>

                        <div className="course-meta">
                          <div className="meta-item">
                            <span className="meta-icon">👨‍🏫</span>
                            <span>{getInstructorName(course)}</span>
                          </div>
                          <div className="meta-item">
                            <span className="meta-icon">⏱️</span>
                            <span>{getTimeSpent(course)} spent</span>
                          </div>
                          <div className="meta-item">
                            <span className="meta-icon">📅</span>
                            <span>Last accessed {getLastAccessed(course)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="course-progress">
                        <div
                          className="progress-circle"
                          style={{
                            background: `conic-gradient(${getProgressColor(progress)} 0deg ${progressDegrees}deg, #e5e7eb ${progressDegrees}deg 360deg)`,
                          }}
                        >
                          <div className="progress-text">{progress}%</div>
                        </div>
                        <div className="progress-label">
                          {progress >= 100 ? "Completed" : progress > 0 ? "In Progress" : "Not Started"}
                        </div>
                      </div>
                    </div>

                    <div className="course-actions">
                      <button
                        className="continue-btn"
                        onClick={() => handleContinueCourse(courseId)}
                        disabled={!courseId}
                      >
                        {progress >= 100 ? "Review Course" : progress > 0 ? "Continue Learning" : "Start Course"}
                      </button>
                      <button
                        className="view-details-btn"
                        onClick={() => handleViewDetails(courseId)}
                        disabled={!courseId}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default EnrolledCourses
