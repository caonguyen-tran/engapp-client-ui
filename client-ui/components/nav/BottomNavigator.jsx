import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileStack from "../stack/ProfileStack";
import CollectionStack from "../stack/CollectionStack";
import WordStack from "../stack/WordStack";
import { CountProvider } from "../../context/CountContext";
import QuizStack from "../stack/QuizStack";
import { DownloadProvider } from "../../context/DownloadContext";
import BlogStack from "../stack/BlogStack";
import { CustomTabBar } from "./CustomTabBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/Constant";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <CountProvider>
      <DownloadProvider>
        <SafeAreaView edges={['left', 'right', 'bottom']}
          style={{ flex: 1, backgroundColor: "white" }}>
          <Tab.Navigator
            tabBar={props => <CustomTabBar {...props} />}
            screenOptions={{
              headerShown: false,
              tabBarHideOnKeyboard: true,
              tabBarStyle: {
                position: 'absolute',
                bottom: Platform.OS === 'ios' ? 20 : 0,
                left: 0,
                right: 0,
                backgroundColor: 'transparent',
              },
            }}
          >
            <Tab.Screen
              name="CollectionStack"
              component={CollectionStack}
              options={{
                tabBarLabel: 'Trang chủ',
              }}
            />
            <Tab.Screen
              name="WordStack"
              component={WordStack}
              options={{
                tabBarLabel: 'Từ vựng',
              }}
            />
            <Tab.Screen
              name="QuizStack"
              component={QuizStack}
              options={{
                tabBarLabel: 'Kiểm tra',
              }}
            />
            <Tab.Screen
              name="BlogStack"
              component={BlogStack}
              options={{
                tabBarLabel: 'Blog',
              }}
            />
            <Tab.Screen
              name="ProfileStack"
              component={ProfileStack}
              options={{
                tabBarLabel: 'Cá nhân',
              }}
            />
          </Tab.Navigator>
        </SafeAreaView>
      </DownloadProvider>
    </CountProvider>
  );
};

export default BottomNavigator;
