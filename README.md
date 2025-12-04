Bioarchitettura - Interactive Website with CMS
Complete interactive website with CMS management for the Bioarchitettura architecture magazine, including an online store for master courses, subscriptions, ebooks, webinars, and publications.

Features
🏠 Frontend
Modern Stack: Next.js 14+ with App Router, TypeScript, and Tailwind CSS
Responsive Design: Mobile-first design that works on all devices
SEO Optimized: Built-in SEO optimization for better search engine visibility
📚 Content Management
Magazine Section: Articles, issues, and content categories
Online Store: Complete e-commerce functionality for:
Master courses
Rivista subscriptions (monthly, yearly, lifetime)
E-books
Webinars
Publications and books
🛒 E-commerce Features
Product catalog with categories
Shopping cart functionality
Order management
Payment integration (Stripe ready)
Subscription management
👨‍💼 Admin Dashboard
Content management for articles, products, and webinars
User management
Order tracking
Statistics and analytics
Getting Started
Prerequisites
Node.js 18+
npm or yarn
Installation
Install dependencies:
npm install
Set up environment variables in .env:
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
Initialize the database:
npx prisma migrate dev
npx prisma generate
Development
Run the development server:

npm run dev
Open http://localhost:3000 in your browser.

Project Structure
frontend/
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
Database Schema
Main entities: User, Article, Issue, Category, Product, Order, Subscription, Webinar

Admin Dashboard
Access at /admin - manage articles, products, orders, webinars, and users.

Deployment
Deploy on Vercel, Railway, Render, or any Node.js platform.

For production, update to PostgreSQL or MySQL:

Update prisma/schema.prisma datasource
Update DATABASE_URL
Run npx prisma migrate deploy
