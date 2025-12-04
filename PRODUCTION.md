# Production Deployment Checklist

This checklist ensures all components are properly configured for production deployment.

## Pre-Deployment Checklist

### ✅ Environment Configuration

- [ ] **Database**: PostgreSQL instance provisioned and accessible
  - Connection string format: `postgresql://user:password@host:5432/database?schema=public`
  - Database created and empty (ready for migrations)
  - Connection tested with: `npx prisma db pull`

- [ ] **NextAuth**:
  - [ ] `NEXTAUTH_URL` set to production URL (e.g., `https://your-app.vercel.app`)
  - [ ] `NEXTAUTH_SECRET` generated with: `openssl rand -base64 32`
  - [ ] Both values added to Vercel environment variables

- [ ] **Stripe** (if using e-commerce features):
  - [ ] `STRIPE_SECRET_KEY` (use live key `sk_live_...` for production)
  - [ ] `STRIPE_PUBLISHABLE_KEY` (use live key `pk_live_...` for production)
  - [ ] `STRIPE_WEBHOOK_SECRET` configured
  - [ ] Webhook endpoint registered: `https://your-domain/api/webhooks/stripe`

### ✅ Vercel Configuration

- [ ] Project imported from GitHub
- [ ] All environment variables set in Vercel project settings
- [ ] Build settings:
  - Framework: Next.js
  - Build Command: `npm run build`
  - Output Directory: (leave default)
  - Install Command: `npm ci`

### ✅ GitHub Configuration

- [ ] Repository secrets configured:
  - [ ] `VERCEL_TOKEN`
  - [ ] `VERCEL_ORG_ID`
  - [ ] `VERCEL_PROJECT_ID`
  - [ ] `DATABASE_URL`
  - [ ] `NEXTAUTH_URL`
  - [ ] `NEXTAUTH_SECRET`
  - [ ] `STRIPE_SECRET_KEY` (if applicable)

- [ ] GitHub Pages enabled:
  - [ ] Settings → Pages → Source: GitHub Actions
  - [ ] Workflow permissions: Read and write

### ✅ Database Setup

- [ ] Initial migration run:
  ```bash
  export DATABASE_URL="your-production-url"
  npx prisma migrate deploy
  ```

- [ ] Database connection verified:
  ```bash
  npx prisma studio
  ```

- [ ] (Optional) Seed data added if needed

## Post-Deployment Verification

### ✅ Deployment Success

- [ ] GitHub Actions workflow completed successfully
- [ ] Vercel deployment status: Ready
- [ ] Production URL accessible

### ✅ Health Checks

- [ ] Main page loads: `https://your-domain.vercel.app`
- [ ] Health API responds: `https://your-domain.vercel.app/api/health`
- [ ] Status API responds: `https://your-domain.vercel.app/api/status`
- [ ] Documentation site: `https://fondazione-bioarchitettura.github.io/Bioarchitettura-Rivista/`

### ✅ Feature Testing

- [ ] **Navigation**: All main pages accessible
  - [ ] Home (`/`)
  - [ ] Magazine (`/rivista`)
  - [ ] Store (`/negozio`)
  - [ ] Webinars (`/webinar`)
  - [ ] Admin (`/admin`)

- [ ] **CMS Features** (if implemented):
  - [ ] Articles display correctly
  - [ ] Categories work
  - [ ] Search functionality

- [ ] **E-commerce** (if implemented):
  - [ ] Products display
  - [ ] Shopping cart works
  - [ ] Checkout process (test with Stripe test mode first)

- [ ] **Authentication** (if implemented):
  - [ ] Login works
  - [ ] Registration works
  - [ ] Session persistence

### ✅ Performance & Security

- [ ] Lighthouse score > 90
- [ ] Security headers present (check with securityheaders.com)
- [ ] SSL certificate active (HTTPS)
- [ ] No console errors in production

### ✅ Monitoring Setup

- [ ] Vercel Analytics enabled
- [ ] Error tracking configured (optional: Sentry)
- [ ] Database monitoring active
- [ ] Stripe dashboard monitoring (if applicable)

## Common Issues & Solutions

### Issue: Build Fails

**Check**:
1. GitHub Actions logs for errors
2. All environment variables are set
3. Dependencies are up to date

**Fix**:
```bash
# Test build locally
DATABASE_URL="file:./dev.db" \
NEXTAUTH_URL="http://localhost:3000" \
NEXTAUTH_SECRET="test-secret" \
npm run build
```

### Issue: Database Connection Fails

**Check**:
1. `DATABASE_URL` format is correct
2. Database host is accessible from Vercel
3. Database credentials are valid
4. Database exists

**Fix**:
```bash
# Test connection
npx prisma db pull

# Check migrations status
npx prisma migrate status
```

### Issue: 500 Errors in Production

**Check**:
1. Vercel Function logs
2. Environment variables in Vercel (not just GitHub Secrets)
3. Database connection

**Fix**:
1. Go to Vercel Dashboard → Your Project → Functions
2. Check recent invocations for errors
3. Verify all env vars are set

### Issue: Payments Not Working

**Check**:
1. Using correct Stripe keys (test vs live)
2. Webhook endpoint configured in Stripe dashboard
3. `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard

**Fix**:
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain/api/webhooks/stripe`
3. Copy signing secret to `STRIPE_WEBHOOK_SECRET`

## Maintenance

### Regular Tasks

- **Weekly**: Check Vercel deployment logs
- **Monthly**: Review database performance metrics
- **Quarterly**: Update dependencies and security patches

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update non-breaking
npm update

# Update major versions (test thoroughly)
npm install package@latest
```

### Rolling Back

If issues occur in production:

1. Go to Vercel Dashboard → Deployments
2. Find previous stable deployment
3. Click "⋯" → "Promote to Production"

## Support Resources

- **Vercel**: https://vercel.com/docs
- **Next.js**: https://nextjs.org/docs
- **Prisma**: https://www.prisma.io/docs
- **Stripe**: https://stripe.com/docs
- **GitHub Actions**: https://docs.github.com/actions

## Emergency Contacts

- **Vercel Support**: support@vercel.com
- **Database Provider**: [Your provider's support]
- **Stripe Support**: https://support.stripe.com

---

**Last Updated**: 2024-12-04
**Version**: 1.0.0
