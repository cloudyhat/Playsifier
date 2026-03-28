@echo off
REM Playsifier Docker Setup Script for Windows

setlocal enabledelayedexpansion

echo.
echo 🚀 Playsifier Docker Setup
echo ==========================
echo.

REM Check Docker installation
echo 📋 Checking Docker installation...
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not installed. Please install Docker Desktop.
    echo   https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('docker --version') do set DOCKER_VERSION=%%i
echo ✓ Docker is installed: %DOCKER_VERSION%

REM Check Docker Compose
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Compose is not installed.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('docker-compose --version') do set COMPOSE_VERSION=%%i
echo ✓ Docker Compose is installed: %COMPOSE_VERSION%

REM Check for .env file
echo.
echo 📝 Checking environment configuration...
if not exist .env (
    echo    .env file not found, creating from .env.example...
    copy .env.example .env
    echo ✓ Created .env file
    echo.
    echo ⚠️  Please edit .env with your Spotify API credentials
    echo    Before continuing, update:
    echo    - SPOTIFY_CLIENT_ID
    echo    - SPOTIFY_CLIENT_SECRET
    echo    - SECRET_KEY
    echo.
    set /p CONTINUE="Press Enter to continue, or Ctrl+C to abort..."
    start notepad .env
    set /p CONTINUE="After saving .env, press Enter to continue..."
) else (
    echo ✓ .env file found
)

REM Build images
echo.
echo 🔨 Building Docker images...
docker-compose build
if errorlevel 1 (
    echo ❌ Failed to build images
    pause
    exit /b 1
)

REM Start services
echo.
echo 🚀 Starting services...
docker-compose up -d
if errorlevel 1 (
    echo ❌ Failed to start services
    pause
    exit /b 1
)

REM Wait for services
echo.
echo ⏳ Waiting for services to be ready...
timeout /t 10 /nobreak

REM Check service health
echo.
echo 📊 Service Status:
docker-compose ps

REM Show access information
echo.
echo ✅ Playsifier is running!
echo.
echo 📍 Access URLs:
echo    Frontend:        http://localhost:5173
echo    Backend API:     http://localhost:8000
echo    API Docs:        http://localhost:8000/docs
echo    Database:        localhost:5432
echo    Redis:           localhost:6379
echo.
echo 📖 Useful commands:
echo    View logs:       docker-compose logs -f
echo    Stop services:   docker-compose down
echo    Shell access:    docker-compose exec backend cmd
echo.
echo 📚 For more information, see DOCKER_DEPLOYMENT.md
echo.

pause
