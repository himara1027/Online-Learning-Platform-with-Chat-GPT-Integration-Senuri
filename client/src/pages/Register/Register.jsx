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
    <div className="register-page-wrapper">
      <div className="register-animated-background">
        <div className="register-floating-elements">
          <div className="register-shape register-shape-primary"></div>
          <div className="register-shape register-shape-secondary"></div>
          <div className="register-shape register-shape-tertiary"></div>
          <div className="register-shape register-shape-quaternary"></div>
          <div className="register-shape register-shape-quinary"></div>
        </div>
      </div>

      <div className="register-main-container">
        <div className="register-form-card">
          <div className="register-card-header">
            <div className="register-brand-section">
              <div className="register-logo-container">
                <Sparkles size={32} />
              </div>
              <h1 className="register-brand-name">EduPro</h1>
            </div>
            <div className="register-title-section">
              <h2 className="register-main-title">Create Your Account</h2>
              <p className="register-subtitle-text">Join thousands of professionals worldwide</p>
            </div>
          </div>

          <div className="register-form-wrapper">
            <form className="register-form-element" onSubmit={handleSubmit}>
              {/* First Row - First Name and Last Name */}
              <div className="register-form-grid register-grid-dual">
                <div className="register-input-field">
                  <label htmlFor="firstName" className="register-field-label">
                    <User size={16} />
                    First Name
                  </label>
                  <div className="register-input-wrapper">
                    <div className="register-input-icon">
                      <User size={18} />
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      className="register-text-input"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                    <div className="register-input-underline"></div>
                  </div>
                </div>

                <div className="register-input-field">
                  <label htmlFor="lastName" className="register-field-label">
                    <User size={16} />
                    Last Name
                  </label>
                  <div className="register-input-wrapper">
                    <div className="register-input-icon">
                      <User size={18} />
                    </div>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="register-text-input"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                    <div className="register-input-underline"></div>
                  </div>
                </div>
              </div>

              {/* Second Row - Age and Email */}
              <div className="register-form-grid register-grid-dual">
                <div className="register-input-field">
                  <label htmlFor="age" className="register-field-label">
                    <Calendar size={16} />
                    Age
                  </label>
                  <div className="register-input-wrapper">
                    <div className="register-input-icon">
                      <Calendar size={18} />
                    </div>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      className="register-text-input"
                      placeholder="25"
                      value={formData.age}
                      onChange={handleChange}
                      min="13"
                      max="120"
                      required
                    />
                    <div className="register-input-underline"></div>
                  </div>
                </div>

                <div className="register-input-field">
                  <label htmlFor="email" className="register-field-label">
                    <Mail size={16} />
                    Email
                  </label>
                  <div className="register-input-wrapper">
                    <div className="register-input-icon">
                      <Mail size={18} />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="register-text-input"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <div className="register-input-underline"></div>
                  </div>
                </div>
              </div>

              {/* Third Row - Username and Password */}
              <div className="register-form-grid register-grid-dual">
                <div className="register-input-field">
                  <label htmlFor="username" className="register-field-label">
                    <UserCheck size={16} />
                    Username
                  </label>
                  <div className="register-input-wrapper">
                    <div className="register-input-icon">
                      <UserCheck size={18} />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      className="register-text-input"
                      placeholder="johndoe"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                    <div className="register-input-underline"></div>
                  </div>
                </div>

                <div className="register-input-field">
                  <label htmlFor="password" className="register-field-label">
                    <Lock size={16} />
                    Password
                  </label>
                  <div className="register-input-wrapper">
                    <div className="register-input-icon">
                      <Lock size={18} />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="register-text-input"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <div className="register-input-underline"></div>
                  </div>
                </div>
              </div>

              {/* Role Selection */}
              <div className="register-input-field register-role-section">
                <label className="register-field-label">
                  <UserCheck size={16} />
                  Choose Your Role
                </label>
                <div className="register-role-picker">
                  <div className={`register-role-option ${formData.role === "student" ? "register-role-selected" : ""}`}>
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={formData.role === "student"}
                      onChange={handleChange}
                      id="student-role"
                    />
                    <label htmlFor="student-role" className="register-role-option-label">
                      <div className="register-role-icon-container">
                        <GraduationCap size={32} />
                      </div>
                      <div className="register-role-content">
                        <h3 className="register-role-title">Student</h3>
                        <p className="register-role-description">Learn and grow with expert guidance</p>
                      </div>
                    </label>
                  </div>

                  <div className={`register-role-option ${formData.role === "instructor" ? "register-role-selected" : ""}`}>
                    <input
                      type="radio"
                      name="role"
                      value="instructor"
                      checked={formData.role === "instructor"}
                      onChange={handleChange}
                      id="instructor-role"
                    />
                    <label htmlFor="instructor-role" className="register-role-option-label">
                      <div className="register-role-icon-container">
                        <BookOpen size={32} />
                      </div>
                      <div className="register-role-content">
                        <h3 className="register-role-title">Instructor</h3>
                        <p className="register-role-description">Share knowledge and inspire others</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="register-submit-button" disabled={isLoading}>
                <span className="register-button-content">
                  {isLoading ? (
                    <>
                      <div className="register-loading-spinner"></div>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span className="register-button-icon">
                        <ArrowRight size={20} />
                      </span>
                      <span>Create Account</span>
                    </>
                  )}
                </span>
                <div className="register-button-glow"></div>
              </button>

              {/* Message */}
              {message && (
                <div className={`register-status-message ${message.includes("successful") ? "register-status-success" : "register-status-error"}`}>
                  <div className="register-message-icon">
                    {message.includes("successful") ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                  </div>
                  <span className="register-message-text">{message}</span>
                </div>
              )}
            </form>

            <div className="register-footer-section">
              <p className="register-footer-text">
                Already have an account?{" "}
                <Link to="/" className="register-footer-link">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register