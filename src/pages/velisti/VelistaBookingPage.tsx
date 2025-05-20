import { useState } from "react";

interface CentroNautico {
  id: string;
  name: string;
  city: string;
  imageUrl: string;
}

const mockCentriNautici: CentroNautico[] = [
  {
    id: "1",
    name: "Centro Velico di Genova",
    city: "Genova",
    imageUrl: "/centri-velici/genova.jpeg",
  },
  {
    id: "2",
    name: "Scuola Nautica Napoli",
    city: "Napoli",
    imageUrl: "/centri-velici/napoli.jpg",
  },
  {
    id: "3",
    name: "Centro Mare e Vela",
    city: "Bari",
    imageUrl: "/centri-velici/bari.jpg",
  },
  {
    id: "4",
    name: "Velaclub Venezia",
    city: "Venezia",
    imageUrl: "/centri-velici/venezia.jpg",
  },
];

const VelistaBookingPage = () => {
  const [search, setSearch] = useState("");

  const filteredCentri = mockCentriNautici.filter((centro) =>
    `${centro.name} ${centro.city}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">
          Prenota presso un Centro Nautico
        </h1>

        <input
          type="text"
          placeholder="Cerca per nome o città..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-8 p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCentri.map((centro) => (
            <div
              key={centro.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={centro.imageUrl}
                alt={centro.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-blue-800">
                  {centro.name}
                </h2>
                <p className="text-blue-600">{centro.city}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredCentri.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            Nessun centro trovato.
          </p>
        )}
      </div>
    </div>
  );
};

export default VelistaBookingPage;
