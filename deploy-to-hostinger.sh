#!/bin/bash

# Deploy to Hostinger Script
# Builds the app and pushes ONLY dist/ contents to deploy branch

set -e

echo "🚀 Starting deployment..."

# Build
echo "📦 Building..."
npm run build

# Verify build
if [ ! -d "dist" ]; then
    echo "❌ Build failed"
    exit 1
fi

# Save current branch
CURRENT_BRANCH=$(git branch --show-current)

# Delete old deploy branch if exists
git branch -D deploy 2>/dev/null || true

# Create fresh orphan deploy branch
echo "🌿 Creating deploy branch..."
git checkout --orphan deploy

# Remove all files from git
git rm -rf . 2>/dev/null || true

# Clean working directory (keep only .git)
find . -mindepth 1 -maxdepth 1 ! -name '.git' ! -name '.' ! -name '..' -exec rm -rf {} + 2>/dev/null || true

# Copy only dist contents to root
echo "📋 Copying built files..."
cp dist/index.html . 2>/dev/null || {
    # Files were deleted, need to get them from main branch
    git checkout $CURRENT_BRANCH -- dist/
    cp dist/index.html .
    cp dist/.htaccess .
    cp dist/robots.txt .
    cp dist/sitemap.xml .
    cp -r dist/assets .
    rm -rf dist/
    exit 0
}
cp dist/.htaccess .
cp dist/robots.txt .
cp dist/sitemap.xml .
cp -r dist/assets .

# Stage files
git add index.html .htaccess robots.txt sitemap.xml assets/

# Commit
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
git commit -m "Deploy: $TIMESTAMP

Production build from $CURRENT_BRANCH

Files included:
- index.html
- .htaccess
- robots.txt
- sitemap.xml
- assets/

🤖 Automated deployment"

# Push (force push since it's an orphan branch)
echo "🚀 Pushing to GitHub..."
git push -f origin deploy

# Return to main branch
echo "↩️  Returning to $CURRENT_BRANCH..."
git checkout $CURRENT_BRANCH

echo ""
echo "✅ SUCCESS! Deploy branch updated"
echo ""
echo "📋 Hostinger Setup:"
echo "1. Go to Hostinger → Git Version Control"
echo "2. Change branch to: deploy"
echo "3. Click Pull/Deploy"
echo ""
echo "The deploy branch now contains ONLY:"
echo "  ✓ index.html"
echo "  ✓ assets/index-[hash].js"
echo "  ✓ .htaccess"
echo "  ✓ robots.txt"
echo "  ✓ sitemap.xml"
