import { useState } from "react";
import { Menu, X } from "lucide-react";
import {Link} from "react-router" 

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Chi siamo", href: "/about" },
  { name: "Barche", href: "/boats" },
  { name: "Prenotazioni", href: "/rentals" },
  { name: "Contatti", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/logo-lni.jpg"
            alt="Lega Navale"
            className="h-10 w-auto"
          />
          <span className="text-xl font-semibold text-blue-900">
            Lega Navale Italiana
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-blue-900 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="hover:text-blue-600 transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-blue-900 focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 shadow">
          <div className="flex flex-col space-y-3 text-blue-900 font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}