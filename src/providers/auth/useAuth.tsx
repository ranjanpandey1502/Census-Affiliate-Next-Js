import { useContext } from "react";
import AuthContext from "./auth.context";

export default function useAuth() {
  const {
    isLoading,
    setIsLoading,
    setUserInfo,
    signInUser,
    signOutUser,
    userInfo,
    refreshProfile
  } = useContext(AuthContext);

  return {
    isLoading,
    setIsLoading,
    setUserInfo,
    signInUser,
    signOutUser,
    userInfo,
    refreshProfile
  };
}
