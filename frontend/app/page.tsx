import Link from 'next/link'
import { BookOpen, GraduationCap, Video, ShoppingBag } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: 'Rivista',
      description: 'Articoli, numeri arretrati e abbonamenti alla prima rivista italiana di architettura ecologica',
      href: '/rivista',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: GraduationCap,
      title: 'Master',
      description: 'Corsi di formazione e master in architettura sostenibile e bioedilizia',
      href: '/negozio/master',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Video,
      title: 'Webinar',
      description: 'Seminari online con esperti del settore dell\'architettura ecologica',
      href: '/webinar',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: ShoppingBag,
      title: 'Negozio',
      description: 'E-books, pubblicazioni e materiali didattici per professionisti e appassionati',
      href: '/negozio',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-blue-50 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Bioarchitettura
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              La prima rivista italiana dedicata all&apos;architettura ecologica e sostenibile.
              Esplora il nostro catalogo di master, webinar, pubblicazioni e abbonamenti.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/negozio"
                className="rounded-md bg-green-700 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-green-600 transition-colors"
              >
                Esplora il Negozio
              </Link>
              <Link
                href="/rivista"
                className="text-base font-semibold leading-7 text-gray-900 hover:text-green-700 transition-colors"
              >
                Scopri la Rivista <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Cosa offriamo
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Tutto quello di cui hai bisogno per l&apos;architettura sostenibile
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="group relative rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className={`inline-flex rounded-lg ${feature.bgColor} p-3 ring-4 ring-white`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">
                  {feature.description}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-green-700">
                  Scopri di più
                  <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-700 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Abbonati alla rivista
            </h2>
            <p className="mt-4 text-lg text-green-100 max-w-2xl mx-auto">
              Ricevi ogni numero direttamente a casa tua e resta aggiornato sulle ultime novità dell&apos;architettura sostenibile
            </p>
            <div className="mt-8">
              <Link
                href="/negozio/abbonamenti"
                className="inline-block rounded-md bg-white px-6 py-3 text-base font-semibold text-green-700 shadow-sm hover:bg-gray-50 transition-colors"
              >
                Scopri gli abbonamenti
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
