import { createContext, useContext, useEffect, useState } from "react";
import { authApi, endpoints } from "../apis/APIs";
import { useAuth } from "./AuthContext";
const CountContext = createContext();

export const useCount = () => useContext(CountContext);

export const CountProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  const { token } = useAuth();

  const fetchData = async () => {
    try {
      const res = await authApi(token).get(
        endpoints["word-service"]["get-list-by-review"](false)
      );

      if (res.data.data.length !== count) {
        setCount(res.data.data.length);
      }
      
    } catch (ex) {
      console.log(ex);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [count]);

  return (
    <CountContext.Provider
      value={{
        count,
        setCount,
      }}
    >
      {children}
    </CountContext.Provider>
  );
};
