import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/Instant";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";

const HeaderScreen = ({ nameIcon, label, callback, handlePress }) => {
  return (
    <View
      style={{
        height: 64,
        backgroundColor: COLORS.primary,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 20
      }}
    >
      <TouchableOpacity onPress={callback}>
        <MaterialIcons name="arrow-back-ios-new" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{ fontSize: 24, fontWeight: "600" }}>{label}</Text>
      <TouchableOpacity onPress={handlePress}>
        <FontAwesome6 name={nameIcon} size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderScreen;
