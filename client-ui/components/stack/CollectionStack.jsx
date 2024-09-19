import { Platform, SafeAreaView, Text, View } from "react-native";
import { COLORS } from "../../constants/Instant";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CollectionHome from "../screens/Collection/CollectionHome";
import CollectionDetail from "../screens/Collection/CollectionDetail";
import { createStackNavigator } from "@react-navigation/stack";
import HeaderStack from "../Header/HeaderStack";

const Stack = createNativeStackNavigator();
const CollectionStack = () => {
  return (
    <>
      <HeaderStack />
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            name="CollectionHome"
            component={CollectionHome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CollectionDetail"
            component={CollectionDetail}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default CollectionStack;
