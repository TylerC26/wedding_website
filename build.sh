#!/bin/bash

# Generate cache busting version
# Using timestamp ensures each build gets a unique version for cache invalidation
CACHE_VERSION=$(date +%s)

echo "Copying files to dist directory..."
mkdir -p dist

# Copy files first
cp -r styles.css script.js manifest.json sw.js images dist/ 2>/dev/null || true

# Copy index.html and replace cache version for both CSS and JS
# Replace any existing version parameter with the new timestamp
sed -e "s/styles\.css?v=[0-9]*/styles.css?v=${CACHE_VERSION}/g" \
    -e "s/script\.js?v=[0-9]*/script.js?v=${CACHE_VERSION}/g" \
    index.html > dist/index.html

echo "Build complete - dist directory ready"
echo "Cache version: ${CACHE_VERSION}"
