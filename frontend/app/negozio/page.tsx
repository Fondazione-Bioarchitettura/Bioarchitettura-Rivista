import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatPrice } from '@/lib/utils'
import { ProductType } from '@prisma/client'

export default async function NegozioPage() {
  const products = await prisma.product.findMany({
    where: {
      inStock: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 12,
  })

  const productsByType = {
    MASTER: products.filter((p) => p.type === ProductType.MASTER),
    SUBSCRIPTION: products.filter((p) => p.type === ProductType.SUBSCRIPTION),
    EBOOK: products.filter((p) => p.type === ProductType.EBOOK),
    BOOK: products.filter((p) => p.type === ProductType.BOOK),
    WEBINAR: products.filter((p) => p.type === ProductType.WEBINAR),
  }

  const categories = [
    {
      name: 'Master',
      description: 'Corsi di formazione avanzata',
      href: '/negozio/master',
      icon: '🎓',
      products: productsByType.MASTER,
    },
    {
      name: 'Abbonamenti',
      description: 'Abbonamenti alla rivista',
      href: '/negozio/abbonamenti',
      icon: '📰',
      products: productsByType.SUBSCRIPTION,
    },
    {
      name: 'E-books',
      description: 'Libri digitali',
      href: '/negozio/ebooks',
      icon: '📱',
      products: productsByType.EBOOK,
    },
    {
      name: 'Pubblicazioni',
      description: 'Libri e pubblicazioni',
      href: '/negozio/pubblicazioni',
      icon: '📚',
      products: productsByType.BOOK,
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-yellow-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Negozio
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Esplora il nostro catalogo di master, abbonamenti, e-books e pubblicazioni
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                  {category.name}
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  {category.description}
                </p>
                <p className="mt-4 text-sm font-medium text-green-700">
                  {category.products.length} prodotti disponibili
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {products.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Prodotti in Evidenza</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {products.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  {product.coverImage && (
                    <div className="aspect-square bg-gray-200 overflow-hidden">
                      <img
                        src={product.coverImage}
                        alt={product.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 mb-2">
                      {product.type}
                    </span>
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors line-clamp-2">
                      <Link href={`/negozio/prodotto/${product.slug}`}>
                        {product.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                      <Link
                        href={`/negozio/prodotto/${product.slug}`}
                        className="text-sm font-medium text-green-700 hover:text-green-600"
                      >
                        Dettagli →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-green-700 to-green-600 px-6 py-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Non trovi quello che cerchi?
            </h2>
            <p className="mt-4 text-lg text-green-100 max-w-2xl mx-auto">
              Contattaci per ricevere informazioni personalizzate sui nostri prodotti e servizi
            </p>
            <div className="mt-8">
              <Link
                href="/chi-siamo"
                className="inline-block rounded-md bg-white px-6 py-3 text-base font-semibold text-green-700 hover:bg-gray-50 transition-colors"
              >
                Contattaci
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
