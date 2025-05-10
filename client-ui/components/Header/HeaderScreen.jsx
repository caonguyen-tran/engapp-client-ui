import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/Constant";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";

const HeaderScreen = ({ nameIcon, label, callback, handlePress }) => {
  return (
    <View
      style={{
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
        borderBottomColor: "rgba(0, 0, 0, 0.05)",
        backgroundColor: COLORS.primary,
      }}
    >
      <TouchableOpacity onPress={callback}>
        <MaterialIcons name="arrow-back-ios-new" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{ fontSize: 24, fontWeight: "600", marginLeft: 16 }}>{label}</Text>
      <TouchableOpacity onPress={handlePress} style={{ marginLeft: "auto", marginRight: 8 }}>
        <FontAwesome6 name={nameIcon} size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderScreen;
