.PHONY: help build up down logs shell migrate createsuperuser test clean

# Default target
help:
	@echo "TraceWing Docker Development Commands"
	@echo "===================================="
	@echo "build          - Build all Docker images"
	@echo "up             - Start all services (without mobile)"
	@echo "up-mobile      - Start all services including mobile"
	@echo "down           - Stop all services"
	@echo "logs           - View logs for all services"
	@echo "logs-backend   - View backend logs"
	@echo "logs-frontend  - View frontend logs"
	@echo "shell          - Access Django shell"
	@echo "bash           - Access backend container bash"
	@echo "migrate        - Run Django migrations"
	@echo "makemigrations - Create Django migrations"
	@echo "createsuperuser- Create Django superuser"
	@echo "collectstatic  - Collect Django static files"
	@echo "test           - Run backend tests"
	@echo "clean          - Remove containers and volumes"
	@echo "restart        - Restart all services"
	@echo "status         - Show container status"

# Build all images
build:
	docker compose build

# Start services without mobile
up:
	docker compose up -d

# Start all services including mobile
up-mobile:
	docker compose --profile mobile up -d

# Stop all services
down:
	docker compose down

# View logs
logs:
	docker compose logs -f

logs-backend:
	docker compose logs -f backend

logs-frontend:
	docker compose logs -f dashboard

logs-mobile:
	docker compose logs -f mobile

# Access Django shell
shell:
	docker-compose exec backend python manage.py shell

# Access backend container bash
bash:
	docker compose exec backend bash

# Database operations
migrate:
	docker compose exec backend python manage.py migrate

makemigrations:
	docker compose exec backend python manage.py makemigrations

# Create superuser
createsuperuser:
	docker compose exec backend python manage.py createsuperuser

# Collect static files
collectstatic:
	docker compose exec backend python manage.py collectstatic --noinput

# Run tests
test:
	docker compose exec backend python manage.py test

# Clean up
clean:
	docker compose down -v
	docker system prune -f

# Restart services
restart:
	docker compose restart

# Show status
status:
	docker compose ps

# Initialize project (first time setup)
init:
	@echo "Setting up TraceWing for the first time..."
	@if [ ! -f backend/.env ]; then cp backend/env.example backend/.env; echo "Created backend/.env"; fi
	@if [ ! -f dashboard/.env ]; then cp dashboard/env.example dashboard/.env; echo "Created dashboard/.env"; fi
	@if [ ! -f mobile/.env ]; then cp mobile/env.example mobile/.env; echo "Created mobile/.env"; fi
	docker compose build
	docker compose up -d
	@echo "Waiting for services to start..."
	sleep 10
	docker compose exec backend python manage.py migrate
	@echo "TraceWing is ready! Visit http://localhost:3000 for the dashboard"
	@echo "Backend API is available at http://localhost:8000"

# Development helpers
dev-backend:
	docker compose up -d db redis
	docker compose logs -f backend

dev-frontend:
	docker compose up -d backend
	docker compose logs -f dashboard

# Database helpers
db-shell:
	docker compose exec db psql -U tracewing_user -d tracewing_db

db-backup:
	docker compose exec db pg_dump -U tracewing_user tracewing_db > backup.sql

db-restore:
	docker compose exec -T db psql -U tracewing_user -d tracewing_db < backup.sql 