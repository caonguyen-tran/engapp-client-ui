import { Image, View } from "react-native";
import { COLORS } from "../../constants/Constant";
import { FontAwesome6 } from "@expo/vector-icons";

const HeaderStack = ({ nameIcon, label, callback, handlePress }) => {
  return (
    <View
      style={{
        height: 72,
        backgroundColor: COLORS.primary,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 20,
      }}
    >
      <Image
        source={require("../../assets/images/EngApp.png")}
        style={{ height: 70, width: 70 }}
      />
      <View
        style={{
          height: 50,
          width: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FontAwesome6 name="bell" size={24} color="black" />
      </View>
    </View>
  );
};

export default HeaderStack;
