#!/bin/bash
# Production-grade startup script for travel-application
# Usage: nohup ./start.sh > server.log 2>&1 &

set -e

# Load production environment
if [ -f server/.env ]; then
  export $(grep -v '^#' server/.env | xargs)
fi

echo "[INFO] Starting Travel Application in $NODE_ENV mode..."

# Build client if production
if [ "$NODE_ENV" = "production" ]; then
  echo "[INFO] Building client..."
  npm run build --prefix client
fi

# Start server
npm start --prefix server
