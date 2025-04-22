import { AuthProvider } from "../context/AuthContext";
import MainNavigation from "./navigation/MainNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Index = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <MainNavigation />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default Index;
