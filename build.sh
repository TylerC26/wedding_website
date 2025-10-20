#!/bin/bash
echo "Copying files to dist directory..."
mkdir -p dist
cp -r index.html styles.css script.js manifest.json sw.js images dist/ 2>/dev/null || true
echo "Build complete - dist directory ready"
