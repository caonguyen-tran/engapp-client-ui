
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CollectionHome from "../../app/screens/Collection/CollectionHome";
import CollectionDetail from "../../app/screens/Collection/CollectionDetail";
import MyCollection from "../../app/screens/Collection/MyCollection";
import CreateCollection from "../../app/screens/Collection/CreateCollection";
import DownloadDetail from "../../app/screens/Collection/DownloadDetail";
import CreateNewWord from "../../app/screens/Collection/CreateNewWord";

const Stack = createNativeStackNavigator();
const CollectionStack = () => {
  return (
    <>
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
            options={{ headerShown: false}}
          />
          <Stack.Screen
            name="MyCollection"
            component={MyCollection}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateCollection"
            component={CreateCollection}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateNewWord"
            component={CreateNewWord}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default CollectionStack;
