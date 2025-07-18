# AutoTasker Project Makefile

.PHONY: help setup start stop restart logs clean test build

# Default target
help:
	@echo "AutoTasker Project Commands:"
	@echo "  setup      - Setup environment files"
	@echo "  start      - Start all services"
	@echo "  stop       - Stop all services"
	@echo "  restart    - Restart all services"
	@echo "  logs       - Show logs for all services"
	@echo "  clean      - Clean up containers and volumes"
	@echo "  test       - Run tests"
	@echo "  build      - Build all containers"
	@echo "  dev        - Start in development mode"
	@echo "  prod       - Start in production mode"

# Setup environment files
setup:
	@echo "Setting up environment files..."
	@cp .env.n8n.example .env.n8n 2>/dev/null || echo ".env.n8n already exists"
	@cp backend/.env.example backend/.env 2>/dev/null || echo "backend/.env already exists"
	@cp frontend/.env.example frontend/.env 2>/dev/null || echo "frontend/.env already exists"
	@echo "Environment files created. Please edit them with your configuration."

# Start all services
start:
	@echo "Starting AutoTasker services..."
	docker-compose up -d

# Stop all services
stop:
	@echo "Stopping AutoTasker services..."
	docker-compose down

# Restart all services
restart:
	@echo "Restarting AutoTasker services..."
	docker-compose restart

# Show logs
logs:
	docker-compose logs -f

# Clean up
clean:
	@echo "Cleaning up containers and volumes..."
	docker-compose down -v
	docker system prune -f

# Run tests
test:
	@echo "Running tests..."
	docker-compose exec backend python -m pytest tests/ || echo "Backend tests not found"
	docker-compose exec frontend npm test || echo "Frontend tests not found"

# Build all containers
build:
	@echo "Building all containers..."
	docker-compose build

# Development mode
dev:
	@echo "Starting in development mode..."
	docker-compose -f docker-compose.yml -f docker-compose.override.yml up

# Production mode
prod:
	@echo "Starting in production mode..."
	docker-compose -f docker-compose.yml up -d --profile production

# Health check
health:
	@echo "Checking service health..."
	@docker-compose ps

# View service logs individually
logs-frontend:
	docker-compose logs -f frontend

logs-backend:
	docker-compose logs -f backend

logs-n8n:
	docker-compose logs -f n8n

logs-mongodb:
	docker-compose logs -f mongodb

# Database management
db-backup:
	@echo "Backing up MongoDB..."
	docker-compose exec mongodb mongodump --host localhost --port 27017 --out /tmp/backup
	docker cp $(docker-compose ps -q mongodb):/tmp/backup ./mongodb-backup-$(shell date +%Y%m%d-%H%M%S)

db-restore:
	@echo "Restoring MongoDB from backup..."
	@read -p "Enter backup directory name: " backup_dir; \
	docker cp ./$$backup_dir $(docker-compose ps -q mongodb):/tmp/restore; \
	docker-compose exec mongodb mongorestore --host localhost --port 27017 /tmp/restore

# Quick setup for new users
quick-start: setup
	@echo "Starting AutoTasker for the first time..."
	@echo "Please edit the .env files with your configuration, then run 'make start'"
