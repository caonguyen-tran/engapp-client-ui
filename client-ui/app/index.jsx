import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../context/AuthContext";
import MainNavigation from "./navigation/MainNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const Index = () => {
  const access_token = SecureStore.getItem("access-token");

  useEffect(() => {
    console.log(access_token);
  }, []);


  return (
    <SafeAreaProvider>
      <NavigationContainer independent={true}>
        <AuthProvider>
          <MainNavigation/>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Index;
