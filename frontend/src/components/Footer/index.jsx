import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={contentStyle}>
          <div style={sectionStyle}>
            <h4>Employee Management System</h4>
            <p>Streamline your workforce management with our comprehensive platform.</p>
          </div>
          
          <div style={sectionStyle}>
            <h4>Features</h4>
            <ul style={listStyle}>
              <li>Employee Registration</li>
              <li>Profile Management</li>
              <li>Department Organization</li>
              <li>Salary Management</li>
            </ul>
          </div>
          
          <div style={sectionStyle}>
            <h4>Support</h4>
            <ul style={listStyle}>
              <li>Help Center</li>
              <li>Contact Support</li>
              <li>Documentation</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>
        
        <div style={bottomStyle}>
          <p>&copy; 2025 Employee Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Styles
const footerStyle = {
  backgroundColor: '#2c3e50',
  color: '#ecf0f1',
  marginTop: 'auto',
  padding: '2rem 0 1rem'
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 1rem'
};

const contentStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '2rem',
  marginBottom: '2rem'
};

const sectionStyle = {
  lineHeight: '1.6'
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0
};

const bottomStyle = {
  textAlign: 'center',
  paddingTop: '1rem',
  borderTop: '1px solid #34495e',
  color: '#bdc3c7'
};

export default Footer;
