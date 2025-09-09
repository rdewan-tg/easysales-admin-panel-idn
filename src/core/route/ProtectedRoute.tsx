import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../features/auth/login/presentation/index";
import { routeName } from "./route-name";

const ProtectedRoute = ({ redirectPath = `/${routeName.login}` }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
