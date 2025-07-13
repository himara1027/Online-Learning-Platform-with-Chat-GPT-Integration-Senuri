import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setAuthUser, setToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear local storage or any persisted token
    localStorage.removeItem('token');
    localStorage.removeItem('authUser');

    // Clear auth state if passed from parent
    if (setAuthUser) setAuthUser(null);
    if (setToken) setToken(null);

    // Redirect to login
    navigate('/');
  }, [navigate, setAuthUser, setToken]);

  return <p>Logging out...</p>;
};

export default Logout;
