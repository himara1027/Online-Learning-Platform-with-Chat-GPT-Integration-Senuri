"use client"
import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { UserCheck, Lock, ArrowRight, Sparkles, CheckCircle, AlertCircle } from "lucide-react"
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
    <div className="auth-page">
      <div className="auth-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>

      <div className="auth-container">
        <div className="auth-card login-card">
          <div className="card-header">
            <div className="brand-logo">
              <div className="logo-icon">
                <Sparkles size={32} />
              </div>
              <h1 className="brand-title">EduPro</h1>
            </div>
            <div className="auth-header">
              <h2 className="auth-title">Welcome Back</h2>
              <p className="auth-subtitle">Continue your professional journey</p>
            </div>
          </div>

          <form className="auth-form login-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="username" className="field-label">
                <UserCheck size={16} />
                Username
              </label>
              <div className="input-container">
                <div className="input-icon">
                  <UserCheck size={18} />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="field-input"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <div className="input-border"></div>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="password" className="field-label">
                <Lock size={16} />
                Password
              </label>
              <div className="input-container">
                <div className="input-icon">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="field-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div className="input-border"></div>
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              <span className="btn-content">
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span className="btn-icon">
                      <ArrowRight size={20} />
                    </span>
                    <span>Sign In</span>
                  </>
                )}
              </span>
              <div className="btn-glow"></div>
            </button>

            {message && (
              <div className={`status-message ${message.includes("successful") ? "success" : "error"}`}>
                <div className="message-icon">
                  {message.includes("successful") ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                </div>
                <span className="message-text">{message}</span>
              </div>
            )}
          </form>

          <div className="auth-footer">
            <p className="footer-text">
              Don't have an account?{" "}
              <Link to="/register" className="footer-link">
                Create one here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
