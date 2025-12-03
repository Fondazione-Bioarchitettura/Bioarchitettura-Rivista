import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Bioarchitettura</h3>
            <p className="text-gray-400 text-sm">
              Prima rivista italiana dedicata all&apos;architettura ecologica e sostenibile.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Link Utili</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/rivista" className="text-gray-400 hover:text-white transition-colors">
                  Rivista
                </Link>
              </li>
              <li>
                <Link href="/negozio" className="text-gray-400 hover:text-white transition-colors">
                  Negozio
                </Link>
              </li>
              <li>
                <Link href="/webinar" className="text-gray-400 hover:text-white transition-colors">
                  Webinar
                </Link>
              </li>
              <li>
                <Link href="/chi-siamo" className="text-gray-400 hover:text-white transition-colors">
                  Chi Siamo
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Negozio</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/negozio/master" className="text-gray-400 hover:text-white transition-colors">
                  Master
                </Link>
              </li>
              <li>
                <Link href="/negozio/abbonamenti" className="text-gray-400 hover:text-white transition-colors">
                  Abbonamenti
                </Link>
              </li>
              <li>
                <Link href="/negozio/ebooks" className="text-gray-400 hover:text-white transition-colors">
                  E-books
                </Link>
              </li>
              <li>
                <Link href="/negozio/pubblicazioni" className="text-gray-400 hover:text-white transition-colors">
                  Pubblicazioni
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contatti</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: info@bioarchitettura.org</li>
              <li>Tel: +39 XXX XXX XXXX</li>
              <li>
                <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
                  Area Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Fondazione Bioarchitettura. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  )
}
