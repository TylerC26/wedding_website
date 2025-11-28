#!/bin/bash

# Generate cache busting version
# Using date format YYYYMMDDHHMMSS for readability, or git commit hash if available
if command -v git &> /dev/null && git rev-parse --git-dir > /dev/null 2>&1; then
    VERSION=$(git rev-parse --short HEAD)
else
    VERSION=$(date +%Y%m%d%H%M%S)
fi

echo "Copying files to dist directory..."
mkdir -p dist

# Copy files first
cp -r styles.css script.js manifest.json sw.js images soundtrack dist/ 2>/dev/null || true

# Copy index.html and replace cache version for both CSS and JS
# Replace existing version parameter with new version
sed -e "s|href=\"styles\.css?v=[^\"]*\"|href=\"styles.css?v=$VERSION\"|g" \
    -e "s|src=\"script\.js?v=[^\"]*\"|src=\"script.js?v=$VERSION\"|g" \
    index.html > dist/index.html

echo "Build complete - dist directory ready"
echo "Cache version: $VERSION"
