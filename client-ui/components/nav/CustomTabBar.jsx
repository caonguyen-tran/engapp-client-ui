import { View, Text, TouchableOpacity, StyleSheet, Animated, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants/Constant";
import { Entypo, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const TabIcon = ({ name, focused, color }) => {
  const iconSize = 24;
  
  switch (name) {
    case "CollectionStack":
      return <Entypo name="home" size={iconSize} color={color} />;
    case "WordStack":
      return <FontAwesome5 name="language" size={iconSize} color={color} />;
    case "QuizStack":
      return <Entypo name="news" size={iconSize} color={color} />;
    case "BlogStack":
      return <MaterialCommunityIcons name="language-python" size={iconSize} color={color} />;
    case "ProfileStack":
      return <Ionicons name="person-circle-outline" size={iconSize} color={color} />;
    default:
      return null;
  }
};

const TabLabel = ({ name }) => {
  switch (name) {
    case "CollectionStack":
      return "Trang chủ";
    case "WordStack":
      return "Từ vựng";
    case "QuizStack":
      return "Kiểm tra";
    case "BlogStack":
      return "Blog";
    case "ProfileStack":
      return "Cá nhân";
    default:
      return "";
  }
};

export const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabButton}
            >
              <View style={[
                styles.tabContent,
                isFocused && styles.tabContentFocused
              ]}>
                <TabIcon 
                  name={route.name} 
                  focused={isFocused} 
                  color={isFocused ? COLORS.active : COLORS.activeStrength} 
                />
                <Text style={[
                  styles.tabLabel,
                  isFocused && styles.tabLabelFocused
                ]}>
                  <TabLabel name={route.name} />
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: Platform.OS === 'ios' ? 60 : 65,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContent: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
  },
  tabContentFocused: {
    backgroundColor: `${COLORS.active}15`,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    color: COLORS.activeStrength,
    fontWeight: '500',
  },
  tabLabelFocused: {
    color: COLORS.active,
    fontWeight: '600',
  },
}); 