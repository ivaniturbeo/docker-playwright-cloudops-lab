#!/bin/bash

set -e

echo "=== FULL RELEASE VALIDATION ==="

echo "1. Resetting environment..."
docker compose down -v

echo "2. Starting services..."
docker compose up -d

echo "Waiting for services to stabilize..."
sleep 5

echo "3. Running smoke checks..."
bash ops/smoke-check.sh

echo "4. Running backend tests..."
docker compose exec backend npm test

echo "5. Running E2E tests..."
npx playwright test

echo "=== RELEASE VALIDATION PASSED ==="