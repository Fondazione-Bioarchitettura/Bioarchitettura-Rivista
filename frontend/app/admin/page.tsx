import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { FileText, ShoppingBag, Video, Users, BookOpen } from 'lucide-react'

export default async function AdminPage() {
  // Get statistics
  const [articlesCount, productsCount, webinarsCount, usersCount, ordersCount] = await Promise.all([
    prisma.article.count(),
    prisma.product.count(),
    prisma.webinar.count(),
    prisma.user.count(),
    prisma.order.count(),
  ])

  const stats = [
    {
      name: 'Articoli',
      value: articlesCount,
      icon: FileText,
      href: '/admin/articles',
      color: 'bg-blue-500',
    },
    {
      name: 'Prodotti',
      value: productsCount,
      icon: ShoppingBag,
      href: '/admin/products',
      color: 'bg-green-500',
    },
    {
      name: 'Webinar',
      value: webinarsCount,
      icon: Video,
      href: '/admin/webinars',
      color: 'bg-purple-500',
    },
    {
      name: 'Utenti',
      value: usersCount,
      icon: Users,
      href: '/admin/users',
      color: 'bg-orange-500',
    },
    {
      name: 'Ordini',
      value: ordersCount,
      icon: BookOpen,
      href: '/admin/orders',
      color: 'bg-pink-500',
    },
  ]

  const quickActions = [
    { name: 'Nuovo Articolo', href: '/admin/articles/new', icon: FileText },
    { name: 'Nuovo Prodotto', href: '/admin/products/new', icon: ShoppingBag },
    { name: 'Nuovo Webinar', href: '/admin/webinars/new', icon: Video },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Amministratore
          </h1>
          <p className="mt-2 text-gray-600">
            Gestisci il contenuto del sito Bioarchitettura
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 mb-8">
          {stats.map((stat) => (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-white overflow-hidden rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 rounded-md ${stat.color} p-3`}>
                    <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Azioni Rapide
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  href={action.href}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-green-500 transition-all"
                >
                  <action.icon className="h-5 w-5 text-green-600 mr-3" />
                  <span className="font-medium text-gray-900">{action.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Gestione Contenuti
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/admin/articles"
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    Gestisci Articoli →
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/issues"
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    Gestisci Numeri Rivista →
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/categories"
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    Gestisci Categorie →
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Gestione E-commerce
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/admin/products"
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    Gestisci Prodotti →
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/orders"
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    Gestisci Ordini →
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/subscriptions"
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    Gestisci Abbonamenti →
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Gestione Webinar
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/admin/webinars"
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    Gestisci Webinar →
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/webinars/new"
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    Crea Nuovo Webinar →
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Gestione Utenti
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/admin/users"
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    Gestisci Utenti →
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/settings"
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    Impostazioni →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
