export default function Boats() {
  const boats = [
    {
      name: "RS Zest",
      image: "/boats/rs-zest.jpg",
      description:
        "Barca compatta ideale per l'apprendimento e il divertimento. Facile da manovrare, perfetta per singoli o coppie.",
      link: "https://www.rssailing.com/project/rs-zest/",
    },
    {
      name: "RS Quest",
      image: "/boats/rs-quest.jpg",
      description:
        "Imbarcazione versatile per piccoli equipaggi o famiglie. Ottima per scuola vela e uscite ricreative.",
      link: "https://www.rssailing.com/project/rs-quest/",
    },
    {
      name: "RS CAT12",
      image: "/boats/rs-cat12.jpg",
      description:
        "Catamarano stabile e veloce, progettato per prestazioni divertenti in sicurezza. Adatto a tutte le età.",
      link: "https://www.rssailing.com/project/rs-cat12/",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-20 text-blue-900">
      <h1 className="text-3xl font-bold text-center mb-12">Le nostre barche</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {boats.map((boat) => (
          <div
            key={boat.name}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={boat.image}
              alt={boat.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2">{boat.name}</h2>
              <p className="text-sm mb-4">{boat.description}</p>
              <a
                href={boat.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 text-sm font-medium"
              >
                Scopri di più →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
