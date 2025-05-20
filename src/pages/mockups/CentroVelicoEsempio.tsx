import { Compass, BookOpen, Waves } from "lucide-react";

export default function CentroVelicoEsempio() {
  return (
    <div className="bg-white text-blue-900">
      {/* Hero Section */}
      <section className="bg-[url('/home-image.jpeg')] bg-cover bg-center text-white py-32 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Lega Navale Italiana – Sezione Desenzano
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Promuoviamo la cultura del mare, la formazione nautica, e il rispetto
          per l’ambiente attraverso progetti e attività rivolti a tutti.
        </p>
      </section>

      {/* Core Values */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          I nostri valori
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <Compass className="mx-auto mb-4 text-blue-700" size={48} />
            <h3 className="text-xl font-semibold mb-2">Cultura del mare</h3>
            <p className="text-sm">
              Diffondiamo la conoscenza del mare e della navigazione come
              patrimonio comune.
            </p>
          </div>
          <div>
            <BookOpen className="mx-auto mb-4 text-blue-700" size={48} />
            <h3 className="text-xl font-semibold mb-2">Formazione</h3>
            <p className="text-sm">
              Organizziamo corsi, laboratori e attività educative per tutte le
              età.
            </p>
          </div>
          <div>
            <Waves className="mx-auto mb-4 text-blue-700" size={48} />
            <h3 className="text-xl font-semibold mb-2">
              Rispetto dell’ambiente
            </h3>
            <p className="text-sm">
              Promuoviamo la salvaguardia dell’ambiente marino e lacustre.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Progetti in evidenza
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Project 1 */}
            <div className="bg-white rounded-2xl shadow p-5">
              <img
                src="home-progetto-vela.jpg"
                alt="Progetto Vela"
                className="rounded-lg mb-4 w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">Scuola di Vela</h3>
              <p className="text-sm">
                Corsi per bambini e adulti, per imparare a navigare in sicurezza
                nelle acque del Garda.
              </p>
            </div>

            {/* Project 2 */}
            <div className="bg-white rounded-2xl shadow p-5">
              <img
                src="home-timone.png"
                alt="Pulizia lago"
                className="rounded-lg mb-4 w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">Pulizia del Lago</h3>
              <p className="text-sm">
                Iniziative ecologiche per mantenere il lago pulito e
                sensibilizzare alla sostenibilità.
              </p>
            </div>

            {/* Project 3 */}
            <div className="bg-white rounded-2xl shadow p-5">
              <img
                src="home-canoe.jpg"
                alt="Giovani marinai"
                className="rounded-lg mb-4 w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">Giovani Marinai</h3>
              <p className="text-sm">
                Programmi educativi per le scuole locali, per trasmettere i
                valori della navigazione.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center bg-white">
        <h2 className="text-3xl font-bold mb-6">Unisciti a noi</h2>
        <p className="text-lg mb-8">
          Diventa socio della Lega Navale Italiana e vivi il lago da
          protagonista.
        </p>
        <a
          href="/contact"
          className="inline-block bg-blue-800 text-white px-6 py-3 rounded-full text-sm hover:bg-blue-700 transition"
        >
          Contattaci
        </a>
      </section>
    </div>
  );
}
