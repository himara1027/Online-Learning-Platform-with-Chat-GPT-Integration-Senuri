"use client"
import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import {
  User,
  Mail,
  Calendar,
  Lock,
  UserCheck,
  GraduationCap,
  BookOpen,
  Sparkles,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import "./register.scss"

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    username: "",
    password: "",
    role: "student",
  })
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
      const res = await axios.post("http://localhost:5000/api/auth/register", formData)
      setMessage("Registration successful! Redirecting to login...")
      if (res.status === 201) {
        setTimeout(() => {
          navigate("/")
        }, 2000)
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed. Please try again.")
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
        <div className="auth-card register-card">
          <div className="card-header">
            <div className="brand-logo">
              <div className="logo-icon">
                <Sparkles size={32} />
              </div>
              <h1 className="brand-title">EduPro</h1>
            </div>
            <div className="auth-header">
              <h2 className="auth-title">Create Your Account</h2>
              <p className="auth-subtitle">Join thousands of professionals worldwide</p>
            </div>
          </div>

          <form className="auth-form register-form" onSubmit={handleSubmit}>
            {/* First Row - First Name and Last Name */}
            <div className="form-grid grid-2">
              <div className="form-field">
                <label htmlFor="firstName" className="field-label">
                  <User size={16} />
                  First Name
                </label>
                <div className="input-container">
                  <div className="input-icon">
                    <User size={18} />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="field-input"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <div className="input-border"></div>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="lastName" className="field-label">
                  <User size={16} />
                  Last Name
                </label>
                <div className="input-container">
                  <div className="input-icon">
                    <User size={18} />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="field-input"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                  <div className="input-border"></div>
                </div>
              </div>
            </div>

            {/* Second Row - Age and Email */}
            <div className="form-grid grid-2">
              <div className="form-field">
                <label htmlFor="age" className="field-label">
                  <Calendar size={16} />
                  Age
                </label>
                <div className="input-container">
                  <div className="input-icon">
                    <Calendar size={18} />
                  </div>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    className="field-input"
                    placeholder="25"
                    value={formData.age}
                    onChange={handleChange}
                    min="13"
                    max="120"
                    required
                  />
                  <div className="input-border"></div>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="email" className="field-label">
                  <Mail size={16} />
                  Email
                </label>
                <div className="input-container">
                  <div className="input-icon">
                    <Mail size={18} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="field-input"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <div className="input-border"></div>
                </div>
              </div>
            </div>

            {/* Third Row - Username and Password */}
            <div className="form-grid grid-2">
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
                    placeholder="johndoe"
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
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <div className="input-border"></div>
                </div>
              </div>
            </div>

            {/* Role Selection */}
            <div className="form-field role-field">
              <label className="field-label">
                <UserCheck size={16} />
                Choose Your Role
              </label>
              <div className="role-selector">
                <div className={`role-card ${formData.role === "student" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={formData.role === "student"}
                    onChange={handleChange}
                    id="student-role"
                  />
                  <label htmlFor="student-role" className="role-label">
                    <div className="role-icon">
                      <GraduationCap size={32} />
                    </div>
                    <div className="role-info">
                      <h3 className="role-title">Student</h3>
                      <p className="role-desc">Learn and grow with expert guidance</p>
                    </div>
                  </label>
                </div>

                <div className={`role-card ${formData.role === "instructor" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="role"
                    value="instructor"
                    checked={formData.role === "instructor"}
                    onChange={handleChange}
                    id="instructor-role"
                  />
                  <label htmlFor="instructor-role" className="role-label">
                    <div className="role-icon">
                      <BookOpen size={32} />
                    </div>
                    <div className="role-info">
                      <h3 className="role-title">Instructor</h3>
                      <p className="role-desc">Share knowledge and inspire others</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn" disabled={isLoading}>
              <span className="btn-content">
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span className="btn-icon">
                      <ArrowRight size={20} />
                    </span>
                    <span>Create Account</span>
                  </>
                )}
              </span>
              <div className="btn-glow"></div>
            </button>

            {/* Message */}
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
              Already have an account?{" "}
              <Link to="/" className="footer-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
