import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";
import { authApi, endpoints } from "../apis/APIs";
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
        const validate = await authApi(tokenValue).post(
          endpoints["security-service"]["validate-token"]
        );
        if (validate.data.data.valid) {
          setToken(tokenValue);
        } else {
          setToken(null);
          await SecureStore.deleteItemAsync("access-token")
        }
      }
    };
    loadToken();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        saveToken,
        removeToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
