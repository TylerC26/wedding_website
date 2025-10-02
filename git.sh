#!/bin/bash

# Git Workflow Script for Wedding Website
# Usage: ./git.sh [commit_message]

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Wedding Website Git Workflow${NC}"
echo "=================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}⚠️  Git not initialized. Initializing...${NC}"
    git init
    echo -e "${GREEN}✅ Git repository initialized${NC}"
fi

# Check git status
echo -e "${BLUE}📊 Checking git status...${NC}"
git status --short

# Add all changes
echo -e "${BLUE}📁 Adding all changes...${NC}"
git add .

# Get commit message
if [ -z "$1" ]; then
    # Auto-generate commit message based on changes
    CHANGES=$(git diff --cached --name-only | head -3 | tr '\n' ', ' | sed 's/,$//')
    COMMIT_MSG="Update wedding website: $CHANGES"
else
    COMMIT_MSG="$1"
fi

echo -e "${BLUE}💬 Commit message: ${YELLOW}$COMMIT_MSG${NC}"

# Commit changes
echo -e "${BLUE}💾 Committing changes...${NC}"
git commit -m "$COMMIT_MSG"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Changes committed successfully${NC}"
else
    echo -e "${RED}❌ Commit failed${NC}"
    exit 1
fi

# Check if remote exists
if ! git remote | grep -q origin; then
    echo -e "${YELLOW}⚠️  No remote origin found.${NC}"
    echo -e "${BLUE}Please add your GitHub repository URL:${NC}"
    echo -e "${YELLOW}git remote add origin https://github.com/yourusername/your-repo.git${NC}"
    exit 1
fi

# Push to remote
echo -e "${BLUE}🚀 Pushing to remote repository...${NC}"
git push origin main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Successfully pushed to remote repository${NC}"
    echo -e "${BLUE}🌐 Your changes are now live on GitHub!${NC}"
else
    echo -e "${RED}❌ Push failed${NC}"
    echo -e "${YELLOW}💡 Try: git push -u origin main${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Git workflow completed successfully!${NC}"
