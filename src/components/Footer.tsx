import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-blue-900">
        {/* About */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Lega Navale Italiana</h4>
          <p className="text-sm leading-relaxed">
            Promuoviamo la cultura del mare e offriamo servizi di noleggio
            barche per i nostri soci.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Link Utili</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/boats" className="hover:text-blue-600">
                Barche
              </Link>
            </li>
            <li>
              <Link to="/rentals" className="hover:text-blue-600">
                Prenotazioni
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-600">
                Contatti
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contatti</h4>
          <ul className="text-sm space-y-2">
            <li>📍 Porto di Desenzano del Garda</li>
            <li>📞 +39 030 123 4567</li>
            <li>✉️ info@leganavale.it</li>
            <li>
              <a
                href="https://www.facebook.com/leganavaledesenzano"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t mt-6 pt-4 pb-6 text-center text-xs text-blue-800 bg-white">
        © {new Date().getFullYear()} Lega Navale Italiana – Sezione Desenzano.
        Tutti i diritti riservati.
      </div>
    </footer>
  );
}
