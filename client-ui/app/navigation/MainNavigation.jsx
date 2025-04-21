import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import Login from "../client/login";
import Register from "../client/register";
import Intro from "../client/intro";
import BottomNavigator from "../../components/nav/BottomNavigator";
import { useAuth } from "../../context/AuthContext";
import LoadingScreen from "../screens/Intro/LoadingScreen";

const MainNavigation = () => {
  const Stack = createNativeStackNavigator();
  const { token, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationIndependentTree>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          {!token ? (
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
          ) : (
            <Stack.Screen
              name="BottomNavigator"
              component={BottomNavigator}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
};

export default MainNavigation;
