import { View, StyleSheet, StatusBar } from "react-native";
import { AuthProvider } from "../context/AuthContext";
import MainNavigation from "./navigation/MainNavigation";
import { COLORS } from "../constants/Instant";

const Index = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.primary}
        translucent={true}
      />
      <AuthProvider>
        <MainNavigation />
      </AuthProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 0,
  }
});

export default Index;