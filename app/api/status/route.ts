import { NextResponse } from 'next/server'

/**
 * System Status Check API
 * 
 * Returns the status of all system components and integrations
 * Useful for monitoring and deployment verification
 */
export async function GET() {
  // Read version from package.json at build time
  const version = '0.1.0' // This should match package.json version
  
  // Read environment variables at runtime
  const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    VERCEL: process.env.VERCEL,
    VERCEL_REGION: process.env.VERCEL_REGION,
  }
  
  const status = {
    status: 'operational',
    timestamp: new Date().toISOString(),
    version,
    environment: env.NODE_ENV,
    components: {
      api: {
        status: 'healthy',
        message: 'API is responding'
      },
      database: {
        status: env.DATABASE_URL ? 'configured' : 'not configured',
        message: env.DATABASE_URL ? 'Database URL is set' : 'DATABASE_URL is missing'
      },
      auth: {
        status: env.NEXTAUTH_SECRET && env.NEXTAUTH_URL ? 'configured' : 'not configured',
        message: (env.NEXTAUTH_SECRET && env.NEXTAUTH_URL) ? 'NextAuth is configured' : 'NextAuth configuration is incomplete'
      },
      stripe: {
        status: env.STRIPE_SECRET_KEY ? 'configured' : 'not configured',
        message: env.STRIPE_SECRET_KEY ? 'Stripe is configured' : 'Stripe keys are missing'
      }
    },
    config: {
      nodeVersion: process.version,
      nextJsVersion: '14.2+',
      deployment: {
        vercel: !!env.VERCEL,
        region: env.VERCEL_REGION || 'unknown'
      }
    }
  }

  // Check if any critical components are not configured
  const criticalIssues = Object.entries(status.components)
    .filter(([key, component]) => 
      key !== 'stripe' && component.status === 'not configured'
    )
    .map(([name]) => name)

  if (criticalIssues.length > 0) {
    status.status = 'degraded'
  }

  return NextResponse.json(status, {
    headers: {
      'Cache-Control': 'no-store, max-age=0'
    }
  })
}
