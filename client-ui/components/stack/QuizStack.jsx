import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuizHome from "../../app/screens/Quiz/QuizHome";
import DoExamProcess from "../../app/screens/Quiz/DoExamProcess";
import QuizResult from "../../app/screens/Quiz/QuizResult";
import QuizResultDetail from "../../app/screens/Quiz/QuizResultDetail";

const Stack = createNativeStackNavigator();
const QuizStack = () => {
  return (
    <NavigationIndependentTree>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            name="QuizHome"
          component={QuizHome}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="DoExamProcess"
          component={DoExamProcess}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="QuizResult"
          component={QuizResult}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="QuizResultDetail"
          component={QuizResultDetail}
          options={{ headerShown: false, gestureEnabled: false}}
        />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
};

export default QuizStack;
