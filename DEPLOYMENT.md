# Deployment Guide

## Overview

This project uses a dual deployment strategy:

1. **Vercel (Primary)**: Hosts the full Next.js application with SSR, API routes, database, and all dynamic features
2. **GitHub Pages (Documentation)**: Hosts static documentation pages

The deployment is fully automated via GitHub Actions CI/CD pipeline.

## Automated Deployment to Vercel

This project is configured for automated deployment to Vercel with GitHub Actions CI/CD pipeline.

### Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Connected to your Vercel account
3. **PostgreSQL Database**: Set up a production database (e.g., Vercel Postgres, Supabase, or Railway)

### Initial Setup

#### 1. Configure Vercel

1. Import your GitHub repository to Vercel
2. Set up the following environment variables in Vercel:
   - `DATABASE_URL`: PostgreSQL connection string
   - `NEXTAUTH_URL`: Your production URL (e.g., https://your-app.vercel.app)
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `STRIPE_SECRET_KEY`: Your Stripe secret key
   - `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
   - `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook secret

#### 2. Configure GitHub Secrets

Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):

- `VERCEL_TOKEN`: Your Vercel token (get from Vercel Account Settings → Tokens)
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID
- `DATABASE_URL`: Production database URL
- `NEXTAUTH_URL`: Production URL
- `NEXTAUTH_SECRET`: Same as in Vercel
- `STRIPE_SECRET_KEY`: Same as in Vercel

To get `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`:
```bash
npm install -g vercel
vercel login
vercel link
cat .vercel/project.json
```

#### 3. Database Migrations

The GitHub Actions workflow automatically runs migrations on production deployment. For initial setup:

```bash
# Set production DATABASE_URL in your environment
export DATABASE_URL="postgresql://..."

# Run migrations
npx prisma migrate deploy

# Seed database (optional)
npx prisma db seed
```

### Automated Deployment Workflow

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:

1. **On Pull Requests**:
   - Runs linting and builds
   - Deploys a preview to Vercel
   
2. **On Push to Main Branch**:
   - Runs linting and builds
   - Deploys to production on Vercel
   - Runs database migrations automatically

### Manual Deployment

If you need to deploy manually:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `NEXTAUTH_URL` | Application URL | `https://your-app.vercel.app` |
| `NEXTAUTH_SECRET` | NextAuth secret key | Generate with `openssl rand -base64 32` |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_live_...` or `sk_test_...` |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | `pk_live_...` or `pk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | `whsec_...` |

### Monitoring

- **Vercel Dashboard**: Monitor deployments, logs, and analytics
- **GitHub Actions**: Check workflow runs in the Actions tab
- **Database**: Monitor database performance in your database provider's dashboard

### Troubleshooting

#### Build Fails

**Symptoms**: GitHub Actions workflow fails during build step

**Solutions**:
1. Check GitHub Actions logs for specific error messages
2. Verify all environment variables are set correctly in GitHub Secrets
3. Ensure database is accessible from Vercel
4. Run build locally: `npm run build`
5. Check for TypeScript errors: `npm run lint`

**Common Issues**:
- Missing environment variables
- TypeScript type errors
- Prisma client not generated (run `npx prisma generate`)

#### Migration Fails

**Symptoms**: Database migrations fail during deployment

**Solutions**:
1. Verify `DATABASE_URL` is correct and accessible
2. Ensure database exists and credentials are valid
3. Check database connection with: `npx prisma db pull`
4. Run migrations manually:
   ```bash
   export DATABASE_URL="your-production-db-url"
   npx prisma migrate deploy
   ```
5. Check migration history: `npx prisma migrate status`

**Common Issues**:
- Database connection timeout (check firewall/security groups)
- Incompatible schema changes
- Missing database privileges

#### Deployment Takes Too Long

**Symptoms**: Vercel deployment exceeds normal build time

**Solutions**:
1. Check Vercel dashboard for build logs and bottlenecks
2. Verify dependencies are cached properly
3. Review build output for large bundle sizes
4. Consider:
   - Reducing bundle size with code splitting
   - Optimizing images and assets
   - Using dynamic imports for heavy components

#### Runtime Errors

**Symptoms**: Application builds but throws errors at runtime

**Solutions**:
1. Check Vercel Function logs in dashboard
2. Verify all environment variables are set in Vercel project settings
3. Test API routes locally: `npm run dev`
4. Check database connectivity from production
5. Review browser console for client-side errors

**Common Issues**:
- Missing environment variables in Vercel (not in GitHub Secrets)
- CORS issues with external APIs
- Database connection pool exhaustion

#### Stripe Integration Issues

**Symptoms**: Payment processing fails or webhooks not working

**Solutions**:
1. Verify Stripe keys are correct (test vs live mode)
2. Configure Stripe webhook endpoint:
   - URL: `https://your-domain.vercel.app/api/webhooks/stripe`
   - Events: Select all checkout and payment events
3. Update `STRIPE_WEBHOOK_SECRET` in Vercel environment variables
4. Test webhooks using Stripe CLI:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

#### GitHub Pages Not Updating

**Symptoms**: Documentation site not reflecting latest changes

**Solutions**:
1. Check GitHub Actions → "Deploy Documentation" workflow
2. Verify GitHub Pages is enabled in repository settings
3. Check Pages source is set to "GitHub Actions"
4. Manual trigger: Go to Actions → "Deploy Documentation" → "Run workflow"

### Rollback

If a deployment fails, Vercel automatically keeps previous deployments active. You can:

1. Go to Vercel Dashboard → Deployments
2. Find a stable previous deployment
3. Click "Promote to Production"

## GitHub Pages Deployment

GitHub Pages is used to host static documentation for the project.

### What's Deployed to GitHub Pages

- Project documentation (README, DEPLOYMENT guide)
- Static landing page with project overview
- Links to main application and repository

### Accessing Documentation

Once deployed, documentation is available at:
- `https://fondazione-bioarchitettura.github.io/Bioarchitettura-Rivista/`

### Manual Deployment

To manually trigger documentation deployment:

1. Go to repository → Actions tab
2. Select "Deploy Documentation to GitHub Pages" workflow
3. Click "Run workflow" → Select branch → "Run workflow"

### Configuration

The GitHub Pages workflow is defined in `.github/workflows/docs.yml` and:
- Triggers automatically on push to main (when docs change)
- Can be manually triggered via workflow_dispatch
- Converts Markdown files to HTML
- Creates a static documentation site

### Why Two Deployment Targets?

**Vercel (Primary Application)**:
- Hosts the full Next.js application
- Supports server-side rendering (SSR)
- Runs API routes and serverless functions
- Connects to PostgreSQL database
- Handles authentication and payments
- Dynamic content and real-time features

**GitHub Pages (Documentation)**:
- Free static hosting for documentation
- No server-side capabilities
- Perfect for project documentation
- Always accessible even during maintenance
- Provides a landing page for the project

### Support

For issues:
- Check Vercel documentation: https://vercel.com/docs
- Review GitHub Actions logs
- Check GitHub Pages documentation: https://docs.github.com/pages
- Contact Vercel support
