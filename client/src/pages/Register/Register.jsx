// src/pages/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
// import './auth.scss';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '', role: 'student' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <select name="role" onChange={handleChange}>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
        </select>
        <button type="submit">Register</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Register;
