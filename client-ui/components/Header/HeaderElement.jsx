import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/Instant";
import { AntDesign, Feather, FontAwesome6, MaterialIcons } from "@expo/vector-icons";

const HeaderElement = ({callback, handlePress, textHeader}) => {
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
      }}
    >
      <TouchableOpacity onPress={callback}>
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
