import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
  Platform,
} from "react-native";
import { COLORS } from "../../constants/Instant";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const LearnWordFooter = ({ collectionId }) => {
  const navigation = useNavigation();
  const [buttonScale] = useState(new Animated.Value(1));

  const animateButton = (pressed) => {
    Animated.spring(buttonScale, {
      toValue: pressed ? 0.95 : 1,
      useNativeDriver: true,
    }).start();
  };

  // Add subtle bounce animation on mount
  useEffect(() => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 1.05,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <MaterialIcons name="school" size={24} color="black" />
          <Text style={styles.infoText}>Sẵn sàng để học</Text>
        </View>

        <Animated.View
          style={[
            styles.buttonContainer,
            {
              transform: [{ scale: buttonScale }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.learnButton}
            onPress={() =>
              navigation.navigate("ChooseListNew", {
                collectionId: collectionId,
              })
            }
            onPressIn={() => animateButton(true)}
            onPressOut={() => animateButton(false)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Bắt đầu học</Text>
            <MaterialIcons
              name="play-circle-filled"
              size={24}
              color="#FFF"
              style={styles.startIcon}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  infoText: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
  },
  buttonContainer: {
    marginLeft: 16,
  },
  learnButton: {
    backgroundColor: COLORS.itemColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 160,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  startIcon: {
    marginLeft: 4,
  },
});

export default LearnWordFooter;
