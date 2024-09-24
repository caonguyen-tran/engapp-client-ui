import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuizHome from "../../app/screens/Quiz/QuizHome";


const Stack = createNativeStackNavigator();
const QuizStack = () => {
  return (
    <NavigationContainer independent={true}>
    <Stack.Navigator>
      <Stack.Screen
        name="QuizHome"
        component={QuizHome}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default QuizStack;
