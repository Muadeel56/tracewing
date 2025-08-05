# TraceWing 🚀

**Location-Based Employee Monitoring & Payroll Management System**

TraceWing is a comprehensive SaaS solution designed to streamline employee attendance tracking, geofencing-based monitoring, and automated payroll management. Built with modern technologies, it provides businesses with real-time insights into workforce productivity while ensuring accurate and efficient payroll processing.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Django](https://img.shields.io/badge/Django-REST-green.svg)](https://www.django-rest-framework.org/)

## 🌟 Key Features

### 📊 Admin Dashboard (Web)
- **Real-time Employee Tracking**: Monitor employee locations and attendance in real-time
- **Advanced Analytics**: Comprehensive reports on productivity, attendance patterns, and payroll insights
- **Employee Management**: Add, edit, and manage employee profiles with role-based permissions
- **Geofence Management**: Create and manage location boundaries for different work sites
- **Payroll Overview**: Automated payroll calculations with detailed breakdowns

### 📱 Mobile App (React Native)
- **Clock In/Out**: GPS-enabled attendance tracking with location verification
- **Geofence Alerts**: Automatic notifications when entering/leaving designated work areas
- **Time Tracking**: Accurate work hour logging with break time management
- **Profile Management**: Employee self-service for profile updates and attendance history
- **Offline Support**: Continue tracking even with limited connectivity

### 🎯 Core Capabilities
- **Geofencing Technology**: Location-based attendance with customizable boundaries
- **Automated Payroll**: Calculate wages based on tracked hours, overtime, and attendance
- **Multi-site Support**: Manage multiple work locations with different geofences
- **Real-time Notifications**: Instant alerts for clock-ins, violations, and system updates
- **Comprehensive Reporting**: Generate detailed reports for HR and payroll departments
- **Role-based Access Control**: Secure access management for different user types

## 🛠️ Tech Stack

### Frontend & Mobile
- **Web Dashboard**: React 19 with TypeScript
- **Mobile App**: React Native with Expo
- **Styling**: Tailwind CSS v4
- **State Management**: Redux Toolkit / Zustand
- **UI Components**: Headless UI / React Native Elements

### Backend
- **API**: Django REST Framework
- **Authentication**: JWT + Django Rest Auth
- **Database**: PostgreSQL with PostGIS extension
- **Geolocation**: PostGIS for spatial queries and geofencing
- **Task Queue**: Celery with Redis
- **File Storage**: AWS S3 / Local storage

### DevOps & Infrastructure
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Deployment**: Railway / Render
- **Monitoring**: Sentry for error tracking
- **Documentation**: Swagger/OpenAPI

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+
- **Python** 3.11+
- **PostgreSQL** 14+ with PostGIS
- **Docker** & Docker Compose
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/tracewing.git
cd tracewing
```

### 2. Environment Setup
```bash
# Copy environment files
cp backend/.env.example backend/.env
cp dashboard/.env.example dashboard/.env
cp mobile/.env.example mobile/.env

# Update the .env files with your configuration
```

### 3. Docker Setup (Recommended)
```bash
# Start all services
docker-compose up -d

# Run database migrations
docker-compose exec backend python manage.py migrate

# Create superuser
docker-compose exec backend python manage.py createsuperuser

# Load sample data (optional)
docker-compose exec backend python manage.py loaddata fixtures/sample_data.json
```

### 4. Manual Setup (Alternative)

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Setup PostgreSQL database with PostGIS
createdb tracewing_db
psql tracewing_db -c "CREATE EXTENSION postgis;"

# Run migrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

#### Dashboard Setup
```bash
cd dashboard
npm install
npm run dev
```

#### Mobile App Setup
```bash
cd mobile
npm install
npx expo start
```

### 5. Access the Application
- **Admin Dashboard**: http://localhost:3000
- **API Documentation**: http://localhost:8000/api/docs/
- **Admin Panel**: http://localhost:8000/admin/
- **Mobile App**: Use Expo Go app to scan QR code

## 📁 Project Structure

```
tracewing/
├── backend/                 # Django REST API
│   ├── apps/               # Django applications
│   │   ├── authentication/ # User auth & permissions
│   │   ├── employees/      # Employee management
│   │   ├── attendance/     # Attendance tracking
│   │   ├── geofencing/     # Location & geofence logic
│   │   ├── payroll/        # Payroll calculations
│   │   └── notifications/  # Push notifications
│   ├── config/             # Django settings
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile         # Backend container config
│
├── dashboard/              # React 19 Admin Dashboard
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service layer
│   │   ├── store/          # State management
│   │   └── utils/          # Helper functions
│   ├── public/             # Static assets
│   ├── package.json        # Node dependencies
│   └── tailwind.config.js  # Tailwind configuration
│
├── mobile/                 # React Native Mobile App
│   ├── src/
│   │   ├── components/     # Mobile UI components
│   │   ├── screens/        # App screens
│   │   ├── navigation/     # Navigation setup
│   │   ├── services/       # API & location services
│   │   ├── store/          # Mobile state management
│   │   └── utils/          # Mobile utilities
│   ├── app.json            # Expo configuration
│   └── package.json        # React Native dependencies
│
├── devops/                 # Infrastructure & Deployment
│   ├── docker/             # Docker configurations
│   ├── nginx/              # Nginx configuration
│   ├── scripts/            # Deployment scripts
│   └── k8s/                # Kubernetes manifests (optional)
│
├── docs/                   # Documentation
│   ├── api/                # API documentation
│   ├── deployment/         # Deployment guides
│   └── user-guide/         # User manuals
│
├── docker-compose.yml      # Local development setup
├── docker-compose.prod.yml # Production setup
└── README.md              # Project documentation
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/tracewing_db
POSTGRES_DB=tracewing_db
POSTGRES_USER=tracewing
POSTGRES_PASSWORD=your_password

# Django
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# JWT
JWT_SECRET_KEY=your-jwt-secret

# Email (for notifications)
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# AWS S3 (optional)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_STORAGE_BUCKET_NAME=tracewing-bucket

# Redis (for Celery)
REDIS_URL=redis://localhost:6379/0
```

#### Dashboard (.env)
```env
REACT_APP_API_BASE_URL=http://localhost:8000/api
REACT_APP_MAPBOX_TOKEN=your-mapbox-token
REACT_APP_ENVIRONMENT=development
```

#### Mobile (.env)
```env
EXPO_PUBLIC_API_BASE_URL=http://localhost:8000/api
EXPO_PUBLIC_MAPBOX_TOKEN=your-mapbox-token
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
python manage.py test
# Or with coverage
coverage run --source='.' manage.py test
coverage report
```

### Frontend Tests
```bash
cd dashboard
npm test
npm run test:coverage
```

### Mobile Tests
```bash
cd mobile
npm test
```

## 📋 API Documentation

The API documentation is automatically generated using Django REST Framework and available at:
- **Swagger UI**: http://localhost:8000/api/docs/
- **ReDoc**: http://localhost:8000/api/redoc/

### Key Endpoints
- `POST /api/auth/login/` - User authentication
- `GET /api/employees/` - List employees
- `POST /api/attendance/clock-in/` - Clock in employee
- `GET /api/geofences/` - List geofences
- `GET /api/payroll/` - Payroll data

## 🚀 Deployment

### Using Docker (Recommended)
```bash
# Build and deploy to production
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Deployment
1. **Backend**: Deploy Django app to Railway/Render
2. **Database**: Set up PostgreSQL with PostGIS on your cloud provider
3. **Frontend**: Deploy React app to Vercel/Netlify
4. **Mobile**: Build and publish to App Store/Google Play

### Environment-specific Configurations
- **Development**: Use `docker-compose.yml`
- **Staging**: Use `docker-compose.staging.yml`
- **Production**: Use `docker-compose.prod.yml`

## 🤝 Contributing

We welcome contributions to TraceWing! Please follow these guidelines:

### Development Process
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Coding Standards
- **Python**: Follow PEP 8, use Black for formatting
- **JavaScript/TypeScript**: Use ESLint + Prettier
- **Commit Messages**: Follow conventional commits format
- **Documentation**: Update relevant docs with your changes

### Testing Requirements
- Write unit tests for new features
- Ensure all tests pass before submitting PR
- Maintain or improve code coverage

### Code Review Process
1. All PRs require at least one review
2. Address all feedback before merging
3. Ensure CI/CD pipeline passes
4. Update documentation if needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 TraceWing

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📞 Support

- **Documentation**: [docs/](./docs/)
- **Issues**: [GitHub Issues](https://github.com/yourusername/tracewing/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/tracewing/discussions)
- **Email**: support@tracewing.com

## 🙏 Acknowledgments

- **PostGIS** for geospatial capabilities
- **Django REST Framework** for robust API development
- **React** and **React Native** communities
- **Tailwind CSS** for beautiful styling
- All contributors and the open-source community

---

**Made with ❤️ by the TraceWing Team** 