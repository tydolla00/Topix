import { useAuth } from "../hooks/useAuth";
import { useOutlet, useLocation, Navigate } from "react-router-dom";

export const ProtectedLayout = () => {
  const { authData } = useAuth();
  const outlet = useOutlet();
  const location = useLocation();

  if (!authData) {
    // Redirect them to the `/` page (login), but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the default home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{outlet}</>;
};
