import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChooseListNew from "../../app/screens/Word/ChooseListNew";
import LearnWord from "../../app/screens/Word/LearnWord";
import WordHome from "./../../app/screens/Word/WordHome";
import LearnNewWordProcess from "../../app/screens/Word/LearnNewWordProcess";
import MatchByStart from "./../../app/screens/Word/MatchByStart";
import DownloadDetail from "../../app/screens/Collection/DownloadDetail";

const Stack = createNativeStackNavigator();
const WordStack = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="WordHome"
          component={WordHome}
          options={{ headerShown: false }}
        />
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
          name="LearnNewWordProcess"
          component={LearnNewWordProcess}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MatchByStart"
          component={MatchByStart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
            name="DownloadDetail"
            component={DownloadDetail}
            options={{ headerShown: false }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default WordStack;
