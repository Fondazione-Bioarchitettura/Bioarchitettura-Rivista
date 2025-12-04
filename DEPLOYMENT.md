# Deployment Guide

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

1. Check GitHub Actions logs
2. Verify all environment variables are set correctly
3. Ensure database is accessible from Vercel

#### Migration Fails

1. Check DATABASE_URL is correct
2. Ensure database exists and is accessible
3. Run migrations manually if needed

#### Deployment Takes Too Long

1. Check Vercel dashboard for build logs
2. Verify dependencies are cached properly
3. Consider optimizing build process

### Rollback

If a deployment fails, Vercel automatically keeps previous deployments active. You can:

1. Go to Vercel Dashboard → Deployments
2. Find a stable previous deployment
3. Click "Promote to Production"

### Support

For issues:
- Check Vercel documentation: https://vercel.com/docs
- Review GitHub Actions logs
- Contact Vercel support
