"use client"

import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "./StudentDashboard.scss"

const StudentDashboard = ({ token, onLogout, user }) => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    totalHours: 0,
  })
  const [recentActivity, setRecentActivity] = useState([])

  useEffect(() => {
    // Fetch user stats and recent activity
    const fetchDashboardData = async () => {
      try {
        // Mock data - replace with real API calls
        setStats({
          enrolledCourses: 5,
          completedCourses: 2,
          totalHours: 48,
        })

        setRecentActivity([
          {
            id: 1,
            title: "Completed lesson: React Hooks",
            time: "2 hours ago",
            icon: "✅",
          },
          {
            id: 2,
            title: "Started new course: Advanced JavaScript",
            time: "1 day ago",
            icon: "🚀",
          },
          {
            id: 3,
            title: "Earned certificate: Web Development Basics",
            time: "3 days ago",
            icon: "🏆",
          },
        ])
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      }
    }

    fetchDashboardData()
  }, [token])

  const handleBrowseCourses = () => {
    navigate("/courses")
  }

  const handleViewEnrolledCourses = () => {
    navigate("/my-courses")
  }

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      onLogout()
    }
  }

  return (
    <div className="student-dashboard">
      <div className="dashboard-container">
        {/* Welcome Header */}
        <div className="welcome-header">
          <div className="welcome-content">
            <h1 className="greeting">
              Welcome back, {user?.username || "Student"}!<span className="wave-emoji">👋</span>
            </h1>
            <p className="subtitle">Ready to continue your learning journey? Let's pick up where you left off.</p>

            <div className="user-stats">
              <div className="stat-item">
                <div className="stat-number">{stats.enrolledCourses}</div>
                <div className="stat-label">Enrolled Courses</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{stats.completedCourses}</div>
                <div className="stat-label">Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{stats.totalHours}</div>
                <div className="stat-label">Hours Learned</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <div className="action-card browse-courses">
            <div className="card-icon">🔍</div>
            <h3 className="card-title">Discover New Courses</h3>
            <p className="card-description">
              Explore our extensive catalog of courses and find your next learning adventure.
            </p>
            <button className="card-button" onClick={handleBrowseCourses}>
              Browse All Courses
            </button>
          </div>

          <div className="action-card my-courses">
            <div className="card-icon">📚</div>
            <h3 className="card-title">My Learning</h3>
            <p className="card-description">Continue with your enrolled courses and track your progress.</p>
            <button className="card-button" onClick={handleViewEnrolledCourses}>
              View My Courses
            </button>
          </div>
        </div>

      
        {/* Recent Activity */}
        <div className="recent-activity">
          <div className="activity-header">
            <h3>Recent Activity</h3>
            <Link to="/activity" className="view-all-btn">
              View All
            </Link>
          </div>

          <div className="activity-list">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-content">
                  <div className="activity-title">{activity.title}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
            <button className="action-button logout-btn" onClick={handleLogout}>
              
              <div className="button-content">
               
                <div className="button-subtitle">Logout</div>
              </div>
            </button>
          </div>
        </div>
        
        
      </div>
      
    </div>
  )
}

export default StudentDashboard
