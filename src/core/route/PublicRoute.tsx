import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../features/auth/login/presentation/index";
import { routeName } from "./route-name";

const PublicRoute = ({
  redirectPath = `/${routeName.dashboard}/${routeName.users}`,
}) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />; // Render children (public routes)
};

export default PublicRoute;
