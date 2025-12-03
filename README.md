# Bioarchitettura-Rivista

Rivista Bioarchitettura - Prima rivista Italiana a parlare di Architettura Ecologica

## 🌿 About

Complete interactive website with CMS management for the Bioarchitettura architecture magazine. This platform includes a comprehensive online store for master courses, subscriptions, ebooks, webinars, and publications related to ecological and sustainable architecture.

## ✨ Features

- **Magazine Section**: Full content management for articles and magazine issues
- **Online Store**: E-commerce platform with:
  - Master courses in sustainable architecture
  - Rivista subscriptions (monthly, yearly, lifetime)
  - Digital and physical publications
  - E-books
  - Webinar registrations
- **Admin Dashboard**: Complete CMS for content and product management
- **Responsive Design**: Mobile-first approach for all devices
- **SEO Optimized**: Built for search engine visibility
- **Payment Integration**: Ready for Stripe integration
- **User Management**: Account system with roles and permissions

## 🚀 Quick Start

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Initialize database
npx prisma migrate dev
npx prisma generate

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
Bioarchitettura-Rivista/
├── frontend/              # Next.js application
│   ├── app/              # App router pages
│   │   ├── admin/        # Admin dashboard
│   │   ├── rivista/      # Magazine section
│   │   ├── negozio/      # Online store
│   │   ├── webinar/      # Webinar section
│   │   └── api/          # API routes
│   ├── components/       # React components
│   ├── lib/             # Utilities and helpers
│   ├── prisma/          # Database schema and migrations
│   └── public/          # Static assets
└── README.md            # This file
```

## 🛠️ Technology Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM with SQLite (dev) / PostgreSQL (production)
- **Payment**: Stripe integration ready
- **Authentication**: NextAuth.js compatible
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives

## 📖 Key Sections

### 1. Home Page
Modern landing page showcasing all sections and features

### 2. Rivista (Magazine)
- Article listing and detail pages
- Magazine issues archive
- Category filtering
- Search functionality

### 3. Negozio (Store)
- Product catalog organized by type:
  - Master courses
  - Subscriptions
  - E-books
  - Publications
- Shopping cart
- Checkout process

### 4. Webinar
- Upcoming webinar listings
- Registration system
- Past webinar archive
- Speaker profiles

### 5. Admin Dashboard
- Content management (articles, issues, categories)
- Product management
- Order processing
- User management
- Webinar scheduling
- Analytics and statistics

## 🗄️ Database Schema

The application uses Prisma with the following main entities:

- **User**: User accounts with role-based access
- **Article**: Magazine articles with categories
- **Issue**: Magazine issue numbers
- **Product**: Store products (Master, E-books, etc.)
- **Order**: Customer orders and items
- **Subscription**: User subscriptions
- **Webinar**: Online seminar events
- **Category**: Content and product categorization

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `frontend` directory:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="your-stripe-key"
```

See `.env.example` for all available options.

### Database Setup

```bash
# Create migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio (database GUI)
npx prisma studio
```

## 🚢 Deployment

### Recommended: Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Database for Production

Switch to PostgreSQL for production:

1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
}
```

2. Update `DATABASE_URL` in production environment
3. Run migrations: `npx prisma migrate deploy`

## 📝 Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code
npm run format
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the terms specified in the LICENSE file.

## 📧 Contact

For more information, visit [bioarchitettura.org](https://www.bioarchitettura.org)

Email: info@bioarchitettura.org

---

**Fondazione Bioarchitettura** - Promoting ecological and sustainable architecture in Italy
