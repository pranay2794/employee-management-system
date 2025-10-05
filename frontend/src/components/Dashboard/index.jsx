import React, { useState, useEffect } from 'react';
import { employeeAPI } from '../../api/EmployeeApi';
import { useAuth } from '../../App';

const Dashboard = () => {
  const { manager } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    salary: ''
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Filter employees based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  }, [employees, searchTerm]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await employeeAPI.getAllEmployees();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Form validation function
  const validateForm = () => {
    const errors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
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
    
    // Position validation
    if (!formData.position.trim()) {
      errors.position = 'Position is required';
    } else if (formData.position.trim().length < 2) {
      errors.position = 'Position must be at least 2 characters long';
    }
    
    // Department validation
    if (!formData.department) {
      errors.department = 'Department is required';
    }
    
    // Salary validation
    if (!formData.salary) {
      errors.salary = 'Salary is required';
    } else if (isNaN(formData.salary) || parseFloat(formData.salary) <= 0) {
      errors.salary = 'Salary must be a positive number';
    } else if (parseFloat(formData.salary) < 1000) {
      errors.salary = 'Salary must be at least $1,000';
    } else if (parseFloat(formData.salary) > 10000000) {
      errors.salary = 'Salary cannot exceed $10,000,000';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await employeeAPI.createEmployee(formData);
      setFormData({ name: '', email: '', position: '', department: '', salary: '' });
      setFormErrors({});
      setShowAddForm(false);
      fetchEmployees();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditEmployee = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await employeeAPI.updateEmployee(editingEmployee._id, formData);
      setFormData({ name: '', email: '', position: '', department: '', salary: '' });
      setFormErrors({});
      setEditingEmployee(null);
      fetchEmployees();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeAPI.deleteEmployee(id);
        fetchEmployees();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const startEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      position: employee.position,
      department: employee.department,
      salary: employee.salary
    });
    setShowAddForm(false);
  };

  const cancelEdit = () => {
    setEditingEmployee(null);
    setFormData({ name: '', email: '', position: '', department: '', salary: '' });
    setFormErrors({});
  };

  const showAddEmployeeForm = () => {
    setShowAddForm(true);
    setEditingEmployee(null);
    setFormData({ name: '', email: '', position: '', department: '', salary: '' });
    setFormErrors({});
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1>Manager Dashboard</h1>
        <p>Welcome, {manager?.name} - {manager?.department} Department</p>
      </div>

      {error && (
        <div style={errorStyle}>
          {error}
          <button onClick={() => setError('')} style={closeButtonStyle}>×</button>
        </div>
      )}

      <div style={searchAndActionBarStyle}>
        <div style={searchContainerStyle}>
          <input
            type="text"
            placeholder="Search employees by name, email, position, or department..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={searchInputStyle}
          />
          <span style={searchIconStyle}>🔍</span>
        </div>
        
        <div style={actionButtonsStyle}>
          <button 
            onClick={showAddEmployeeForm} 
            style={addButtonStyle}
          >
            + Add New Employee
          </button>
          <button 
            onClick={fetchEmployees} 
            style={refreshButtonStyle}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {(showAddForm || editingEmployee) && (
        <div style={formSectionStyle}>
          <h3>{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</h3>
          <form onSubmit={editingEmployee ? handleEditEmployee : handleAddEmployee} style={formStyle}>
            <div style={formRowStyle}>
              <div style={inputGroupStyle}>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={formErrors.name ? {...inputStyle, ...errorInputStyle} : inputStyle}
                />
                {formErrors.name && <span style={errorTextStyle}>{formErrors.name}</span>}
              </div>
              <div style={inputGroupStyle}>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={formErrors.email ? {...inputStyle, ...errorInputStyle} : inputStyle}
                />
                {formErrors.email && <span style={errorTextStyle}>{formErrors.email}</span>}
              </div>
            </div>

            <div style={formRowStyle}>
              <div style={inputGroupStyle}>
                <label>Position:</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                  style={formErrors.position ? {...inputStyle, ...errorInputStyle} : inputStyle}
                />
                {formErrors.position && <span style={errorTextStyle}>{formErrors.position}</span>}
              </div>
              <div style={inputGroupStyle}>
                <label>Department:</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
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
            </div>

            <div style={formRowStyle}>
              <div style={inputGroupStyle}>
                <label>Salary:</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  required
                  min="1000"
                  max="10000000"
                  step="100"
                  style={formErrors.salary ? {...inputStyle, ...errorInputStyle} : inputStyle}
                />
                {formErrors.salary && <span style={errorTextStyle}>{formErrors.salary}</span>}
              </div>
            </div>

            <div style={formButtonsStyle}>
              <button type="submit" style={saveButtonStyle}>
                {editingEmployee ? 'Update Employee' : 'Add Employee'}
              </button>
              <button 
                type="button" 
                onClick={editingEmployee ? cancelEdit : () => setShowAddForm(false)}
                style={cancelButtonStyle}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={tableContainerStyle}>
        <h3>Employees ({filteredEmployees.length}{searchTerm ? ` of ${employees.length}` : ''})</h3>
        {searchTerm && (
          <div style={searchResultsStyle}>
            Showing results for: <strong>"{searchTerm}"</strong>
            <button onClick={() => setSearchTerm('')} style={clearSearchStyle}>Clear Search</button>
          </div>
        )}
        
        {loading ? (
          <div style={loadingStyle}>Loading employees...</div>
        ) : filteredEmployees.length === 0 ? (
          <div style={emptyStateStyle}>
            {searchTerm ? (
              <p>No employees found matching "{searchTerm}". Try a different search term.</p>
            ) : (
              <p>No employees found. Add your first employee!</p>
            )}
          </div>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr style={tableHeaderStyle}>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Position</th>
                <th style={thStyle}>Department</th>
                <th style={thStyle}>Salary</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee._id} style={tableRowStyle}>
                  <td style={tdStyle}>{employee.name}</td>
                  <td style={tdStyle}>{employee.email}</td>
                  <td style={tdStyle}>{employee.position}</td>
                  <td style={tdStyle}>{employee.department}</td>
                  <td style={tdStyle}>${employee.salary?.toLocaleString()}</td>
                  <td style={tdStyle}>
                    <button 
                      onClick={() => startEdit(employee)}
                      style={editButtonStyle}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteEmployee(employee._id)}
                      style={deleteButtonStyle}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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

const headerStyle = {
  textAlign: 'center',
  marginBottom: '2rem',
  color: '#2c3e50'
};

const errorStyle = {
  backgroundColor: '#e74c3c',
  color: 'white',
  padding: '1rem',
  borderRadius: '4px',
  marginBottom: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const closeButtonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  color: 'white',
  fontSize: '1.5rem',
  cursor: 'pointer'
};

const searchAndActionBarStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  marginBottom: '2rem'
};

const searchContainerStyle = {
  position: 'relative',
  maxWidth: '500px'
};

const searchInputStyle = {
  width: '100%',
  padding: '0.75rem 2.5rem 0.75rem 1rem',
  border: '2px solid #bdc3c7',
  borderRadius: '25px',
  fontSize: '1rem',
  outline: 'none',
  transition: 'border-color 0.3s'
};

const searchIconStyle = {
  position: 'absolute',
  right: '1rem',
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: '1.2rem',
  color: '#7f8c8d',
  pointerEvents: 'none'
};

const actionButtonsStyle = {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'flex-start',
  flexWrap: 'wrap'
};

const searchResultsStyle = {
  padding: '0.75rem',
  backgroundColor: '#e8f5e8',
  border: '1px solid #27ae60',
  borderRadius: '4px',
  marginBottom: '1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  fontSize: '0.9rem'
};

const clearSearchStyle = {
  padding: '0.25rem 0.75rem',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.8rem'
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

const addButtonStyle = {
  padding: '0.75rem 1.5rem',
  backgroundColor: '#27ae60',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem'
};

const refreshButtonStyle = {
  padding: '0.75rem 1.5rem',
  backgroundColor: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem'
};

const formSectionStyle = {
  backgroundColor: '#f8f9fa',
  padding: '2rem',
  borderRadius: '8px',
  marginBottom: '2rem',
  border: '1px solid #dee2e6'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const formRowStyle = {
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap'
};

const inputGroupStyle = {
  flex: 1,
  minWidth: '200px',
  display: 'flex',
  flexDirection: 'column'
};

const inputStyle = {
  padding: '0.75rem',
  border: '1px solid #bdc3c7',
  borderRadius: '4px',
  fontSize: '1rem',
  marginTop: '0.25rem'
};

const formButtonsStyle = {
  display: 'flex',
  gap: '1rem',
  marginTop: '1rem'
};

const saveButtonStyle = {
  padding: '0.75rem 1.5rem',
  backgroundColor: '#27ae60',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const cancelButtonStyle = {
  padding: '0.75rem 1.5rem',
  backgroundColor: '#95a5a6',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const tableContainerStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  overflow: 'hidden'
};

const loadingStyle = {
  textAlign: 'center',
  padding: '2rem',
  color: '#7f8c8d'
};

const emptyStateStyle = {
  textAlign: 'center',
  padding: '3rem',
  color: '#7f8c8d'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse'
};

const tableHeaderStyle = {
  backgroundColor: '#34495e',
  color: 'white'
};

const thStyle = {
  padding: '1rem',
  textAlign: 'left',
  borderBottom: '1px solid #bdc3c7'
};

const tableRowStyle = {
  borderBottom: '1px solid #ecf0f1'
};

const tdStyle = {
  padding: '1rem',
  borderBottom: '1px solid #ecf0f1'
};

const editButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#f39c12',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginRight: '0.5rem',
  fontSize: '0.875rem'
};

const deleteButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#e74c3c',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.875rem'
};

export default Dashboard;
