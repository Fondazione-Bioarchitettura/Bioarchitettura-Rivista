/**
 * Environment Variables Validation
 * 
 * This file validates all required environment variables at build time
 * to ensure the application has all necessary configuration.
 */

export const env = {
  // Database
  DATABASE_URL: process.env.DATABASE_URL,

  // NextAuth
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

  // Stripe
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,

  // Node Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
} as const

/**
 * Validates that all required environment variables are set
 * Throws an error if any required variables are missing
 */
export function validateEnv() {
  const required = [
    'DATABASE_URL',
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
  ] as const

  const missing = required.filter(key => {
    const value = env[key]
    return !value || (typeof value === 'string' && value.trim() === '')
  })

  if (missing.length > 0) {
    throw new Error(
      `Missing or empty required environment variables:\n${missing
        .map(key => `  - ${key}`)
        .join('\n')}\n\nPlease check your .env file or deployment configuration.`
    )
  }

  // Warn about optional but recommended variables
  const optional = [
    'STRIPE_SECRET_KEY',
    'STRIPE_PUBLISHABLE_KEY',
    'STRIPE_WEBHOOK_SECRET',
  ] as const

  const missingOptional = optional.filter(key => !env[key])

  if (missingOptional.length > 0 && env.NODE_ENV === 'production') {
    console.warn(
      `⚠️  Warning: Missing optional environment variables (payment features may not work):\n${missingOptional
        .map(key => `  - ${key}`)
        .join('\n')}`
    )
  }
}

// Validate on import in production
if (env.NODE_ENV === 'production') {
  validateEnv()
}
