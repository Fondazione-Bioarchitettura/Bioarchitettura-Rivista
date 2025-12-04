import { NextResponse } from 'next/server'
import { env } from '@/lib/env'

/**
 * System Status Check API
 * 
 * Returns the status of all system components and integrations
 * Useful for monitoring and deployment verification
 */
export async function GET() {
  // Read version from package.json at build time
  const version = '0.1.0' // This should match package.json version
  
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
        status: 'unknown',
        message: 'Database connection not tested (requires Prisma client)'
      },
      auth: {
        status: env.NEXTAUTH_SECRET ? 'configured' : 'not configured',
        message: env.NEXTAUTH_SECRET ? 'NextAuth is configured' : 'NEXTAUTH_SECRET is missing'
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
        vercel: !!process.env.VERCEL,
        region: process.env.VERCEL_REGION || 'unknown'
      }
    }
  }

  // Check if any critical components are not configured
  const criticalIssues = Object.entries(status.components)
    .filter(([, component]) => component.status === 'not configured')
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
