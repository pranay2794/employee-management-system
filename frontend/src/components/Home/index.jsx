import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={containerStyle}>
      <div style={heroSectionStyle}>
        <h1 style={titleStyle}>Employee Management System</h1>
        <p style={subtitleStyle}>
          Streamline your employee management with our comprehensive manager portal
        </p>
        
        <div style={featuresStyle}>
          <div style={featureCardStyle}>
            <h3>👥 Employee Management</h3>
            <p>Add, update, and manage your team members efficiently</p>
          </div>
          
          <div style={featureCardStyle}>
            <h3>📊 Real-time Dashboard</h3>
            <p>Get insights and analytics about your team performance</p>
          </div>
          
          <div style={featureCardStyle}>
            <h3>🔒 Secure Access</h3>
            <p>Role-based access control for managers and administrators</p>
          </div>
        </div>

        <div style={ctaButtonsStyle}>
          <Link to="/login" style={primaryButtonStyle}>
            Login as Manager
          </Link>
          <Link to="/register" style={secondaryButtonStyle}>
            Register as Manager
          </Link>
        </div>
      </div>

      <div style={infoSectionStyle}>
        <h2 style={sectionTitleStyle}>Key Features</h2>
        <div style={infoGridStyle}>
          <div style={infoCardStyle}>
            <h4>✨ Easy Employee Addition</h4>
            <p>Quickly add new employees with all necessary details including position, department, and salary information.</p>
          </div>
          
          <div style={infoCardStyle}>
            <h4>📋 Comprehensive Employee List</h4>
            <p>View all your employees in a clean, organized table with search and filter capabilities.</p>
          </div>
          
          <div style={infoCardStyle}>
            <h4>✏️ Quick Updates</h4>
            <p>Easily update employee information, change positions, departments, or salary details.</p>
          </div>
          
          <div style={infoCardStyle}>
            <h4>🗑️ Safe Deletion</h4>
            <p>Remove employees from the system with confirmation dialogs to prevent accidental deletions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  padding: '2rem',
  maxWidth: '1200px',
  margin: '0 auto'
};

const heroSectionStyle = {
  textAlign: 'center',
  padding: '3rem 0',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '10px',
  color: 'white',
  marginBottom: '3rem'
};

const titleStyle = {
  fontSize: '3rem',
  marginBottom: '1rem',
  fontWeight: 'bold'
};

const subtitleStyle = {
  fontSize: '1.2rem',
  marginBottom: '2rem',
  opacity: 0.9
};

const featuresStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '1.5rem',
  margin: '2rem 0',
  padding: '0 1rem'
};

const featureCardStyle = {
  background: 'rgba(255, 255, 255, 0.1)',
  padding: '1.5rem',
  borderRadius: '8px',
  backdropFilter: 'blur(10px)'
};

const ctaButtonsStyle = {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
  marginTop: '2rem',
  flexWrap: 'wrap'
};

const primaryButtonStyle = {
  padding: '1rem 2rem',
  backgroundColor: '#27ae60',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  fontSize: '1.1rem',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  textDecoration: 'none',
  display: 'inline-block'
};

const secondaryButtonStyle = {
  padding: '1rem 2rem',
  backgroundColor: 'transparent',
  color: 'white',
  border: '2px solid white',
  borderRadius: '5px',
  fontSize: '1.1rem',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  textDecoration: 'none',
  display: 'inline-block'
};

const infoSectionStyle = {
  padding: '2rem 0'
};

const sectionTitleStyle = {
  textAlign: 'center',
  fontSize: '2.5rem',
  marginBottom: '2rem',
  color: '#2c3e50'
};

const infoGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '2rem'
};

const infoCardStyle = {
  background: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  border: '1px solid #ecf0f1'
};

export default Home;
