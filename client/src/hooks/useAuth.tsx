import { createContext, useContext, useMemo } from "react";

import { useLocalStorage } from "./useLocalStorage";

export interface UserAuthData {
  expiry: string;
  token: string;
  firstName: string;
}
export interface AuthContextType {
  authData: UserAuthData;
  login: (authData: UserAuthData, callback?: VoidFunction) => Promise<void>;
  logout: (callback?: VoidFunction) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({
  storedAuthData,
  children,
}: {
  children: React.ReactNode;
  storedAuthData: any;
}) => {
  const [authData, setAuthData] = useLocalStorage("user", storedAuthData);

  const login: AuthContextType["login"] = async (
    authData: UserAuthData,
    callback?: VoidFunction
  ) => {
    setAuthData(authData);
    callback && callback();
  };

  const logout: AuthContextType["logout"] = async (callback?: VoidFunction) => {
    setAuthData(null);
    if (callback) callback();
  };

  const value = useMemo(
    () => ({
      authData,
      login,
      logout,
    }),
    [authData]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
