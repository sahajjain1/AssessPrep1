import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
      if (window.location.pathname === '/login') {
        navigate('/books');
      }
    }
  }, [navigate]);

  const login = useCallback((username, password) => {
    if (username === 'sahajjain78@gmail.com' && password === 'Test@1234') {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      localStorage.setItem('authToken', token);
      setAuthToken(token);
      setIsAuthenticated(true);
      navigate('/books');
    } else {
      console.error('Invalid credentials');
    }
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setIsAuthenticated(false);
    navigate('/login');
  }, [navigate]);

  return { login, logout, isAuthenticated, authToken };
};

/// generally we will use backend for the token and thn wiil store in local storage but as we didnt hade api for it so hardcoded for it