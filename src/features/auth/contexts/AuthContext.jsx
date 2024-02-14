import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

import * as authApi from "../../../api/auth";

import { getToken, storeToken, clearToken } from "../../../utils/local-storage";

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (getToken()) {
      authApi
        .fetchMe()
        .then((res) => {
          console.log(res.data);
          setAuthUser(res.data.user);
        })
        .catch((err) => {
          toast.error(err.response?.data.message);
        })
        .finally(() => setInitialLoading(false));
    } else {
      setInitialLoading(false);
    }
  }, []);

  const register = async (user) => {
    const res = await authApi.register(user);
    setAuthUser(res.data.newUser);
    storeToken(res.data.accessToken);
  };

  const login = async (credential) => {
    const res = await authApi.login(credential);
    setAuthUser(res.data.user);
    storeToken(res.data.accessToken);
  };

  const logout = async () => {
    setAuthUser(null);
    clearToken();
  };

  return (
    <AuthContext.Provider
      value={{ authUser, initialLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
