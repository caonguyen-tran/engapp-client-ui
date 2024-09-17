import { createContext, useContext, useReducer } from "react";
import { DispatchReducer } from "../reducer/Reducer";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [current, dispatch] = useReducer(DispatchReducer, null);

  return (
    <AuthContext.Provider value={{ current, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};