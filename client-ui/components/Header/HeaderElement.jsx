import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/Constant";
import { AntDesign, Feather } from "@expo/vector-icons";

const HeaderElement = ({closeHandle, handlePress, textHeader}) => {
  return (
    <View
      style={{
        height: 64,
        backgroundColor: COLORS.primary,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 20,
        elevation: 0,
        shadowColor: "transparent",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0, 0, 0, 0.05)",
      }}
    >
      <TouchableOpacity onPress={closeHandle}>
        <AntDesign name="close" size={24} color="black"/>
      </TouchableOpacity>
      <Text style={{ fontSize: 24, fontWeight: "600" }}>{textHeader}</Text>
      <TouchableOpacity onPress={handlePress}>
        <Feather name="settings" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderElement;
