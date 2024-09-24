import { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/Instant";
import ProfileStack from "../stack/ProfileStack";
import CollectionStack from "../stack/CollectionStack";
import WordStack from "../stack/WordStack";
import { CountProvider } from "../../context/CountContext";
import QuizStack from "../stack/QuizStack";

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
                  <Entypo
                    name="home"
                    size={30}
                    color={focused ? COLORS.active : COLORS.activeStrength}
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
                  <Entypo
                    name="folder"
                    size={30}
                    color={focused ? COLORS.active : COLORS.activeStrength}
                  />
                );
              },
            }}
          />

          <Tab.Screen
            name="QuizStack"
            component={QuizStack}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => {
                return (
                  <Entypo
                    name="news"
                    size={30}
                    color={focused ? COLORS.active : COLORS.activeStrength}
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
                    color={focused ? COLORS.active : COLORS.activeStrength}
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
