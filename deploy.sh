#!/bin/bash

# Iwanyu Platform Deployment Script

echo "🚀 Starting Iwanyu Platform Deployment"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if git is clean
if [[ -n $(git status --porcelain) ]]; then
    echo -e "${RED}❌ Git working directory is not clean. Please commit your changes first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Git working directory is clean${NC}"

# Push to main branch
echo -e "${YELLOW}📤 Pushing to main branch...${NC}"
git push origin main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Successfully pushed to main branch${NC}"
else
    echo -e "${RED}❌ Failed to push to main branch${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Deployment initiated!${NC}"
echo ""
echo "📋 Next Steps:"
echo "1. Check Render dashboard for backend deployment status"
echo "2. Check Vercel dashboard for frontend deployment status"
echo "3. Update environment variables in both platforms"
echo "4. Test the deployed applications"
echo ""
echo "🔗 Expected URLs:"
echo "Backend: https://iwanyu-backend-xxxx.onrender.com"
echo "Frontend: https://iwanyu-platform-xxxx.vercel.app"
echo ""
echo -e "${YELLOW}⏳ Deployment may take 5-10 minutes to complete${NC}"
