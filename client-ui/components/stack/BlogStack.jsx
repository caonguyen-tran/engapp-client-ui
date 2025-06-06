import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import BlogDetail from "../../app/screens/Blog/BlogDetail";
import BlogHome from "../../app/screens/Blog/BlogHome";
import BlogCreate from "../../app/screens/Blog/BlogCreate";

const Stack = createNativeStackNavigator();
const BlogStack = () => {
  return (
    <NavigationIndependentTree>
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
          <Stack.Screen
            name="BlogCreate"
            component={BlogCreate}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
};

export default BlogStack;
