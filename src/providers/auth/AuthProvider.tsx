import { jwtDecode } from "jwt-decode";
import { useEffect, useState, type ReactNode } from "react"; 
//
import Spinner from "@/components/common/Spinner";
import LocalStorageService from "@/services/LocalStorage.service";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/utils/config";
import type { UserInfoType } from "./auth.context";
import AuthContext from "./auth.context";


export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  function signOutUser() {
    setIsLoading(false);
    setUserInfo(null);
    LocalStorageService.removeStorageItem(REFRESH_TOKEN_KEY);
    LocalStorageService.removeStorageItem(ACCESS_TOKEN_KEY);
  }
  function signInUser(accessToken: string, refreshToken: string) {
    const decodedToken = jwtDecode(accessToken);
    setUserInfo(decodedToken as UserInfoType);
    LocalStorageService.setStorageItem(REFRESH_TOKEN_KEY, refreshToken);
    LocalStorageService.setStorageItem(ACCESS_TOKEN_KEY, accessToken);
  }
  function refreshProfile(accessToken: string){
    const decodedToken = jwtDecode(accessToken);
    setUserInfo(decodedToken as UserInfoType);
    LocalStorageService.setStorageItem(ACCESS_TOKEN_KEY, accessToken)
  }

  useEffect(() => {
    (() => {
      const accessToken = LocalStorageService.getStorageItem(ACCESS_TOKEN_KEY);
      const refreshToken =
        LocalStorageService.getStorageItem(REFRESH_TOKEN_KEY);
      if (accessToken && refreshToken) {
        try {
          const decodedToken = jwtDecode(accessToken);
          setUserInfo(decodedToken as UserInfoType);
        } catch (error) {
          console.trace(error);
        }
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoading, userInfo, setIsLoading, setUserInfo, signOutUser, signInUser, refreshProfile }}
    >
      {isLoading ? (
        <div className="h-screen w-full flex items-center justify-center dark:text-white">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
