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
  const [info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const saveToken = async (newToken) => {
    setIsLoading(true);
    await SecureStore.setItemAsync("access-token", newToken);
    setToken(newToken);
    setIsLoading(false);
  };

  const removeToken = async () => {
    setIsLoading(true);
    await SecureStore.deleteItemAsync("access-token");
    setToken(null);
    setIsLoading(false);
  };

  useEffect(() => {
    const loadToken = async () => {
      try {
        setIsLoading(true);
        const tokenValue = await SecureStore.getItemAsync("access-token");

        console.log(tokenValue);
        if (tokenValue) {
          const validate = await authApi(tokenValue).post(
            endpoints["security-service"]["validate-token"]
          );
          if (validate.data.data.valid) {
            setToken(tokenValue);
            let res = await authApi(tokenValue).get(
              endpoints["user-service"]["information"]
            );
      
            setInfo({
              username: res.data.data.username,
              email: res.data.data.email,
            });
          } else {
            setToken(null);
            await SecureStore.deleteItemAsync("access-token");
          }
        }
      } catch (error) {
        console.log('Auth error:', error);
        setToken(null);
        await SecureStore.deleteItemAsync("access-token");
      } finally {
        setIsLoading(false);
      }
    };
    loadToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        saveToken,
        removeToken,
        info,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
