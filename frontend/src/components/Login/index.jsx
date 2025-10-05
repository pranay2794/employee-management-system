import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../api/EmployeeApi';
import { useAuth } from '../../App';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  // Form validation function
  const validateForm = () => {
    const errors = {};
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      login({
        id: response._id,
        name: response.name,
        email: response.email,
        department: response.department
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h2 style={titleStyle}>Manager Login</h2>
        
        {error && (
          <div style={errorStyle}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={formErrors.email ? {...inputStyle, ...errorInputStyle} : inputStyle}
              placeholder="Enter your email"
            />
            {formErrors.email && <span style={errorTextStyle}>{formErrors.email}</span>}
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={formErrors.password ? {...inputStyle, ...errorInputStyle} : inputStyle}
              placeholder="Enter your password"
            />
            {formErrors.password && <span style={errorTextStyle}>{formErrors.password}</span>}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{...buttonStyle, ...(loading ? disabledButtonStyle : {})}}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={linkContainerStyle}>
          <p>
            Don't have an account?{' '}
            <Link to="/register" style={linkStyle}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '80vh',
  padding: '2rem'
};

const formContainerStyle = {
  background: 'white',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '400px'
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '1.5rem',
  color: '#2c3e50'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const labelStyle = {
  marginBottom: '0.5rem',
  fontWeight: 'bold',
  color: '#34495e'
};

const inputStyle = {
  padding: '0.75rem',
  border: '1px solid #bdc3c7',
  borderRadius: '4px',
  fontSize: '1rem'
};

const buttonStyle = {
  padding: '0.75rem',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  fontSize: '1rem',
  cursor: 'pointer',
  marginTop: '1rem'
};

const disabledButtonStyle = {
  backgroundColor: '#95a5a6',
  cursor: 'not-allowed'
};

const errorStyle = {
  backgroundColor: '#e74c3c',
  color: 'white',
  padding: '0.75rem',
  borderRadius: '4px',
  marginBottom: '1rem',
  textAlign: 'center'
};

const errorInputStyle = {
  borderColor: '#e74c3c',
  boxShadow: '0 0 0 2px rgba(231, 76, 60, 0.2)'
};

const errorTextStyle = {
  color: '#e74c3c',
  fontSize: '0.875rem',
  marginTop: '0.25rem',
  display: 'block'
};

const linkContainerStyle = {
  textAlign: 'center',
  marginTop: '1rem'
};

const linkStyle = {
  color: '#3498db',
  cursor: 'pointer',
  textDecoration: 'underline'
};

export default Login;
