import { useLocation, useParams } from "react-router";
import VelistaProfile from "../../components/VelistaProfile";
import { useEffect, useState } from "react";
import pb from "../../lib/pocketbase";
import type { RecordModel } from "pocketbase";

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

// const VelistaProfilePage = () => {
//   return <VelistaProfile user={mockUser} />;
// };

const VelistaProfilePage = () => {
  const { id } = useParams();
  const location = useLocation();

  const [profile, setProfile] = useState<RecordModel | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await pb.collection("users").getOne(id || "");
      setProfile(data);
    };

    fetchUser();
  }, [id]);

  if (!profile) return <p>Loading...</p>;

  return (
    <VelistaProfile
      user={{
        name: profile.name,
        surname: profile.surname,
        dateOfBirth: profile.date_of_birth,
        address: profile.address,
        avatarUrl: location.state?.avatar || "", // fallback to avatar from state
        experienceDescription: profile.experience,
        coursesCompleted: profile.courses_completed || [],
        coursesInProgress: profile.courses_in_progress || [],
        allowedBoats: profile.allowed_boats || [],
        licenses: profile.licenses || [],
        yearsOfExperience: profile.years_experience || 0,
      }}
    />
  );
};

export default VelistaProfilePage;