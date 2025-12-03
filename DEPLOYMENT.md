# Deployment Guide - Bioarchitettura Website

This guide provides instructions for deploying the Bioarchitettura interactive website with CMS.

## Architecture Overview

The application is built with:
- **Frontend**: Next.js 14+ with App Router
- **Database**: Prisma ORM with SQLite (development) / PostgreSQL (production recommended)
- **Styling**: Tailwind CSS
- **Payment**: Stripe integration ready
- **Deployment**: Vercel (recommended) or any Node.js hosting

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- PostgreSQL database (for production) or SQLite (for development)
- Stripe account (for payment processing)

## Local Development Setup

1. **Clone the repository**:
```bash
git clone https://github.com/Fondazione-Bioarchitettura/Bioarchitettura-Rivista.git
cd Bioarchitettura-Rivista/frontend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
   
   Copy the example environment file:
```bash
cp .env.example .env
```

   Edit `.env` with your configuration:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="your-stripe-secret-key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
```

4. **Initialize the database**:
```bash
npx prisma migrate dev
npx prisma generate
```

5. **Start the development server**:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Production Deployment

### Option 1: Vercel (Recommended)

Vercel provides the best experience for Next.js applications.

1. **Push your code to GitHub**:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `frontend` directory as the root

3. **Configure Environment Variables**:
   
   In Vercel project settings, add:
```
DATABASE_URL=postgresql://user:password@host:5432/database
NEXTAUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://your-domain.com
STRIPE_SECRET_KEY=your-stripe-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-public-key
```

4. **Set Build Configuration**:
   - Framework Preset: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Install Command: `npm install`

5. **Deploy**:
   Click "Deploy" and Vercel will build and deploy your application.

### Option 2: Railway

Railway offers PostgreSQL database and easy deployment.

1. **Install Railway CLI**:
```bash
npm i -g @railway/cli
```

2. **Login and initialize**:
```bash
railway login
railway init
```

3. **Add PostgreSQL**:
```bash
railway add --plugin postgresql
```

4. **Set environment variables**:
```bash
railway variables set NEXTAUTH_SECRET=your-secret
railway variables set NEXTAUTH_URL=https://your-app.railway.app
# Add other variables
```

5. **Deploy**:
```bash
railway up
```

### Option 3: Custom VPS (DigitalOcean, AWS, etc.)

1. **Set up server** with Node.js 18+

2. **Install PostgreSQL**:
```bash
sudo apt-get install postgresql postgresql-contrib
```

3. **Clone and setup**:
```bash
git clone https://github.com/Fondazione-Bioarchitettura/Bioarchitettura-Rivista.git
cd Bioarchitettura-Rivista/frontend
npm install
```

4. **Configure environment**:
```bash
nano .env
# Add production variables
```

5. **Run migrations**:
```bash
npx prisma migrate deploy
```

6. **Build application**:
```bash
npm run build
```

7. **Start with PM2**:
```bash
npm install -g pm2
pm2 start npm --name "bioarchitettura" -- start
pm2 save
pm2 startup
```

8. **Set up Nginx reverse proxy**:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Database Migration from SQLite to PostgreSQL

When moving to production, switch from SQLite to PostgreSQL:

1. **Update `prisma/schema.prisma`**:
```prisma
datasource db {
  provider = "postgresql"
}
```

2. **Update DATABASE_URL**:
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

3. **Run migrations**:
```bash
npx prisma migrate deploy
```

## Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | `postgresql://...` or `file:./dev.db` |
| `NEXTAUTH_SECRET` | Secret for session encryption | Generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Application URL | `https://bioarchitettura.org` |

### Optional Variables

| Variable | Description |
|----------|-------------|
| `STRIPE_SECRET_KEY` | Stripe secret key for payments |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key |
| `EMAIL_SERVER` | SMTP server for email notifications |
| `EMAIL_FROM` | From address for emails |

## Post-Deployment Tasks

### 1. Create Admin User

Access the database and create your first admin user:

```sql
INSERT INTO "User" (id, email, name, password, role, "createdAt", "updatedAt")
VALUES (
  'admin-001',
  'admin@bioarchitettura.org',
  'Admin',
  '$2a$10$...', -- Hash your password
  'ADMIN',
  NOW(),
  NOW()
);
```

Or use Prisma Studio:
```bash
npx prisma studio
```

### 2. Configure Stripe Webhooks

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy webhook secret to your environment variables

### 3. Set up SSL Certificate

For custom VPS deployment, use Let's Encrypt:
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Monitoring and Maintenance

### Health Checks

Monitor these endpoints:
- `https://your-domain.com/` - Homepage
- `https://your-domain.com/api/health` - API health (to be implemented)

### Database Backups

**For PostgreSQL on Vercel/Railway**:
They provide automatic backups.

**For custom VPS**:
```bash
# Create backup script
#!/bin/bash
pg_dump -U postgres bioarchitettura > backup-$(date +%Y%m%d).sql
```

Add to cron:
```bash
0 2 * * * /path/to/backup-script.sh
```

### Log Monitoring

**Using Vercel**: View logs in Vercel dashboard

**Using PM2**:
```bash
pm2 logs bioarchitettura
pm2 monit
```

## Troubleshooting

### Build Fails

1. Check Node.js version: `node --version` (must be 18+)
2. Clear cache: `rm -rf .next node_modules && npm install`
3. Check environment variables are set

### Database Connection Issues

1. Verify DATABASE_URL is correct
2. Check firewall rules allow connection
3. Verify database exists and is accessible

### Stripe Integration Issues

1. Verify API keys are for correct environment (test/live)
2. Check webhook endpoint is accessible
3. Verify webhook secret matches

## Scaling Considerations

### Performance Optimization

1. **Enable Redis caching** for session storage
2. **Use CDN** for static assets (Vercel does this automatically)
3. **Optimize images** with Next.js Image component
4. **Enable database connection pooling**

### Horizontal Scaling

For high traffic:
1. Deploy multiple Next.js instances
2. Use load balancer (AWS ALB, Nginx)
3. Separate database server
4. Use managed PostgreSQL (AWS RDS, DigitalOcean Managed DB)

## Security Checklist

- [ ] Use HTTPS/SSL for all traffic
- [ ] Set strong NEXTAUTH_SECRET
- [ ] Enable CSRF protection (built into Next.js)
- [ ] Use environment variables for all secrets
- [ ] Set up rate limiting for API routes
- [ ] Regular security updates: `npm audit fix`
- [ ] Enable database backups
- [ ] Configure firewall rules
- [ ] Use Stripe webhook signatures

## Support

For issues or questions:
- GitHub Issues: https://github.com/Fondazione-Bioarchitettura/Bioarchitettura-Rivista/issues
- Email: info@bioarchitettura.org

## License

See LICENSE file for details.
