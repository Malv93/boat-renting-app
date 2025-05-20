import React from "react";

interface VelistaProfileProps {
  user: {
    name: string;
    surname: string;
    dateOfBirth: string;
    address: string;
    avatarUrl: string;
    experienceDescription: string;
    coursesCompleted: string[];
    coursesInProgress: string[];
    allowedBoats: string[];
    licenses: string[];
    yearsOfExperience: number;
  };
}

const VelistaProfile: React.FC<VelistaProfileProps> = ({ user }) => {
  return (
    <div className="min-h-screen bg-blue-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden">
        <div className="flex flex-col md:flex-row p-8">
          <div className="flex flex-col items-center md:w-1/3 text-center md:text-left">
            <img
              src={user.avatarUrl}
              alt={`${user.name} ${user.surname}`}
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-300"
            />
            <h2 className="text-2xl font-bold text-blue-800 mt-4">
              {user.name} {user.surname}
            </h2>
            <p className="text-blue-600 mt-1">{user.dateOfBirth}</p>
            <p className="text-blue-500 text-sm mt-1">{user.address}</p>
          </div>

          <div className="md:w-2/3 mt-8 md:mt-0 md:pl-8 space-y-6">
            <section>
              <h3 className="text-xl font-semibold text-blue-700">
                Esperienza
              </h3>
              <p className="text-gray-700 mt-1">{user.experienceDescription}</p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-700">
                Corsi Completati
              </h3>
              <ul className="list-disc list-inside text-gray-700">
                {user.coursesCompleted.map((course, idx) => (
                  <li key={idx}>{course}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-700">
                Corsi in Corso
              </h3>
              <ul className="list-disc list-inside text-gray-700">
                {user.coursesInProgress.map((course, idx) => (
                  <li key={idx}>{course}</li>
                ))}
              </ul>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-blue-700">
                  Barche Autorizzate
                </h3>
                <ul className="list-disc list-inside text-gray-700">
                  {user.allowedBoats.map((boat, idx) => (
                    <li key={idx}>{boat}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-700">Patenti</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {user.licenses.map((license, idx) => (
                    <li key={idx}>{license}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-blue-700">
                Anni di Esperienza
              </h3>
              <p className="text-gray-700">{user.yearsOfExperience} anni</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VelistaProfile;
