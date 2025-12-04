#!/bin/bash

# Bioarchitettura - Setup Script
# This script helps set up the development environment

set -e

echo "🏛️  Bioarchitettura - Development Setup"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

NODE_VERSION=$(node -v | sed 's/v//')
REQUIRED_VERSION="18.0.0"

# Function to compare versions
version_ge() {
    printf '%s\n%s\n' "$2" "$1" | sort -V -C
}

if ! version_ge "$NODE_VERSION" "$REQUIRED_VERSION"; then
    echo "❌ Node.js version 18 or higher is required. Current version: v$NODE_VERSION"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm $(npm -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm ci
echo "✅ Dependencies installed"
echo ""

# Generate Prisma client
echo "🔧 Generating Prisma Client..."
npx prisma generate
echo "✅ Prisma Client generated"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Please edit the .env file with your configuration:"
    echo "   - Set DATABASE_URL (use 'file:./dev.db' for SQLite in development)"
    echo "   - Generate NEXTAUTH_SECRET with: openssl rand -base64 32"
    echo "   - Add Stripe keys if needed"
    echo ""
else
    echo "✅ .env file already exists"
    echo ""
fi

# Check if database exists
echo "🗄️  Checking database..."
if [ -f .env ] && grep -q "DATABASE_URL" .env; then
    if npx prisma migrate status &> /dev/null; then
        echo "✅ Database is configured"
    else
        echo "⚠️  Database not initialized. Run: npx prisma migrate dev"
    fi
else
    echo "⚠️  Database not configured. Edit .env and run: npx prisma migrate dev"
fi
echo ""

# Run linter
echo "🔍 Running linter..."
npm run lint
echo "✅ Linting passed"
echo ""

# Summary
echo "======================================"
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your configuration"
echo "2. Run 'npx prisma migrate dev' to set up the database"
echo "3. Run 'npm run dev' to start the development server"
echo ""
echo "📚 Useful commands:"
echo "   npm run dev        - Start development server"
echo "   npm run build      - Build for production"
echo "   npm run lint       - Run linter"
echo "   npx prisma studio  - Open Prisma Studio (database GUI)"
echo ""
echo "📖 Documentation:"
echo "   README.md          - Project overview"
echo "   DEPLOYMENT.md      - Deployment guide"
echo "   PRODUCTION.md      - Production checklist"
echo ""
echo "Happy coding! 🚀"
