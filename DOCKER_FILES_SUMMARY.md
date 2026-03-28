# Docker Files Summary

This document explains all Docker-related files added to the Playsifier project.

## Files Created

### Core Docker Configuration

1. **`docker-compose.yml`** (Main orchestration file)
   - Development configuration with live reloading
   - Services: PostgreSQL, Redis, Backend (FastAPI), Frontend (React)
   - All services use health checks
   - Proper networking between services
   - Volume mounts for code changes
   - Used by default (just run `docker-compose up`)

2. **`docker-compose.prod.yml`** (Production configuration)
   - For production deployments
   - No volume mounts for code
   - Services restart always
   - Health checks with extended wait times
   - Logging configuration
   - Use with: `docker-compose -f docker-compose.prod.yml up -d`

### Dockerfiles

3. **`backend/Dockerfile`**
   - Python 3.11 slim image
   - FastAPI application
   - Uses Gunicorn with Uvicorn workers for production
   - Includes health check
   - ~300MB final image size

4. **`frontend/Dockerfile`**
   - Multi-stage build for development and production
   - Node 20 Alpine image
   - Development stage: runs `npm run dev`
   - Production stage: builds and serves the app with `serve`
   - Optimized for different deployment scenarios

### Ignore Files

5. **`backend/.dockerignore`**
   - Excludes Python cache, virtual environments
   - Excludes git and local config files
   - Reduces Docker build context

6. **`frontend/.dockerignore`**
   - Excludes node_modules, build artifacts
   - Excludes git and local config files
   - Reduces Docker build context

### Configuration & Setup

7. **`.env.example`**
   - Template for environment variables
   - Copy this to `.env` and fill in your values
   - Required before running docker-compose

8. **`Makefile`** (Linux/Mac)
   - Convenient commands for Docker operations
   - `make up`, `make down`, `make logs`, etc.
   - `make help` to see all commands

9. **`setup-docker.sh`** (Linux/Mac)
   - Automated setup script
   - Checks Docker installation
   - Creates .env file if needed
   - Builds and starts all services
   - Run with: `./setup-docker.sh`

10. **`setup-docker.bat`** (Windows)
    - PowerShell-equivalent setup script for Windows
    - Same functionality as setup-docker.sh
    - Run with: `setup-docker.bat`

### GitHub Actions

11. **`.github/workflows/docker-build.yml`**
    - CI/CD pipeline for automated Docker builds
    - Builds and pushes to Docker Hub
    - Requires DOCKER_USERNAME and DOCKER_PASSWORD secrets
    - Runs tests in Docker

### Documentation

12. **`DOCKER_DEPLOYMENT.md`**
    - Comprehensive deployment guide
    - Configuration instructions
    - Command reference
    - Troubleshooting tips
    - Production deployment strategies

13. **`README.md`** (Updated)
    - Added Docker quick start section
    - Points to DOCKER_DEPLOYMENT.md

14. **`backend/core/config.py`** (Updated)
    - Added DATABASE_URL environment variable support
    - Added REDIS_URL environment variable support
    - Now works seamlessly with Docker Compose

## Quick Start

### Windows Users
```bash
setup-docker.bat
```

### Linux/Mac Users
```bash
chmod +x setup-docker.sh
./setup-docker.sh
```

### Manual Setup
```bash
# 1. Create .env from template
cp .env.example .env

# 2. Edit .env with your Spotify credentials
# Edit .env file...

# 3. Build and start services
docker-compose up -d

# 4. Check status
docker-compose ps
```

## Service Details

### PostgreSQL
- **Image**: postgres:16-alpine
- **Port**: 5432
- **Default Creds**: playsifier/playsifier_db_password
- **Volume**: postgres_data

### Redis
- **Image**: redis:7-alpine
- **Port**: 6379
- **Volume**: redis_data

### Backend (FastAPI)
- **Port**: 8000
- **URL**: http://localhost:8000
- **Docs**: http://localhost:8000/docs
- **Live Reload**: Enabled (with uvicorn --reload)

### Frontend (React)
- **Port**: 5173
- **URL**: http://localhost:5173
- **Dev Server**: Vite dev server with HMR

## Important Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Rebuild images
docker-compose build --no-cache

# Access backend shell
docker-compose exec backend /bin/bash

# Access frontend shell
docker-compose exec frontend /bin/sh

# Run database migrations
docker-compose exec backend alembic upgrade head

# View database
docker-compose exec postgres psql -U playsifier -d playsifier_db
```

## Troubleshooting

### Port conflicts
If ports 8000 or 5173 are already in use:
- Change the port in docker-compose.yml
- Or kill the process using the port

### Changes not reflecting
- Make sure volumes are mounted correctly in docker-compose.yml
- For Python changes: restart with `docker-compose restart backend`
- For Node changes: should auto-reload via Vite HMR

### Database connection issues
- Check if postgres service is healthy: `docker-compose ps`
- View postgres logs: `docker-compose logs postgres`
- Verify DATABASE_URL in backend environment

### Frontend not connecting to backend
- Check CORS settings in backend/main.py
- Verify VITE_API_URL contains the correct backend URL
- Check frontend api.js for correct endpoint

## Production Deployment

For production deployment:

1. Build images with the production Dockerfile stages
2. Push to Docker registry (Docker Hub, ECR, etc.)
3. Use `docker-compose.prod.yml` on production server
4. Set up proper environment variables
5. Use a reverse proxy (Nginx, Traefik)
6. Set up SSL/TLS certificates
7. Monitor with logging and metrics

See DOCKER_DEPLOYMENT.md for detailed production instructions.

## Next Steps

1. Run setup-docker script or `docker-compose up`
2. Access frontend at http://localhost:5173
3. Configure Spotify OAuth credentials
4. Test the application
5. Refer to DOCKER_DEPLOYMENT.md for production deployment

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Docs](https://docs.docker.com/compose/)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
- [Vite Build Features](https://vitejs.dev/guide/build.html)
