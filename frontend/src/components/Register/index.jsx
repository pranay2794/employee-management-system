import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../api/EmployeeApi';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    
    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      errors.name = 'Name can only contain letters and spaces';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    // Department validation
    if (!formData.department) {
      errors.department = 'Department is required';
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
    setSuccess('');

    try {
      // Remove confirmPassword from the data sent to the server
      const { confirmPassword, ...registrationData } = formData;
      await authAPI.register(registrationData);
      setSuccess('Registration successful! Please login.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h2 style={titleStyle}>Manager Registration</h2>
        
        {error && (
          <div style={errorStyle}>
            {error}
          </div>
        )}

        {success && (
          <div style={successStyle}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Full Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={formErrors.name ? {...inputStyle, ...errorInputStyle} : inputStyle}
              placeholder="Enter your full name"
            />
            {formErrors.name && <span style={errorTextStyle}>{formErrors.name}</span>}
          </div>

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
            <small style={helpTextStyle}>Password must be at least 8 characters with uppercase, lowercase, and number</small>
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={formErrors.confirmPassword ? {...inputStyle, ...errorInputStyle} : inputStyle}
              placeholder="Confirm your password"
            />
            {formErrors.confirmPassword && <span style={errorTextStyle}>{formErrors.confirmPassword}</span>}
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Department:</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              style={formErrors.department ? {...inputStyle, ...errorInputStyle} : inputStyle}
            >
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Sales">Sales</option>
              <option value="Operations">Operations</option>
              <option value="Analytics">Analytics</option>
              <option value="IT">IT</option>
            </select>
            {formErrors.department && <span style={errorTextStyle}>{formErrors.department}</span>}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{...buttonStyle, ...(loading ? disabledButtonStyle : {})}}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div style={linkContainerStyle}>
          <p>
            Already have an account?{' '}
            <Link to="/login" style={linkStyle}>
              Login here
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
  backgroundColor: '#27ae60',
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

const successStyle = {
  backgroundColor: '#27ae60',
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

const helpTextStyle = {
  color: '#7f8c8d',
  fontSize: '0.8rem',
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

export default Register;
