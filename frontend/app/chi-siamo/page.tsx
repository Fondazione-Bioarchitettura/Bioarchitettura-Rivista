export default function ChiSiamoPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Chi Siamo
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              La storia della prima rivista italiana dedicata all&apos;architettura ecologica
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              La nostra missione
            </h2>
            <p className="text-gray-600 mb-6">
              Bioarchitettura è la prima rivista italiana dedicata all&apos;architettura ecologica e sostenibile. 
              Dal nostro lancio, ci impegniamo a promuovere pratiche costruttive rispettose dell&apos;ambiente 
              e a diffondere la cultura della bioedilizia in Italia.
            </p>
            <p className="text-gray-600 mb-6">
              La nostra rivista offre approfondimenti, case study, interviste con professionisti del settore 
              e le ultime novità nel campo dell&apos;architettura sostenibile. Crediamo che l&apos;architettura 
              debba essere in armonia con l&apos;ambiente naturale e contribuire al benessere delle persone.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Cosa facciamo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Rivista
                </h3>
                <p className="text-gray-600">
                  Pubblichiamo articoli di qualità sull&apos;architettura ecologica, interviste con esperti 
                  e analisi di progetti innovativi.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Formazione
                </h3>
                <p className="text-gray-600">
                  Organizziamo master e corsi di formazione per professionisti che vogliono 
                  approfondire le tematiche della bioedilizia.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Webinar
                </h3>
                <p className="text-gray-600">
                  Offriamo seminari online con esperti del settore per condividere conoscenze 
                  e best practices.
                </p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Pubblicazioni
                </h3>
                <p className="text-gray-600">
                  Curiamo e distribuiamo libri, e-books e materiali didattici sul tema 
                  dell&apos;architettura sostenibile.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              Contatti
            </h2>
            <div className="bg-gray-50 p-8 rounded-lg not-prose">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600">info@bioarchitettura.org</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Telefono</h3>
                  <p className="text-gray-600">+39 XXX XXX XXXX</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Indirizzo</h3>
                  <p className="text-gray-600">
                    Fondazione Bioarchitettura<br />
                    Via Example 123<br />
                    00000 Roma, Italia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
