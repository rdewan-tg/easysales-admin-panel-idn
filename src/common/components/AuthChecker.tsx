import { Outlet } from "react-router-dom";
import { useAuthStore } from "../../features/auth/login/presentation";
import { useEffect } from "react";

const AuthChecker = () => {
  const checkAuthState = useAuthStore.use.checkAuthState();
  const getMyRoles = useAuthStore.use.getMyRoles();

  useEffect(() => {
    // Check if the user is authenticated on any route access
    const fetchAuthState = async () => {
      await checkAuthState();
    };
    // fetch roles
    const fetchRoles = async () => {
      await getMyRoles();
    };
    // fetch roles
    fetchRoles();
    // Render the nested routes
    fetchAuthState();
  }, [checkAuthState]);

  return <Outlet />;
};

export default AuthChecker;
