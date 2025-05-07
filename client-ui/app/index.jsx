import { COLORS } from "../constants/Constant";
import { AuthProvider } from "../context/AuthContext";
import MainNavigation from "./navigation/MainNavigation";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return (
    <AuthProvider>
      <MainNavigation />
    </AuthProvider>
  );
};

export default Index;
