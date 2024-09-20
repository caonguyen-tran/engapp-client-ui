import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileHome from "../../app/screens/Profile/ProfileHome";
import EditProfile from "../../app/screens/Profile/EditProfile";

const Stack = createNativeStackNavigator();
const ProfileStack = () => {
  const { removeToken } = useAuth();
  const logout = () => {
    removeToken();
  };

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="ProfileHome"
          component={ProfileHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutBtn: {
    width: 80,
    height: 50,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ProfileStack;
