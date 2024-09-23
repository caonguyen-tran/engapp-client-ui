import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChooseListNew from "../../app/screens/Word/ChooseListNew";
import WordHome from "./../../app/screens/Word/WordHome";
import LearnNewWordProcess from "../../app/screens/Word/LearnNewWordProcess";
import DownloadDetail from "../../app/screens/Collection/DownloadDetail";
import MatchByWord from "./../../app/screens/Word/MatchByWord";
import ProcessComplete from "../../app/screens/Word/ProcessComplete";

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
          name="ProcessComplete"
          component={ProcessComplete}
          options={{ headerShown: false, gestureEnabled: false }}
        />

        <Stack.Screen
          name="LearnNewWordProcess"
          component={LearnNewWordProcess}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="ChooseListNew"
          component={ChooseListNew}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="MatchByWord"
          component={MatchByWord}
          options={{ headerShown: false, gestureEnabled: false }}
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
