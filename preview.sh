#!/bin/bash

# Generate random port between 46000-46999
PORT=$((46000 + RANDOM % 1000))

# Kill any existing Python HTTP servers
pkill -f "python3 -m http.server" 2>/dev/null

# Start server on random port
echo "Starting server on port $PORT..."
python3 -m http.server $PORT &

# Wait a moment for server to start
sleep 2

# Open in browser
echo "Opening browser at http://localhost:$PORT"
open "http://localhost:$PORT"

echo "Preview ready at http://localhost:$PORT"
