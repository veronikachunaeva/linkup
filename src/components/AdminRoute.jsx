import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AppLoader from "./AppLoader";

export default function AdminRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <AppLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.rol !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
