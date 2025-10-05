# Employee Management System

A full-stack web application that allows managers to register, authenticate, and perform comprehensive CRUD operations on employee data. Built with modern web technologies including React.js, Node.js, Express.js, and MongoDB.

## 🚀 Features

### Authentication & Security
- **Secure Manager Registration & Login**
- **JWT Token-based Authentication**
- **Protected Routes & Middleware**
- **Password Hashing with bcryptjs**
- **Session Management**

### Employee Management (CRUD Operations)
- **Create**: Add new employees with comprehensive validation
- **Read**: View all employees in a clean, organized table
- **Update**: Edit employee information seamlessly
- **Delete**: Remove employees with confirmation dialogs

### Advanced Features
- **Real-time Search**: Multi-field search across name, email, position, and department
- **Form Validation**: Client-side validation with real-time feedback
- **Responsive Design**: Mobile-friendly interface
- **Error Handling**: Comprehensive error management with user feedback
- **Loading States**: Visual feedback during API operations
- **Route Protection**: Automatic redirects based on authentication status

## 🛠 Tech Stack

### Frontend
- **React.js** (v19.2.0) - Component-based UI library
- **React Router DOM** - Client-side routing and navigation
- **Context API** - State management for authentication
- **Custom CSS** - Responsive styling without external libraries

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
employee/
├── backend/
│   ├── config/
│   │   └── dbConnection.js       # MongoDB connection configuration
│   ├── controller/
│   │   ├── authController.js     # Authentication logic
│   │   └── employeeController.js # Employee CRUD operations
│   ├── middleware/
│   │   └── validateTokenHandler.js # JWT token validation
│   ├── model/
│   │   ├── authModel.js          # Manager/Auth schema
│   │   └── employeeModel.js      # Employee schema
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication routes
│   │   └── employeeRoutes.js     # Employee routes
│   ├── .env                      # Environment variables
│   ├── app.js                    # Express app configuration
│   └── package.json              # Backend dependencies
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── EmployeeApi.js    # API integration layer
│   │   ├── components/
│   │   │   ├── Dashboard/        # Main dashboard component
│   │   │   ├── Header/           # Navigation header
│   │   │   ├── Footer/           # Footer component
│   │   │   ├── Home/             # Landing page
│   │   │   ├── Login/            # Login form
│   │   │   └── Register/         # Registration form
│   │   ├── App.js                # Main app with routing
│   │   ├── App.css               # Global styles
│   │   └── index.js              # React app entry point
│   └── package.json              # Frontend dependencies
└── README.md                     # Project documentation
```

## 🚀 Getting Started

### Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use MongoDB Atlas
- **Git** - [Download here](https://git-scm.com/)
- **npm** (comes with Node.js)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/employee-management-system.git
   cd employee-management-system
   ```

2. **Backend Setup**
   ```bash
   # Navigate to backend directory
   cd backend
   
   # Install dependencies
   npm install
   
   # Create environment file
   cp .env.example .env
   # Or manually create .env file with the following content:
   ```

3. **Create `.env` file in backend directory**
   ```env
   MONGODB_URI=mongodb://localhost:27017/managerdb
   PORT=5000
   JWT_SECRET=Manager_SecretKey
   ```

4. **Frontend Setup**
   ```bash
   # Navigate to frontend directory (from project root)
   cd frontend
   
   # Install dependencies
   npm install
   ```

5. **Database Setup**
   - **Option 1: Local MongoDB**
     - Start MongoDB service on your machine
     - The application will automatically create the database and collections
   
   - **Option 2: MongoDB Atlas (Cloud)**
     - Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
     - Create a new cluster
     - Get your connection string
     - Replace `MONGODB_URI` in `.env` with your Atlas connection string

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   # Server will run on http://localhost:5000
   ```

2. **Start the Frontend Development Server** (in a new terminal)
   ```bash
   cd frontend
   npm start
   # Application will open in browser at http://localhost:3000
   ```

3. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`
   - The backend API will be available at `http://localhost:5000`

### Production Build

1. **Build the Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Serve the Production Build**
   ```bash
   # You can use a static server like 'serve'
   npm install -g serve
   serve -s build
   ```

## 🧪 Testing

### Running Test Cases

Currently, the application includes manual testing procedures. Here's how to test the functionality:

### Backend API Testing

1. **Test Authentication Endpoints**
   ```bash
   # Register a new manager
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "name": "John Doe",
       "email": "john@example.com",
       "password": "password123",
       "department": "Engineering"
     }'

   # Login
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "john@example.com",
       "password": "password123"
     }'
   ```

2. **Test Employee Endpoints** (requires authentication token)
   ```bash
   # Get all employees
   curl -X GET http://localhost:5000/api/manager \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"

   # Create new employee
   curl -X POST http://localhost:5000/api/manager \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{
       "name": "Jane Smith",
       "email": "jane@example.com",
       "position": "Developer",
       "department": "Engineering",
       "salary": 75000
     }'
   ```

### Frontend Manual Testing

1. **Registration Flow**
   - Navigate to `/register`
   - Fill out the form with valid data
   - Verify validation messages for invalid inputs
   - Submit and verify redirect to login

2. **Login Flow**
   - Navigate to `/login`
   - Test with valid and invalid credentials
   - Verify redirect to dashboard on success

3. **Dashboard Functionality**
   - Test employee creation with validation
   - Test search functionality across all fields
   - Test employee editing and deletion
   - Test form validation on all inputs

### Test Cases Checklist

- [ ] Manager registration with valid data
- [ ] Manager registration with invalid data (validation)
- [ ] Manager login with correct credentials
- [ ] Manager login with incorrect credentials
- [ ] Protected route access without authentication
- [ ] Employee creation with valid data
- [ ] Employee creation with invalid data (validation)
- [ ] Employee list retrieval
- [ ] Employee search functionality
- [ ] Employee update operations
- [ ] Employee deletion with confirmation
- [ ] Real-time form validation
- [ ] Responsive design on mobile devices
- [ ] Error handling and user feedback

## 🎯 Design Choices & Assumptions

### Architecture Decisions

1. **Separation of Concerns**
   - **Frontend**: Focused purely on UI/UX and user interactions
   - **Backend**: Handles business logic, authentication, and data persistence
   - **Database**: MongoDB for flexible document storage

2. **Authentication Strategy**
   - **JWT Tokens**: Chosen for stateless authentication
   - **Local Storage**: Used for token persistence (suitable for demo purposes)
   - **Protected Routes**: Implemented both on frontend and backend

3. **State Management**
   - **React Context**: Used instead of Redux for simplicity
   - **Local Component State**: For form handling and UI states
   - **No External State Libraries**: Keeping dependencies minimal

### Technology Choices

1. **React.js Frontend**
   - **Functional Components**: Modern React patterns with hooks
   - **No CSS Framework**: Custom CSS for better understanding and control
   - **React Router**: Standard routing solution for SPAs

2. **Node.js/Express Backend**
   - **RESTful API**: Clear and standardized endpoint structure
   - **Middleware Pattern**: For authentication and request processing
   - **Mongoose ODM**: Simplified MongoDB interactions

3. **MongoDB Database**
   - **Document-based**: Suitable for employee data structure
   - **Flexible Schema**: Easy to extend with new fields
   - **Mongoose Validation**: Built-in data validation

### Security Considerations

1. **Password Security**
   - bcryptjs hashing with salt rounds
   - No plain text password storage

2. **API Security**
   - JWT token validation on protected routes
   - CORS configuration for cross-origin requests
   - Input validation and sanitization

3. **Frontend Security**
   - Protected routes with authentication checks
   - Form validation to prevent invalid data submission
   - Automatic token expiry handling

### User Experience Decisions

1. **Real-time Search**
   - Immediate feedback without button clicks
   - Multi-field search for better usability

2. **Form Validation**
   - Real-time validation with clear error messages
   - Visual feedback with red borders for errors

3. **Responsive Design**
   - Mobile-first approach
   - Flexible layouts for different screen sizes

### Assumptions Made

1. **Single Manager Per System**: Each manager manages their own employees
2. **Department Categories**: Predefined list of departments
3. **Salary Range**: Minimum $1,000 to maximum $10,000,000
4. **Email Uniqueness**: Each employee must have a unique email
5. **Browser Support**: Modern browsers with ES6+ support
6. **Network**: Stable internet connection for API calls

### Future Enhancements

1. **Testing Framework**: Add unit and integration tests
2. **Advanced Search**: Filters by salary range, department, etc.
3. **Data Export**: CSV/Excel export functionality
4. **Email Notifications**: Welcome emails for new employees
5. **Role-based Access**: Different permission levels
6. **Audit Trail**: Track changes to employee data
7. **Pagination**: For handling large datasets
8. **File Upload**: Employee profile pictures

## 📝 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new manager
- `POST /api/auth/login` - Manager login

### Employee Management Endpoints

- `GET /api/manager` - Get all employees (protected)
- `POST /api/manager` - Create new employee (protected)
- `GET /api/manager/:id` - Get employee by ID (protected)
- `PUT /api/manager/:id` - Update employee (protected)
- `DELETE /api/manager/:id` - Delete employee (protected)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [Pranaykumar](https://github.com/pranay2794)
- LinkedIn: [Pranaykumar LinkedIn](https://www.linkedin.com/feed/)
- Email: pranaykumarnagireddy3@gmail.com

## 🙏 Acknowledgments

- React.js community for excellent documentation
- Express.js team for the robust framework
- MongoDB for the flexible database solution
- All open-source contributors whose packages made this project possible

---

**Note**: This is a portfolio project demonstrating full-stack development skills. It's designed to showcase modern web development practices and technologies.