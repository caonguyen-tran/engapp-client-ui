import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import WordHome from "../screens/Word/WordHome";
import LearnProcess from "../screens/Word/LearnWord";
import LearnWord from "../screens/Word/LearnWord";
import ChooseListNew from "../screens/Word/ChooseListNew";
import LearnNewWordProcess from "../screens/Word/LearnNewWordProcess";
import MatchByStart from "../screens/Word/MatchByStart";

const Stack = createNativeStackNavigator();
const WordStack = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="ChooseListNew"
          component={ChooseListNew}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LearnWord"
          component={LearnWord}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WordHome"
          component={WordHome}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="LearnNewWordProcess"
          component={LearnNewWordProcess}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MatchByStart"
          component={MatchByStart}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default WordStack;
