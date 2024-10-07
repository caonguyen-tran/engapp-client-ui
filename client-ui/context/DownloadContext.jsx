import { createContext, useContext, useEffect, useState } from "react";
import { authApi, endpoints } from "../apis/APIs";
import { useAuth } from "./AuthContext";
const DownloadContext = createContext();

export const useDownload = () => useContext(DownloadContext);

export const DownloadProvider = ({ children }) => {
  const [download, setDownload] = useState([]);
  const { token } = useAuth();

  const fetchData = async () => {
    try {
      const res = await authApi(token).get(
        endpoints["collection-service"]["get-downloaded"]
      );

      if (res.data.data.length !== download.length) {
        setDownload(res.data.data);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    fetchData();
  }, [download]);

  return (
    <DownloadContext.Provider
      value={{
        download,
        setDownload,
      }}
    >
      {children}
    </DownloadContext.Provider>
  );
};
