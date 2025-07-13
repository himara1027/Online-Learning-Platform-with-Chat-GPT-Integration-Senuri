"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import "./DeleteCourse.css"

const DeleteCourse = ({ token }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showDialog, setShowDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setShowDialog(true)
  }, [])

  const handleCancel = () => {
    setShowDialog(false)
    navigate("/instructor-dashboard")
  }

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true)
      setError(null)

      await axios.delete(`http://localhost:5000/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      navigate("/instructor-dashboard")
    } catch (err) {
      console.error("Delete failed:", err)
      const errorMessage = err?.response?.data?.message || "Failed to delete course. Please try again."
      setError(errorMessage)
      setIsDeleting(false)
    }
  }

  return (
    <div className="delete-course-container">
      <div className="delete-course-content">
        <div className="delete-card">
          <div className="delete-header">
            <div className="delete-icon">{isDeleting ? <div className="loading-spinner"></div> : <span>🗑️</span>}</div>
            <h2 className="delete-title">{isDeleting ? "Deleting Course..." : "Delete Course"}</h2>
            <p className="delete-description">
              {isDeleting ? "Please wait while we delete your course." : "This action cannot be undone."}
            </p>
          </div>

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

          <div className="delete-actions">
            <button className="btn btn-outline" onClick={handleCancel} disabled={isDeleting}>
              ← Cancel
            </button>
            <button className="btn btn-danger" onClick={handleConfirmDelete} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <div className="btn-spinner"></div>
                  Deleting...
                </>
              ) : (
                <>🗑️ Delete</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showDialog && !isDeleting && (
        <div className="dialog-overlay" onClick={handleCancel}>
          <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h3 className="dialog-title">
                <span className="dialog-icon">⚠️</span>
                Are you absolutely sure?
              </h3>
              <p className="dialog-description">
                This action cannot be undone. This will permanently delete the course and remove all associated data
                including student enrollments and progress.
              </p>
            </div>
            <div className="dialog-actions">
              <button className="btn btn-outline" onClick={handleCancel}>
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setShowDialog(false)
                  handleConfirmDelete()
                }}
              >
                Delete Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeleteCourse
