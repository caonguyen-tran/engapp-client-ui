
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileHome from "../../app/screens/Profile/ProfileHome";
import EditProfile from "../../app/screens/Profile/EditProfile";

const Stack = createNativeStackNavigator();
const ProfileStack = () => {
  return (
    <NavigationIndependentTree>
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
    </NavigationIndependentTree>
  );
};
export default ProfileStack;
