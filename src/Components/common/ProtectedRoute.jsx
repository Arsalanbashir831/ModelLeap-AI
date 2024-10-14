// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import useAuthValidation from "../../hooks/useAuthValidation";


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthValidation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
