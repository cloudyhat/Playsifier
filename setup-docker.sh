#!/bin/bash

# Playsifier Docker Setup Script
# This script sets up the environment and starts the application

set -e

echo "🚀 Playsifier Docker Setup"
echo "=========================="

# Check Docker installation
echo "📋 Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker Desktop."
    exit 1
fi
echo "✓ Docker is installed: $(docker --version)"

# Check Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed."
    exit 1
fi
echo "✓ Docker Compose is installed: $(docker-compose --version)"

# Check for .env file
echo ""
echo "📝 Checking environment configuration..."
if [ ! -f .env ]; then
    echo "   .env file not found, creating from .env.example..."
    cp .env.example .env
    echo "   ⚠️  Please edit .env with your Spotify API credentials"
    echo ""
    read -p "   Open .env file now? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        if command -v code &> /dev/null; then
            code .env
        elif command -v nano &> /dev/null; then
            nano .env
        fi
    fi
else
    echo "✓ .env file found"
fi

# Check if Spotify credentials are set
echo ""
echo "🔐 Validating configuration..."
if grep -q "your_spotify_client_id" .env; then
    echo "   ⚠️  Warning: Spotify credentials not configured"
    echo "   Please update SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env"
else
    echo "✓ Spotify credentials appear to be configured"
fi

# Build images
echo ""
echo "🔨 Building Docker images..."
docker-compose build

# Start services
echo ""
echo "🚀 Starting services..."
docker-compose up -d

# Wait for services
echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service health
echo ""
echo "📊 Service Status:"
docker-compose ps

# Show access information
echo ""
echo "✅ Playsifier is running!"
echo ""
echo "📍 Access URLs:"
echo "   Frontend:        http://localhost:5173"
echo "   Backend API:     http://localhost:8000"
echo "   API Docs:        http://localhost:8000/docs"
echo "   Database:        localhost:5432"
echo "   Redis:           localhost:6379"
echo ""
echo "📖 Useful commands:"
echo "   View logs:       docker-compose logs -f"
echo "   Stop services:   docker-compose down"
echo "   Shell access:    docker-compose exec backend /bin/bash"
echo ""
echo "📚 For more information, see DOCKER_DEPLOYMENT.md"
