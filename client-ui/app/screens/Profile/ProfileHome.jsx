import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  ScrollView,
  Pressable,
  Animated,
  StatusBar,
} from "react-native";
import {
  AntDesign,
  FontAwesome6,
  Foundation,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { COLORS } from "../../../constants/Constant";
import { useEffect, useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileOption = ({ icon, title, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View
        style={[
          styles.optionItem,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {icon}
        <Text style={styles.optionText}>{title}</Text>
        <MaterialIcons
          name="arrow-forward-ios"
          size={16}
          color="gray"
          style={styles.arrowIcon}
        />
      </Animated.View>
    </Pressable>
  );
};

const ProfileHome = ({ navigation }) => {
  const { info } = useAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const options = [
    {
      icon: (
        <MaterialCommunityIcons
          name="account-details"
          size={28}
          color={COLORS.itemColor}
        />
      ),
      title: "Thông tin chi tiết",
      onPress: () => navigation.navigate("EditProfile"),
    },
    {
      icon: (
        <MaterialIcons
          name="collections-bookmark"
          size={28}
          color={COLORS.itemColor}
        />
      ),
      title: "Bộ sưu tập từ vựng",
      onPress: () => {},
    },
    {
      icon: <Foundation name="results" size={28} color={COLORS.itemColor} />,
      title: "Kết quả làm bài",
      onPress: () => {},
    },
    {
      icon: <FontAwesome6 name="wallet" size={24} color={COLORS.itemColor} />,
      title: "Từ vựng đã học",
      onPress: () => {},
    },
    {
      icon: <AntDesign name="heart" size={24} color={COLORS.itemColor} />,
      title: "Danh sách yêu thích",
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.headerStyle}>
        <Text style={styles.textHeader}>Profile</Text>
      </View>

      <Animated.View
        style={[
          styles.profileView,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.avatarFrame}>
          <Image
            source={require("../../../assets/images/EngApp.png")}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.username}>{info.username}</Text>
        <Text style={styles.email}>{info.email}</Text>
      </Animated.View>

      <ScrollView
        style={styles.optionView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.optionContent}
      >
        {options.map((option, index) => (
          <ProfileOption
            key={index}
            icon={option.icon}
            title={option.title}
            onPress={option.onPress}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 58,
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  textHeader: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  profileView: {
    paddingVertical: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  avatarFrame: {
    height: 120,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.sectionBackground,
    borderRadius: 60,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.blackTextColor,
    marginTop: 16,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: COLORS.subTextColor,
    marginBottom: 8,
  },
  optionView: {
    flex: 1,
    backgroundColor: COLORS.sectionBackground,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  optionContent: {
    padding: 20,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.blackTextColor,
    marginLeft: 16,
  },
  arrowIcon: {
    marginLeft: 8,
  },
});
