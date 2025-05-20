import { Navigate } from "react-router";
import pb from "../lib/pocketbase";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!pb.authStore.isValid) {
    return <Navigate to="/login-velista" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;