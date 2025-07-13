"use client"
import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { UserCheck, Lock, ArrowRight, Sparkles, CheckCircle, AlertCircle, LogIn } from "lucide-react"
import "./login.scss"

const Login = ({ setAuthUser }) => {
  const [formData, setFormData] = useState({ username: "", password: "" })
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (message) setMessage("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData)
      localStorage.setItem("token", res.data.token)
      setAuthUser(res.data.user)
      setMessage("Login successful! Redirecting...")
      setTimeout(() => {
        if (res.data.user.role === "instructor") {
          navigate("/instructor-dashboard")
        } else {
          navigate("/student-dashboard")
        }
      }, 1000)
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="edupro-auth-page">
      <div className="edupro-auth-background">
        <div className="edupro-floating-shapes">
          <div className="edupro-shape edupro-shape-1"></div>
          <div className="edupro-shape edupro-shape-2"></div>
          <div className="edupro-shape edupro-shape-3"></div>
          <div className="edupro-shape edupro-shape-4"></div>
          <div className="edupro-shape edupro-shape-5"></div>
        </div>
      </div>

      <div className="edupro-auth-container">
        <div className="edupro-auth-card edupro-login-card">
          <div className="edupro-card-header">
            <div className="edupro-brand-logo">
              <div className="edupro-logo-icon">
                <Sparkles size={32} />
              </div>
              <h1 className="edupro-brand-title">EduPro</h1>
            </div>
            <div className="edupro-auth-header">
              <h2 className="edupro-auth-title">Welcome Back</h2>
              <p className="edupro-auth-subtitle">Continue your professional journey</p>
            </div>
            <div className="edupro-auth-footer">
              <p className="edupro-footer-text">
                Don't have an account?{" "}
                <Link to="/register" className="edupro-footer-link">
                  Create one here
                </Link>
              </p>
            </div>
          </div>

          <form className="edupro-auth-form edupro-login-form" onSubmit={handleSubmit}>
            <div className="edupro-form-field">
              <label htmlFor="username" className="edupro-field-label">
                <UserCheck size={16} />
                Username
              </label>
              <div className="edupro-input-container">
                <div className="edupro-input-icon">
                  <UserCheck size={18} />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="edupro-field-input"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <div className="edupro-input-border"></div>
              </div>
            </div>

            <div className="edupro-form-field">
              <label htmlFor="password" className="edupro-field-label">
                <Lock size={16} />
                Password
              </label>
              <div className="edupro-input-container">
                <div className="edupro-input-icon">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="edupro-field-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div className="edupro-input-border"></div>
              </div>
            </div>

            <button type="submit" className="edupro-submit-btn" disabled={isLoading}>
              <span className="edupro-btn-content">
                {isLoading ? (
                  <>
                    <div className="edupro-loading-spinner"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span className="edupro-btn-icon">
                      <ArrowRight size={20} />
                    </span>
                    <span>Sign In</span>
                  </>
                )}
              </span>
              <div className="edupro-btn-glow"></div>
            </button>

            {message && (
              <div className={`edupro-status-message ${message.includes("successful") ? "edupro-success" : "edupro-error"}`}>
                <div className="edupro-message-icon">
                  {message.includes("successful") ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                </div>
                <span className="edupro-message-text">{message}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login