"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import "./EnrolledStudents.css"

const EnrolledStudents = ({ token }) => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [students, setStudents] = useState([])
  const [filteredStudents, setFilteredStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:5000/api/enrollments/course/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setStudents(response.data)
        setFilteredStudents(response.data)
      } catch (err) {
        console.error("Error fetching students:", err)
        setError("Failed to fetch enrolled students")
      } finally {
        setLoading(false)
      }
    }

    if (courseId) {
      fetchEnrolledStudents()
    }
  }, [courseId, token])

  useEffect(() => {
    const filtered = students.filter(
      (enrollment) =>
        enrollment.student?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enrollment.student?.email?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredStudents(filtered)
  }, [searchTerm, students])

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "status-completed"
      case "active":
        return "status-active"
      default:
        return "status-default"
    }
  }

  const getProgressColor = (progress) => {
    if (progress >= 80) return "progress-high"
    if (progress >= 50) return "progress-medium"
    return "progress-low"
  }

  if (loading) {
    return (
      <div className="enrolled-students-container">
        <div className="enrolled-students-content">
          <div className="loading-skeleton">
            <div className="skeleton-header"></div>
            <div className="skeleton-card">
              <div className="skeleton-title"></div>
              <div className="skeleton-search"></div>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton-student"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="enrolled-students-container">
      <div className="enrolled-students-content">
        {/* Header */}
        <div className="students-header">
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>
            ← Back to Course
          </button>
        </div>

        {/* Main Content */}
        <div className="students-card">
          <div className="card-header">
            <div className="header-content">
              <div>
                <h1 className="card-title">
                  <span className="title-icon">👥</span>
                  Enrolled Students
                </h1>
                <p className="card-description">Manage and track your students' progress in this course</p>
              </div>
              <div className="student-count">{students.length} Students</div>
            </div>
          </div>

          <div className="card-content">
            {error && (
              <div className="error-message">
                <div className="error-content">
                  <span className="error-icon">⚠️</span>
                  <div>
                    <p className="error-title">Error</p>
                    <p className="error-text">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {students.length === 0 && !error ? (
              <div className="empty-state">
                <div className="empty-icon">👥</div>
                <h3>No Students Enrolled</h3>
                <p>No students have enrolled in this course yet.</p>
              </div>
            ) : (
              <>
                {/* Search Bar */}
                <div className="search-container">
                  <div className="search-input-container">
                    <span className="search-icon">🔍</span>
                    <input
                      type="text"
                      placeholder="Search students by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                  </div>
                </div>

                {/* Students List */}
                <div className="students-list">
                  {filteredStudents.map((enrollment) => (
                    <div key={enrollment._id} className="student-card">
                      <div className="student-info">
                        <div className="student-avatar">
                          {enrollment.student?.username
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("") || "?"}
                        </div>

                        <div className="student-details">
                          <h4 className="student-name">{enrollment.student?.username || "Unknown Student"}</h4>
                          <div className="student-meta">
                            <div className="meta-item">
                              <span className="meta-icon">📧</span>
                              <span>{enrollment.student?.email}</span>
                            </div>
                            <div className="meta-item">
                              <span className="meta-icon">📅</span>
                              <span>
                                Enrolled{" "}
                                {new Date(
                                  enrollment.enrollmentDate || enrollment.student?.enrolledDate,
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="student-progress">
                        {/* Progress Bar */}
                        <div className="progress-container">
                          <div className="progress-bar">
                            <div
                              className={`progress-fill ${getProgressColor(enrollment.progress || 0)}`}
                              style={{ width: `${enrollment.progress || 0}%` }}
                            ></div>
                          </div>
                          <span className="progress-text">{enrollment.progress || 0}%</span>
                        </div>

                        {/* Status Badge */}
                        <div className={`status-badge ${getStatusColor(enrollment.status || "active")}`}>
                          {enrollment.status === "completed" && <span className="status-icon">✅</span>}
                          {(enrollment.status || "active").charAt(0).toUpperCase() +
                            (enrollment.status || "active").slice(1)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredStudents.length === 0 && searchTerm && (
                  <div className="no-results">
                    <span className="no-results-icon">🔍</span>
                    <h3>No Results Found</h3>
                    <p>No students match your search criteria.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnrolledStudents
