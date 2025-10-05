import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';

const Header = () => {
  const { isAuthenticated, manager, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <div style={logoStyle}>
          <Link to="/" style={logoLinkStyle}>
            <h2 style={logoTextStyle}>
              Manager Portal
            </h2>
          </Link>
        </div>
        
        <nav style={navStyle}>
          {isAuthenticated ? (
            <div style={authNavStyle}>
              <span style={welcomeStyle}>
                Welcome, {manager?.name} ({manager?.department})
              </span>
              <Link to="/dashboard" style={linkButtonStyle}>
                Dashboard
              </Link>
              <button 
                onClick={handleLogout} 
                style={{...buttonStyle, ...logoutButtonStyle}}
              >
                Logout
              </button>
            </div>
          ) : (
            <div style={guestNavStyle}>
              <Link to="/login" style={linkButtonStyle}>
                Login
              </Link>
              <Link to="/register" style={{...linkButtonStyle, ...registerButtonStyle}}>
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

// Styles
const headerStyle = {
  backgroundColor: '#2c3e50',
  color: 'white',
  padding: '1rem 0',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 1rem'
};

const logoStyle = {
  display: 'flex',
  alignItems: 'center'
};

const logoLinkStyle = {
  textDecoration: 'none',
  color: 'inherit'
};

const logoTextStyle = {
  margin: 0,
  cursor: 'pointer',
  color: '#ecf0f1'
};

const linkButtonStyle = {
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  backgroundColor: '#3498db',
  color: 'white',
  fontSize: '14px',
  textDecoration: 'none',
  display: 'inline-block',
  transition: 'background-color 0.3s'
};

const navStyle = {
  display: 'flex',
  alignItems: 'center'
};

const authNavStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
};

const guestNavStyle = {
  display: 'flex',
  gap: '0.5rem'
};

const welcomeStyle = {
  marginRight: '1rem',
  color: '#bdc3c7'
};

const buttonStyle = {
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  backgroundColor: '#3498db',
  color: 'white',
  fontSize: '14px',
  transition: 'background-color 0.3s'
};

const logoutButtonStyle = {
  backgroundColor: '#e74c3c'
};

const registerButtonStyle = {
  backgroundColor: '#27ae60'
};

export default Header;
