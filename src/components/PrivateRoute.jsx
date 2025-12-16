import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AppLoader from "./AppLoader";

export default function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
      return <AppLoader />;
    }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
