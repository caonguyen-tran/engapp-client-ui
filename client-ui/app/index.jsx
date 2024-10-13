
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../context/AuthContext";
import MainNavigation from "./navigation/MainNavigation";
import { NavigationContainer } from "@react-navigation/native";

const Index = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer independent={true}>
        <AuthProvider>
          <MainNavigation />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Index;
