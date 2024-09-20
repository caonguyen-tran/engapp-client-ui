import { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/Instant";
import ProfileStack from "../stack/ProfileStack";
import HomeStack from "../stack/HomeStack";
import { styleProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import CollectionStack from "../stack/CollectionStack";
import WordStack from "../stack/WordStack";
import { CountProvider } from "../../context/CountContext";

const Tab = createBottomTabNavigator();

const BottomNavigator = ({ navigation }) => {
  useEffect(() => {}, []);
  return (
    <CountProvider>
      <NavigationContainer independent={true}>
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: { height: Platform.OS == "android" ? 58 : 75 },
          }}
        >
          <Tab.Screen
            name="CollectionStack"
            component={CollectionStack}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => {
                return (
                  <AntDesign
                    name="home"
                    size={30}
                    color={focused ? COLORS.activeStrength : COLORS.active}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="WordStack"
            component={WordStack}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => {
                return (
                  <AntDesign
                    name="home"
                    size={30}
                    color={focused ? COLORS.activeStrength : COLORS.active}
                  />
                );
              },
            }}
          />

          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => {
                return (
                  <AntDesign
                    name="home"
                    size={30}
                    color={focused ? COLORS.activeStrength : COLORS.active}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="ProfileStack"
            component={ProfileStack}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => {
                return (
                  <Ionicons
                    name="person-circle-outline"
                    size={30}
                    color={focused ? COLORS.activeStrength : COLORS.active}
                  />
                );
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </CountProvider>
  );
};

export default BottomNavigator;
