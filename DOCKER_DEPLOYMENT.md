# Playsifier Docker Deployment Guide

This guide explains how to deploy Playsifier using Docker and Docker Compose.

## Prerequisites

- **Docker**: [Install Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Docker Compose**: Included with Docker Desktop

Verify installation:
```bash
docker --version
docker-compose --version
```

## Quick Start

### 1. Clone and Setup Environment Variables

```bash
# Navigate to project root
cd Playsifier

# Create .env file from example
cp .env.example .env
```

### 2. Configure Environment Variables

Edit `.env` and add your credentials:

```env
# Spotify API credentials (get from https://developer.spotify.com/dashboard)
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:8000/auth/callback

# Generate a secure SECRET_KEY (Python)
# python -c "import secrets; print(secrets.token_urlsafe(32))"
SECRET_KEY=your_generated_secret_key

# Database credentials (customize as needed)
DB_USER=playsifier
DB_PASSWORD=secure_password_here
DB_NAME=playsifier_db

# Additional settings
USE_DB=true
VITE_API_URL=http://localhost:8000
```

### 3. Start Services

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 4. Access Applications

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Database**: localhost:5432
- **Redis**: localhost:6379

## Services Overview

### Backend (FastAPI)
- **Port**: 8000
- **Entry Point**: [backend/main.py](../backend/main.py)
- **Framework**: FastAPI with Uvicorn
- **Dependencies**: PostgreSQL, Redis

### Frontend (React + Vite)
- **Port**: 5173
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS

### Database (PostgreSQL)
- **Port**: 5432
- **Image**: postgres:16-alpine
- **Persistence**: `postgres_data` volume

### Cache (Redis)
- **Port**: 6379
- **Image**: redis:7-alpine
- **Persistence**: `redis_data` volume

## Development Mode

The current `docker-compose.yml` is configured for development with:
- Live code reload (volumes)
- `npm run dev` for frontend
- Uvicorn reload for backend

```bash
# Development start
docker-compose up

# View real-time logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

## Production Deployment

For production deployment, you'll need to update the configuration:

### 1. Update docker-compose.yml (Production Mode)

```yaml
backend:
  command: gunicorn backend.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
  # Remove volumes for code
  # Remove --reload flags

frontend:
  build:
    args:
      - VITE_API_URL=https://your-domain.com/api
  command: npm run build && npm run preview
```

### 2. Build and Deploy

```bash
# Build production images
docker-compose -f docker-compose.yml build

# Push to registry (if using)
docker tag playsifier-backend:latest your-registry/playsifier-backend:latest
docker push your-registry/playsifier-backend:latest

# Deploy on server
docker-compose pull
docker-compose up -d
```

### 3. Environment Variables (Production)

Create a `.env.production` file with production values:
- Use strong `SECRET_KEY`
- Change `DB_PASSWORD`
- Update `SPOTIFY_REDIRECT_URI` to production domain
- Update `VITE_API_URL` to production API endpoint
- Set `--read-only` root filesystem for security

## Useful Docker Commands

```bash
# View running containers
docker-compose ps

# Execute command in container
docker-compose exec backend python -c "..."

# View container logs
docker-compose logs backend -f --tail 50

# Restart a service
docker-compose restart backend

# Remove containers and volumes
docker-compose down -v

# Clean up unused Docker resources
docker system prune -a

# Bash into running container
docker-compose exec backend /bin/bash
docker-compose exec frontend /bin/sh
```

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process using port
# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -i :8000
kill -9 <PID>
```

### Database Connection Issues
```bash
# Check database health
docker-compose exec postgres pg_isready -U playsifier

# View database logs
docker-compose logs postgres
```

### Frontend Not Loading
```bash
# Clear node_modules and reinstall
docker-compose down
rm -rf frontend/node_modules
docker-compose up --build
```

### Check Container Resource Usage
```bash
docker stats
```

## Health Checks

Services have health checks configured:
- **PostgreSQL**: Checks every 10s via `pg_isready`
- **Redis**: Checks every 10s via `redis-cli ping`
- **Backend**: Checks FastAPI docs endpoint every 30s

```bash
# View health status
docker-compose ps
```

## Volume Management

Data persistence:
```bash
# List volumes
docker volume ls | grep playsifier

# Backup database
docker-compose exec postgres pg_dump -U playsifier playsifier_db > backup.sql

# Restore database
docker-compose exec -T postgres psql -U playsifier playsifier_db < backup.sql
```

## Next Steps

1. **Setup CI/CD Pipeline**: Use GitHub Actions or GitLab CI for automated builds
2. **Use Docker Registry**: Push images to Docker Hub, ECR, or private registry
3. **Orchestration**: Use Kubernetes, Docker Swarm, or cloud platforms
4. **Monitoring**: Add Prometheus and Grafana for monitoring
5. **Logging**: Configure centralized logging with ELK Stack

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [FastAPI Deployment Guide](https://fastapi.tiangolo.com/deployment/)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)
