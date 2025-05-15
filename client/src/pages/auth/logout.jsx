import { useEffect } from "react";
import { Navigate  } from "react-router-dom";
import { useAuth } from "./auth";


const Logout = () => {
 const {LogoutUser} = useAuth(); // Assuming you have a context or state management for user
  useEffect(() => {
    LogoutUser();
  }, [LogoutUser]);

  return <Navigate to="/login" />;
};

export default Logout;
