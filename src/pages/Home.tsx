import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="text-center space-y-10">
        <div>
          <h1 className="text-5xl font-bold text-blue-900">SailMeUp</h1>
          <h2 className="text-2xl text-blue-600 mt-2">
            May the Wind be with You
          </h2>
        </div>

        <div className="flex flex-col gap-6 items-center w-full max-w-xs mx-auto">
          <button
            onClick={() => navigate("/login-velista")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xl font-semibold py-4 rounded-xl shadow-md transition"
          >
            Velista
          </button>
          <button
            onClick={() => navigate("/login-centro-velico")}
            className="w-full bg-white border border-gray-300 text-blue-700 text-xl font-semibold py-4 rounded-xl shadow-md hover:bg-gray-50 transition"
          >
            Centro Velico
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
