# Bioarchitettura - Interactive Website with CMS

[![Deploy to Vercel](https://github.com/Fondazione-Bioarchitettura/Bioarchitettura-Rivista/actions/workflows/deploy.yml/badge.svg)](https://github.com/Fondazione-Bioarchitettura/Bioarchitettura-Rivista/actions/workflows/deploy.yml)
[![Deploy Documentation](https://github.com/Fondazione-Bioarchitettura/Bioarchitettura-Rivista/actions/workflows/docs.yml/badge.svg)](https://github.com/Fondazione-Bioarchitettura/Bioarchitettura-Rivista/actions/workflows/docs.yml)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue?logo=typescript)](https://www.typescriptlang.org/)

Complete interactive website with CMS management for the Bioarchitettura architecture magazine, including an online store for master courses, subscriptions, ebooks, webinars, and publications.

## Features

### 🏠 Frontend
- **Modern Stack**: Next.js 14+ with App Router, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-first design that works on all devices
- **SEO Optimized**: Built-in SEO optimization for better search engine visibility

### 📚 Content Management
- **Magazine Section**: Articles, issues, and content categories
- **Online Store**: Complete e-commerce functionality for:
  - Master courses
  - Rivista subscriptions (monthly, yearly, lifetime)
  - E-books
  - Webinars
  - Publications and books

### 🛒 E-commerce Features

- Product catalog with categories
- Shopping cart functionality
- Order management
- Payment integration (Stripe ready)
- Subscription management

### 👨‍💼 Admin Dashboard

- Content management for articles, products, and webinars
- User management
- Order tracking
- Statistics and analytics

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL (for production) or SQLite (for development)

### Quick Setup (Recommended)

Run the automated setup script:

```bash
./scripts/setup.sh
```

This script will:
- Check Node.js version
- Install dependencies
- Generate Prisma Client
- Create .env file from template
- Run linter

### Manual Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

Create a `.env` file in the root directory (use `.env.example` as reference):

```bash
DATABASE_URL="file:./dev.db"  # Use SQLite for development
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

3. **Initialize the database:**

```bash
npx prisma migrate dev
npx prisma generate
```

### Development

Run the development server:

```bash

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                 # Next.js App Router pages
│   ├── admin/          # Admin dashboard
│   ├── api/            # API routes
│   ├── negozio/        # Store pages
│   ├── rivista/        # Magazine pages
│   └── webinar/        # Webinar pages
├── components/         # React components
├── lib/               # Utility functions
├── prisma/            # Database schema
└── public/            # Static assets
```

## Database Schema

Main entities: User, Article, Issue, Category, Product, Order, Subscription, Webinar

## Admin Dashboard

Access at `/admin` - manage articles, products, orders, webinars, and users.

## Deployment

This project is configured for automated deployment to Vercel with GitHub Actions CI/CD.

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Fondazione-Bioarchitettura/Bioarchitettura-Rivista)

### Automated Deployment

The project includes GitHub Actions workflow that automatically:
- Validates and lints code on every push
- Deploys preview environments for pull requests
- Deploys to production when merging to main branch
- Runs database migrations automatically

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed setup instructions.

### Required Environment Variables

Set these in your Vercel project settings:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - Your production URL
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - Your Stripe webhook secret

### Production Database

The project uses PostgreSQL in production (configured in `prisma/schema.prisma`).
Recommended providers:
- Vercel Postgres
- Supabase
- Railway
- Neon

Run migrations on deployment:
```bash
npx prisma migrate deploy
```
