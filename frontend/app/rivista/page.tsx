import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'

export default async function RivistaPage() {
  // Fetch recent articles and issues
  const articles = await prisma.article.findMany({
    where: {
      publishedAt: {
        not: null,
      },
    },
    orderBy: {
      publishedAt: 'desc',
    },
    take: 6,
    include: {
      category: true,
      issue: true,
    },
  })

  const issues = await prisma.issue.findMany({
    orderBy: {
      year: 'desc',
    },
    take: 4,
  })

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Rivista Bioarchitettura
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              La prima rivista italiana dedicata all&apos;architettura ecologica e sostenibile
            </p>
            <div className="mt-8">
              <Link
                href="/negozio/abbonamenti"
                className="inline-block rounded-md bg-green-700 px-6 py-3 text-base font-semibold text-white hover:bg-green-600 transition-colors"
              >
                Abbonati ora
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Articoli Recenti</h2>
          {articles.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Nessun articolo disponibile al momento.</p>
              <p className="text-sm text-gray-500 mt-2">Torna presto per nuovi contenuti!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white hover:shadow-lg transition-shadow"
                >
                  {article.coverImage && (
                    <div className="aspect-video bg-gray-200 overflow-hidden">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      {article.category && (
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                          {article.category.name}
                        </span>
                      )}
                      {article.publishedAt && (
                        <span>{formatDate(article.publishedAt)}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                      <Link href={`/rivista/${article.slug}`}>
                        <span className="absolute inset-0" />
                        {article.title}
                      </Link>
                    </h3>
                    {article.excerpt && (
                      <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                        {article.excerpt}
                      </p>
                    )}
                    <div className="mt-4 text-sm text-gray-500">
                      {article.author}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Issues */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Numeri della Rivista</h2>
            <Link
              href="/rivista/numeri"
              className="text-green-700 hover:text-green-600 font-medium"
            >
              Vedi tutti →
            </Link>
          </div>
          {issues.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-600">Nessun numero disponibile al momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {issues.map((issue) => (
                <Link
                  key={issue.id}
                  href={`/rivista/numero/${issue.number}`}
                  className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  {issue.coverImage && (
                    <div className="aspect-[3/4] bg-gray-200 overflow-hidden">
                      <img
                        src={issue.coverImage}
                        alt={issue.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                      {issue.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Numero {issue.number} - {issue.year}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
