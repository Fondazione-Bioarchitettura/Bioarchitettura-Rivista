import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { formatDate, formatPrice } from '@/lib/utils'
import { WebinarStatus } from '@prisma/client'
import { Calendar, Clock, Users } from 'lucide-react'

export default async function WebinarPage() {
  const webinars = await prisma.webinar.findMany({
    orderBy: {
      date: 'desc',
    },
  })

  const upcomingWebinars = webinars.filter(
    (w) => w.status === WebinarStatus.SCHEDULED && new Date(w.date) > new Date()
  )

  const pastWebinars = webinars.filter(
    (w) => w.status === WebinarStatus.COMPLETED || new Date(w.date) < new Date()
  )

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Webinar
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Partecipa ai nostri webinar con esperti del settore dell&apos;architettura ecologica
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Webinars */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Prossimi Webinar</h2>
          {upcomingWebinars.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Nessun webinar in programma al momento.</p>
              <p className="text-sm text-gray-500 mt-2">Torna presto per nuovi eventi!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {upcomingWebinars.map((webinar) => (
                <div
                  key={webinar.id}
                  className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  {webinar.coverImage && (
                    <div className="aspect-video bg-gray-200 overflow-hidden">
                      <img
                        src={webinar.coverImage}
                        alt={webinar.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 mb-3">
                      {webinar.status === WebinarStatus.SCHEDULED ? 'In Programma' : webinar.status}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                      <Link href={`/webinar/${webinar.slug}`}>
                        {webinar.title}
                      </Link>
                    </h3>
                    <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                      {webinar.description}
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDate(webinar.date)}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        {webinar.duration} minuti
                      </div>
                      {webinar.maxAttendees && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          {webinar.registrations}/{webinar.maxAttendees} iscritti
                        </div>
                      )}
                      <div className="text-sm text-gray-500">
                        Relatore: {webinar.presenter}
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(webinar.price)}
                      </span>
                      <Link
                        href={`/webinar/${webinar.slug}`}
                        className="inline-block rounded-md bg-purple-700 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-600 transition-colors"
                      >
                        Iscriviti
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Past Webinars */}
      {pastWebinars.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Webinar Passati</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastWebinars.slice(0, 6).map((webinar) => (
                <div
                  key={webinar.id}
                  className="bg-white rounded-lg overflow-hidden border border-gray-200"
                >
                  {webinar.coverImage && (
                    <div className="aspect-video bg-gray-200 overflow-hidden">
                      <img
                        src={webinar.coverImage}
                        alt={webinar.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">
                      {webinar.title}
                    </h3>
                    <div className="mt-2 flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(webinar.date)}
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      {webinar.presenter}
                    </p>
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
          <div className="rounded-2xl bg-gradient-to-r from-purple-700 to-purple-600 px-6 py-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Vuoi proporre un webinar?
            </h2>
            <p className="mt-4 text-lg text-purple-100 max-w-2xl mx-auto">
              Se sei un esperto nel campo dell&apos;architettura sostenibile, contattaci per organizzare un webinar
            </p>
            <div className="mt-8">
              <Link
                href="/chi-siamo"
                className="inline-block rounded-md bg-white px-6 py-3 text-base font-semibold text-purple-700 hover:bg-gray-50 transition-colors"
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
