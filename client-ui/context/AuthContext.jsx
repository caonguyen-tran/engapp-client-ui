import { createContext, useContext, useEffect, useReducer, useState } from "react";
import * as SecureStore from "expo-secure-store";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const saveToken = async (newToken) => {
    await SecureStore.setItemAsync("access-token", newToken);
    setToken(newToken);
  };

  const removeToken = async () => {
    await SecureStore.deleteItemAsync("access-token");
    setToken(null);
  };

  useEffect(() => {
    const loadToken = async () => {
      const tokenValue = await SecureStore.getItemAsync("access-token");
      if (tokenValue) {
        setToken(tokenValue);
      }
    };
    loadToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token, 
        saveToken,
        removeToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
