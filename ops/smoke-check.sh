#!/bin/bash

set -e

echo "=== Release Smoke Validation ==="

echo "1. Checking running containers..."
docker compose ps

echo "2. Checking frontend endpoint..."
curl -f http://localhost > /dev/null
echo "Frontend OK"

echo "3. Checking backend health..."
docker compose exec backend curl -f http://localhost:3000/health > /dev/null
echo "Backend health OK"

echo "4. Checking MySQL container..."
docker compose exec mysql mysqladmin ping -h localhost --silent
echo "MySQL OK"

echo "=== Smoke Validation Passed ==="