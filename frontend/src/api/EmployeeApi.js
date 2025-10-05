const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

// Auth API calls
export const authAPI = {
  // Register manager
  register: async (managerData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(managerData)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }
    return data;
  },

  // Login manager
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    // Store token in localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('manager', JSON.stringify({
        id: data._id,
        name: data.name,
        email: data.email,
        department: data.department
      }));
    }
    return data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('manager');
  },

  // Get current manager
  getCurrentManager: () => {
    const manager = localStorage.getItem('manager');
    return manager ? JSON.parse(manager) : null;
  }
};

// Employee API calls
export const employeeAPI = {
  // Get all employees
  getAllEmployees: async () => {
    const response = await fetch(`${API_BASE_URL}/manager`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch employees');
    }
    return data;
  },

  // Get employee by ID
  getEmployeeById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/manager/${id}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch employee');
    }
    return data;
  },

  // Create new employee
  createEmployee: async (employeeData) => {
    const response = await fetch(`${API_BASE_URL}/manager`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(employeeData)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create employee');
    }
    return data;
  },

  // Update employee
  updateEmployee: async (id, employeeData) => {
    const response = await fetch(`${API_BASE_URL}/manager/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(employeeData)
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update employee');
    }
    return data;
  },

  // Delete employee
  deleteEmployee: async (id) => {
    const response = await fetch(`${API_BASE_URL}/manager/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete employee');
    }
    return data;
  }
};
