import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  const isLoggedIn = localStorage.getItem("login");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}