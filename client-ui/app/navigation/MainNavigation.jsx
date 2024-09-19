import { NavigationContainer } from "@react-navigation/native";
import Login from "../client/login";
import Register from "../client/register";
import Intro from "../client/intro";
import BottomNavigator from "../../components/nav/BottomNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MainNavigation = () => {
  const Stack = createNativeStackNavigator();
  const access_token = SecureStore.getItem("access-token");
  const insets = useSafeAreaInsets();
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
      >
        <NavigationContainer independent={true}>
          <Stack.Navigator>
            {access_token !== null ? (
              <Stack.Screen
                name="BottomNavigator"
                component={BottomNavigator}
                options={{ headerShown: false }}
              />
            ) : (
              <>
                <Stack.Screen
                  name="Intro"
                  component={Intro}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Register"
                  component={Register}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ headerShown: false }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </>
  );
};

export default MainNavigation;
