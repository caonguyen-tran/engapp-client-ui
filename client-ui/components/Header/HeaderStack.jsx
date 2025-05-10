import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../constants/Constant";
import { FontAwesome6 } from "@expo/vector-icons";

const HeaderStack = ({
  headerText,
  rightIcons = [],
  onRightIconPress,
  backgroundColor = COLORS.primary,
  textColor = "white",
  iconColor = "white",
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Left Section */}
      <View style={styles.leftSection}>
        <Text style={[styles.headerText, { color: textColor }]}>
          {headerText}
        </Text>
      </View>

      {/* Right Section */}
      <View style={styles.rightSection}>
        {rightIcons.map((icon, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onRightIconPress?.(index)}
            style={styles.iconButton}
          >
            <FontAwesome6 name={icon} size={24} color={iconColor} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 72,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
    elevation: 0,
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)'
  },
  leftSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600"
  },
  iconButton: {
    marginLeft: 16
  }
});

export default HeaderStack;
