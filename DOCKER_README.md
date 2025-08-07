# TraceWing Docker Setup

This document provides instructions for setting up and running the TraceWing monorepo using Docker and docker-compose.

## Prerequisites

- Docker Engine 20.10 or later
- Docker Compose 2.0 or later
- At least 4GB of available RAM
- At least 10GB of available disk space

## Project Structure

```
tracewing/
├── backend/              # Django 5.2 backend
├── dashboard/            # React 19 frontend with Vite
├── mobile/               # React Native with Expo
├── docker-compose.yml    # Main orchestration file
└── DOCKER_README.md      # This file
```

## Quick Start

1. **Clone and navigate to the project:**
   ```bash
   cd tracewing
   ```

2. **Copy environment files:**
   ```bash
   cp backend/env.example backend/.env
   cp dashboard/env.example dashboard/.env
   cp mobile/env.example mobile/.env
   ```

3. **Edit environment variables:**
   - Update `backend/.env` with your secret key and other settings
   - Modify API URLs in `dashboard/.env` and `mobile/.env` if needed

4. **Start all services (without mobile):**
   ```bash
   docker-compose up -d
   ```

5. **Start with mobile app:**
   ```bash
   docker-compose --profile mobile up -d
   ```

6. **Run database migrations:**
   ```bash
   docker-compose exec backend python manage.py migrate
   ```

7. **Create a superuser (optional):**
   ```bash
   docker-compose exec backend python manage.py createsuperuser
   ```

## Services Overview

### Core Services

| Service | Port | Description |
|---------|------|-------------|
| **backend** | 8000 | Django API server |
| **dashboard** | 3000 | React frontend |
| **db** | 5432 | PostgreSQL with PostGIS |
| **redis** | 6379 | Redis for caching and Celery |
| **celery** | - | Celery worker for background tasks |
| **celery-beat** | - | Celery scheduler |

### Optional Services

| Service | Port | Description |
|---------|------|-------------|
| **mobile** | 8081, 19000-19002 | React Native with Expo |

## Environment Configuration

### Backend (.env)

Key variables to configure:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DB_NAME=tracewing_db
DB_USER=tracewing_user
DB_PASSWORD=tracewing_password
REDIS_URL=redis://redis:6379/0
```

### Dashboard (.env)

```env
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
```

### Mobile (.env)

```env
EXPO_PUBLIC_API_URL=http://localhost:8000
EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
```

## Common Commands

### Starting Services

```bash
# Start core services (backend, frontend, database, redis)
docker-compose up -d

# Start all services including mobile
docker-compose --profile mobile up -d

# Start specific services
docker-compose up -d backend dashboard
```

### Stopping Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: This will delete all data)
docker-compose down -v
```

### Development Commands

```bash
# View logs
docker-compose logs -f backend
docker-compose logs -f dashboard

# Execute commands in containers
docker-compose exec backend python manage.py shell
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser

# Restart a specific service
docker-compose restart backend
```

### Database Operations

```bash
# Run migrations
docker-compose exec backend python manage.py migrate

# Create migrations
docker-compose exec backend python manage.py makemigrations

# Load fixtures
docker-compose exec backend python manage.py loaddata fixture_name

# Access PostgreSQL shell
docker-compose exec db psql -U tracewing_user -d tracewing_db
```

### Celery Operations

```bash
# View Celery worker status
docker-compose exec celery celery -A tracewing status

# Purge Celery tasks
docker-compose exec celery celery -A tracewing purge

# Monitor Celery tasks
docker-compose exec celery celery -A tracewing monitor
```

## Hot Reloading

All services are configured for hot reloading during development:

- **Backend**: Django's development server automatically reloads on code changes
- **Dashboard**: Vite's HMR (Hot Module Replacement) updates the browser instantly
- **Mobile**: Expo's Fast Refresh updates the app on device/simulator

## Troubleshooting

### Common Issues

1. **Port conflicts:**
   ```bash
   # Check which process is using a port
   lsof -i :8000
   
   # Kill the process
   kill -9 <PID>
   ```

2. **Database connection errors:**
   ```bash
   # Check if PostgreSQL is running
   docker-compose ps db
   
   # View database logs
   docker-compose logs db
   ```

3. **Redis connection errors:**
   ```bash
   # Test Redis connection
   docker-compose exec redis redis-cli ping
   ```

4. **Permission issues:**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

### Rebuilding Services

```bash
# Rebuild all services
docker-compose build

# Rebuild specific service
docker-compose build backend

# Rebuild without cache
docker-compose build --no-cache
```

### Cleaning Up

```bash
# Remove stopped containers
docker-compose rm

# Remove all unused Docker resources
docker system prune -a

# Remove volumes (WARNING: This deletes all data)
docker-compose down -v
docker volume prune
```

## Production Considerations

For production deployment, consider:

1. **Environment Variables:**
   - Set `DEBUG=False` in backend
   - Use strong secret keys
   - Configure proper database credentials

2. **Security:**
   - Update `ALLOWED_HOSTS` in Django settings
   - Use HTTPS with proper SSL certificates
   - Configure proper CORS settings

3. **Performance:**
   - Use production-grade database (managed PostgreSQL)
   - Configure Redis for production
   - Set up proper logging and monitoring

4. **Scaling:**
   - Use multiple Celery workers
   - Configure load balancing
   - Use CDN for static files

## Monitoring and Logs

```bash
# View all logs
docker-compose logs

# Follow logs for specific service
docker-compose logs -f backend

# View last 50 lines
docker-compose logs --tail=50 backend
```

## Health Checks

The docker-compose configuration includes health checks for:
- PostgreSQL database
- Redis cache

Services will wait for dependencies to be healthy before starting.

## Support

For issues and questions:
1. Check the logs using `docker-compose logs <service>`
2. Verify environment configuration
3. Ensure all required ports are available
4. Check Docker and docker-compose versions 