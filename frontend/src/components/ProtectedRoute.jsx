import { Navigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null; // or a loader/spinner

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Role restriction check
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
