"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import "./EditCourse.css"

const EditCourse = ({ token }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState({ title: "", description: "", content: "" })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`)
        setCourse(res.data)
      } catch (err) {
        console.error("Failed to fetch course:", err)
        setError("Failed to load course data")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchCourse()
    }
  }, [id])

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    if (!course.title.trim() || !course.description.trim()) {
      setMessage("Please fill in all required fields.")
      return
    }

    try {
      setSaving(true)
      setMessage("")

      await axios.put(`http://localhost:5000/api/courses/${id}`, course, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setMessage("Course updated successfully!")
      setTimeout(() => {
        navigate("/instructor-dashboard")
      }, 1500)
    } catch (err) {
      console.error("Update failed:", err)
      setMessage("Failed to update course. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="edit-course-container">
        <div className="edit-course-content">
          <div className="loading-skeleton">
            <div className="skeleton-header"></div>
            <div className="skeleton-card">
              <div className="skeleton-title"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-textarea"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="edit-course-container">
        <div className="error-container">
          <div className="error-icon">📚</div>
          <h3>Error Loading Course</h3>
          <p>{error}</p>
          <button className="btn btn-outline" onClick={() => navigate(-1)}>
            ← Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="edit-course-container">
      <div className="edit-course-content">
        {/* Header */}
        <div className="edit-course-header">
          <button className="btn btn-ghost" onClick={() => navigate(-1)} disabled={saving}>
            ← Back to Dashboard
          </button>
        </div>

        {/* Edit Form */}
        <div className="edit-form-card">
          <div className="card-header">
            <h1 className="card-title">
              <span className="title-icon">📚</span>
              Edit Course
            </h1>
            <p className="card-description">Update your course information and content below.</p>
          </div>

          <div className="card-content">
            {message && (
              <div className={`message ${message.includes("success") ? "message-success" : "message-error"}`}>
                <span className="message-icon">{message.includes("success") ? "✅" : "⚠️"}</span>
                {message}
              </div>
            )}

            <form onSubmit={handleUpdate} className="edit-form">
              {/* Course Title */}
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Course Title *
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={course.title}
                  onChange={handleChange}
                  placeholder="Enter course title"
                  disabled={saving}
                  className="form-input"
                  required
                />
              </div>

              {/* Course Description */}
              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Course Description *
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={course.description}
                  onChange={handleChange}
                  placeholder="Enter course description"
                  disabled={saving}
                  className="form-input"
                  required
                />
              </div>

              {/* Course Content */}
              <div className="form-group">
                <label htmlFor="content" className="form-label">
                  Course Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={course.content}
                  onChange={handleChange}
                  placeholder="Enter detailed course content, curriculum, and learning objectives"
                  disabled={saving}
                  rows={8}
                  className="form-textarea"
                />
                <p className="form-help">Provide detailed information about what students will learn in this course.</p>
              </div>

              {/* Action Buttons */}
              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => navigate(-1)} disabled={saving}>
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="btn btn-primary">
                  {saving ? (
                    <>
                      <div className="btn-spinner"></div>
                      Updating...
                    </>
                  ) : (
                    <>💾 Update Course</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCourse
