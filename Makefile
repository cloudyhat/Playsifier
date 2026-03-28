.PHONY: help build up down logs shell-backend shell-frontend db-dump db-restore clean rebuild

help:
	@echo "Playsifier Docker Commands:"
	@echo "  make up                - Start all services"
	@echo "  make down              - Stop all services"
	@echo "  make build             - Build images"
	@echo "  make rebuild           - Rebuild images from scratch"
	@echo "  make logs              - View logs (all services)"
	@echo "  make logs-backend      - View backend logs"
	@echo "  make logs-frontend     - View frontend logs"
	@echo "  make ps                - List running containers"
	@echo "  make shell-backend     - Open bash in backend container"
	@echo "  make shell-frontend    - Open sh in frontend container"
	@echo "  make db-dump           - Backup database"
	@echo "  make db-restore        - Restore database from backup.sql"
	@echo "  make clean             - Remove containers and volumes"
	@echo "  make test              - Run backend tests"
	@echo "  make lint-backend      - Lint backend code"
	@echo "  make lint-frontend     - Lint frontend code"

up:
	docker-compose up -d
	@echo "✓ All services started"

down:
	docker-compose down
	@echo "✓ All services stopped"

build:
	docker-compose build

rebuild:
	docker-compose build --no-cache

logs:
	docker-compose logs -f

logs-backend:
	docker-compose logs -f backend

logs-frontend:
	docker-compose logs -f frontend

ps:
	docker-compose ps

shell-backend:
	docker-compose exec backend /bin/bash

shell-frontend:
	docker-compose exec frontend /bin/sh

db-dump:
	docker-compose exec postgres pg_dump -U ${DB_USER} ${DB_NAME} > backup.sql
	@echo "✓ Database backed up to backup.sql"

db-restore:
	docker-compose exec -T postgres psql -U ${DB_USER} ${DB_NAME} < backup.sql
	@echo "✓ Database restored from backup.sql"

clean:
	docker-compose down -v
	@echo "✓ Containers and volumes removed"

test:
	docker-compose exec backend pytest

lint-backend:
	docker-compose exec backend pylint backend/

lint-frontend:
	docker-compose exec frontend npm run lint

env-check:
	@if [ ! -f .env ]; then \
		echo "✗ .env file not found"; \
		echo "  Creating from .env.example..."; \
		cp .env.example .env; \
		echo "✓ Created .env - please update with your credentials"; \
	else \
		echo "✓ .env file exists"; \
	fi
