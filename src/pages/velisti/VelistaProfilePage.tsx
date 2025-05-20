import VelistaProfile from "../../components/VelistaProfile";

const mockUser = {
  name: "Luca",
  surname: "Rossi",
  dateOfBirth: "1990-04-12",
  address: "Via del Mare 12, Genova",
  avatarUrl: "/user/user-avatar.jpg",
  experienceDescription: "Ho navigato per più di 10 anni in diverse condizioni meteo. Esperto in derive e catamarani.",
  coursesCompleted: ["Corso Base", "Corso Intermedio", "Navigazione Notturna"],
  coursesInProgress: ["Corso Avanzato"],
  allowedBoats: ["RS Zest", "RS Quest"],
  licenses: ["Patente Nautica entro 12 miglia"],
  yearsOfExperience: 12
};

const VelistaProfilePage = () => {
  return <VelistaProfile user={mockUser} />;
};

export default VelistaProfilePage;
