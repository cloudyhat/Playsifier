#!/bin/bash

# Pre-deployment Docker checklist
# Run this script to verify your Docker setup is ready

set -e

echo "🔍 Playsifier Docker Deployment Checklist"
echo "=========================================="
echo ""

FAILED=0
SUCCESS=0

# Check 1: Docker installed
echo -n "✓ Checking Docker installation... "
if command -v docker &> /dev/null; then
    echo "✓"
    ((SUCCESS++))
else
    echo "✗ FAILED - Docker not installed"
    ((FAILED++))
fi

# Check 2: Docker Compose installed
echo -n "✓ Checking Docker Compose... "
if command -v docker-compose &> /dev/null; then
    echo "✓"
    ((SUCCESS++))
else
    echo "✗ FAILED - Docker Compose not installed"
    ((FAILED++))
fi

# Check 3: .env file exists
echo -n "✓ Checking .env file... "
if [ -f .env ]; then
    echo "✓"
    ((SUCCESS++))
else
    echo "✗ FAILED - .env file not found"
    echo "  Run: cp .env.example .env"
    ((FAILED++))
fi

# Check 4: docker-compose.yml exists
echo -n "✓ Checking docker-compose.yml... "
if [ -f docker-compose.yml ]; then
    echo "✓"
    ((SUCCESS++))
else
    echo "✗ FAILED - docker-compose.yml not found"
    ((FAILED++))
fi

# Check 5: Backend files
echo -n "✓ Checking backend/Dockerfile... "
if [ -f backend/Dockerfile ]; then
    echo "✓"
    ((SUCCESS++))
else
    echo "✗ FAILED - backend/Dockerfile not found"
    ((FAILED++))
fi

# Check 6: Frontend files
echo -n "✓ Checking frontend/Dockerfile... "
if [ -f frontend/Dockerfile ]; then
    echo "✓"
    ((SUCCESS++))
else
    echo "✗ FAILED - frontend/Dockerfile not found"
    ((FAILED++))
fi

# Check 7: backend/requirements.txt
echo -n "✓ Checking backend/requirements.txt... "
if [ -f backend/requirements.txt ]; then
    echo "✓"
    ((SUCCESS++))
else
    echo "✗ FAILED - backend/requirements.txt not found"
    ((FAILED++))
fi

# Check 8: frontend/package.json
echo -n "✓ Checking frontend/package.json... "
if [ -f frontend/package.json ]; then
    echo "✓"
    ((SUCCESS++))
else
    echo "✗ FAILED - frontend/package.json not found"
    ((FAILED++))
fi

# Check 9: Spotify credentials configured
echo -n "✓ Checking Spotify Configuration... "
if grep -q "SPOTIFY_CLIENT_ID=" .env && grep -q "SPOTIFY_CLIENT_SECRET=" .env; then
    if ! grep -q "your_spotify" .env; then
        echo "✓"
        ((SUCCESS++))
    else
        echo "⚠ WARNING - Spotify credentials not configured"
        ((FAILED++))
    fi
else
    echo "✗ FAILED - Spotify configuration missing"
    ((FAILED++))
fi

# Check 10: SECRET_KEY configured
echo -n "✓ Checking SECRET_KEY... "
if grep -q "SECRET_KEY=" .env && ! grep -q "SECRET_KEY=your-super" .env; then
    echo "✓"
    ((SUCCESS++))
else
    echo "⚠ WARNING - SECRET_KEY not configured"
    ((FAILED++))
fi

echo ""
echo "=========================================="
echo "Results: $SUCCESS passed, $FAILED failed"
echo "=========================================="
echo ""

if [ $FAILED -gt 0 ]; then
    echo "❌ Some checks failed. Please fix the issues above."
    exit 1
else
    echo "✅ All checks passed! You're ready to deploy."
    echo ""
    echo "Next steps:"
    echo "1. Run: docker-compose up -d"
    echo "2. Visit: http://localhost:5173"
    exit 0
fi
