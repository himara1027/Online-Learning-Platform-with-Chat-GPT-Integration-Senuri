// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ Add this

const Login = ({ setAuthUser }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // ✅ Initialize the navigation

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', formData);
    localStorage.setItem('token', res.data.token);
    setAuthUser(res.data.user);
    
    if (res.data.user.role === 'instructor') {
      navigate('/instructor-dashboard');
    } else {
      navigate('/student-dashboard');
    }
  } catch (err) {
    setMessage(err.response?.data?.message || 'Login failed');
  }
};


  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Login;
