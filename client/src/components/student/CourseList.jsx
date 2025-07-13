"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./CourseList.scss"

const CourseList = ({ token }) => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    axios
      .get("http://localhost:5000/api/courses")
      .then((res) => {
        setCourses(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to fetch courses:", err)
        setLoading(false)
      })
  }, [])

  const handleEnroll = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/api/enrollments/enroll/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      alert("Enrolled successfully!")
    } catch (err) {
      console.error("Enrollment failed:", err)
      alert(err.response?.data?.message || "Enrollment failed")
    }
  }

  const handleView = (id) => {
    navigate(`/courses/${id}`)
  }

  if (loading) {
    return (
      <div className="course-list-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading courses...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="course-list-container">
      <div className="course-list-content">
        <h2>Available Courses</h2>

        {courses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No Courses Available</h3>
            <p>Check back later for new courses!</p>
          </div>
        ) : (
          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course._id} className="course-card">
                <div className="course-header">
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-description">{course.description}</p>
                  <div className="course-instructor">{course.instructor?.username || "Unknown Instructor"}</div>
                </div>

                <div className="course-actions">
                  <button className="view-btn" onClick={() => handleView(course._id)}>
                    View Details
                  </button>
                  <button className="enroll-btn" onClick={() => handleEnroll(course._id)}>
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseList
