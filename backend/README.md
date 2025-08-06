# TraceWing Backend - Django REST API

A comprehensive employee management system built with Django and Django REST Framework.

## 🚀 Features

### Core Applications
- **Authentication**: User authentication, profiles, sessions, and security
- **Employees**: Employee management, departments, and organizational structure
- **Attendance**: Time tracking, check-in/out, leave management
- **Geofencing**: Location-based attendance tracking
- **Payroll**: Salary management, payslips, and payment processing
- **Notifications**: System notifications and user preferences

### Key Capabilities
- ✅ Token-based authentication
- ✅ RESTful API endpoints
- ✅ PostgreSQL database integration
- ✅ Admin interface
- ✅ CORS support for frontend integration
- ✅ Comprehensive model relationships
- ✅ Automated salary calculations
- ✅ Location-based attendance tracking
- ✅ Leave management system

## 📋 Requirements

- Python 3.12+
- PostgreSQL 12+
- Virtual environment (recommended)

## 🛠️ Installation & Setup

### 1. Clone and Setup Virtual Environment
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Environment Configuration
Create a `.env` file in the backend directory:
```env
# Database Configuration
DB_NAME=tracewing_db
DB_USER=tracewing_user
DB_PASSWORD=tracewing_password
DB_HOST=localhost
DB_PORT=5432

# Django Configuration
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1
```

### 4. Database Setup
```bash
# Create PostgreSQL database and user
sudo -u postgres psql
CREATE DATABASE tracewing_db;
CREATE USER tracewing_user WITH PASSWORD 'tracewing_password';
GRANT ALL PRIVILEGES ON DATABASE tracewing_db TO tracewing_user;
\q

# Run migrations
python manage.py makemigrations
python manage.py migrate
```

### 5. Create Superuser
```bash
python manage.py createsuperuser
```

### 6. Run Development Server
```bash
python manage.py runserver
```

## 📊 Database Models

### Employee Management
- **Department**: Organizational departments
- **Employee**: Employee profiles with comprehensive information

### Attendance System
- **AttendanceRecord**: Daily attendance with automatic hour calculations
- **LeaveType**: Different types of leaves (sick, vacation, etc.)
- **LeaveRequest**: Employee leave requests with approval workflow

### Geofencing
- **GeofenceLocation**: Defined geographical boundaries for offices/sites
- **EmployeeLocationLog**: Location tracking for attendance verification

### Payroll System
- **PayrollPeriod**: Payroll cycles (monthly, bi-weekly, weekly)
- **SalaryComponent**: Salary components (basic, allowances, deductions)
- **EmployeeSalaryStructure**: Employee-specific salary configurations
- **Payslip**: Generated payslips with automatic calculations

### Notifications
- **NotificationTemplate**: Reusable notification templates
- **Notification**: User notifications with delivery tracking
- **NotificationPreference**: User notification preferences

### Authentication
- **UserProfile**: Extended user profiles
- **UserSession**: Session management and device tracking
- **LoginAttempt**: Security logging for login attempts

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/profile/` - Get user profile

### Testing Endpoints
Each app includes a test endpoint:
- `GET /api/auth/test/` - Authentication app test
- `GET /api/employees/test/` - Employees app test
- `GET /api/attendance/test/` - Attendance app test
- `GET /api/geofencing/test/` - Geofencing app test
- `GET /api/notifications/test/` - Notifications app test
- `GET /api/payroll/test/` - Payroll app test

## 🔧 Development

### Project Structure
```
backend/
├── apps/
│   ├── authentication/     # User auth and profiles
│   ├── employees/         # Employee management
│   ├── attendance/        # Time tracking
│   ├── geofencing/        # Location services
│   ├── notifications/     # Messaging system
│   └── payroll/          # Salary management
├── tracewing/            # Project settings
├── manage.py
├── requirements.txt
└── .env
```

### Key Features

#### Automatic Calculations
- **Attendance**: Hours worked and overtime automatically calculated
- **Payroll**: Gross salary, deductions, and net pay computed automatically
- **Leave**: Leave days calculated based on date ranges

#### Geofencing
- **Location Tracking**: Haversine formula for accurate distance calculations
- **Automatic Detection**: Determines if employee is within allowed boundaries
- **Multiple Locations**: Support for multiple office locations

#### Security Features
- **Token Authentication**: Secure API access
- **Login Tracking**: Monitor login attempts and sessions
- **Password Management**: Reset tokens and verification

## 🚀 Deployment

### Environment Variables
Ensure all environment variables are properly configured for production:
- Set `DEBUG=False`
- Configure proper database credentials
- Set secure `SECRET_KEY`
- Configure `ALLOWED_HOSTS`

### Static Files
```bash
python manage.py collectstatic
```

## 📝 Admin Interface

Access the Django admin at `/admin/` with your superuser credentials to:
- Manage users and employees
- View attendance records
- Configure payroll components
- Monitor system notifications
- Manage geofence locations

## 🤝 Contributing

1. Create feature branches
2. Follow Django best practices
3. Add tests for new functionality
4. Update documentation

## 📄 License

This project is part of the TraceWing employee management system. 