import { useState } from "react";
// import { useNavigate } from "react-router";
// import pb from "../../lib/pocketbase";
import { getErrorMessage } from "../../utils/errors";

const CentroVelicoLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      alert("login to centro velico home...");
      //   await pb
      //     .collection("centri_velici_users")
      //     .authWithPassword(email, password);
      //   navigate("/home-centro-velico");
    } catch (err) {
      alert("Login failed: " + getErrorMessage(err));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="bg-blue-50 p-8 rounded-2xl shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Centro Velico Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-blue-200 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 border border-blue-200 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default CentroVelicoLogin;
