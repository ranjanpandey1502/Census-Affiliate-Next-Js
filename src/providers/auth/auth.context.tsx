import { createContext } from "react";

export type UserInfoType = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  phone_no?: string;
  password_modified_date?: string;
};
export type AuthContextType = {
  userInfo: UserInfoType | null;
  isLoading: boolean;
  setIsLoading: (newValue: boolean) => void;
  setUserInfo: (userInfo: UserInfoType) => void;
  signOutUser: () => void;
  signInUser: (accessToken: string, refreshToken: string) => void;
  refreshProfile: (accessToken: string) => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoading: true,
  userInfo: null,
  setIsLoading: () => null,
  setUserInfo: () => null,
  signOutUser: () => null,
  signInUser: () => null,
  refreshProfile: () => null,
});

export default AuthContext;
