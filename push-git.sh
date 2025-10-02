#!/bin/bash

# Automated Git Push with Dist Folder Update
# Usage: ./push-git.sh [commit_message]

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Wedding Website Git Push with Dist Update${NC}"
echo "=============================================="

# Step 1: Update dist folder with latest changes
echo -e "${BLUE}📁 Updating dist folder with latest changes...${NC}"

# Create dist directory structure if it doesn't exist
mkdir -p dist/images/gallery

# Copy all latest files to dist
cp index.html styles.css script.js manifest.json sw.js package.json dist/ 2>/dev/null
cp -r images/* dist/images/ 2>/dev/null

echo -e "${GREEN}✅ Dist folder updated with latest files${NC}"

# Step 2: Check git status
echo -e "${BLUE}📊 Checking git status...${NC}"
git status --short

# Step 3: Add all changes (including dist folder)
echo -e "${BLUE}📁 Adding all changes to git...${NC}"
git add .

# Step 4: Get commit message
if [ -z "$1" ]; then
    # Auto-generate commit message based on changes
    CHANGES=$(git diff --cached --name-only | head -3 | tr '\n' ', ' | sed 's/,$//')
    COMMIT_MSG="Update website: $CHANGES"
else
    COMMIT_MSG="$1"
fi

echo -e "${BLUE}💬 Commit message: ${YELLOW}$COMMIT_MSG${NC}"

# Step 5: Commit changes
echo -e "${BLUE}💾 Committing changes...${NC}"
git commit -m "$COMMIT_MSG"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Changes committed successfully${NC}"
else
    echo -e "${RED}❌ Commit failed${NC}"
    exit 1
fi

# Step 6: Check if remote exists
if ! git remote | grep -q origin; then
    echo -e "${YELLOW}⚠️  No remote origin found.${NC}"
    echo -e "${BLUE}Please add your GitHub repository URL:${NC}"
    echo -e "${YELLOW}git remote add origin https://github.com/yourusername/your-repo.git${NC}"
    exit 1
fi

# Step 7: Push to remote
echo -e "${BLUE}🚀 Pushing to remote repository...${NC}"
git push origin main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Successfully pushed to remote repository${NC}"
    echo -e "${BLUE}🌐 Your changes are now live on GitHub!${NC}"
    echo -e "${GREEN}📁 Dist folder is updated and ready for deployment${NC}"
else
    echo -e "${RED}❌ Push failed${NC}"
    echo -e "${YELLOW}💡 Try: git push -u origin main${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Git push with dist update completed successfully!${NC}"
