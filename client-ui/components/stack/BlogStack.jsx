import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BlogHome from "../screens/Blog/BlogHome";
import { NavigationContainer } from "@react-navigation/native";
import BlogDetail from "../screens/Blog/BlogDetail";

const Stack = createNativeStackNavigator();
const BlogStack = () => {
  return (
    <>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            name="BlogHome"
            component={BlogHome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BlogDetail"
            component={BlogDetail}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default BlogStack;
