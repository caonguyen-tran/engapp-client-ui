import LottieView from "lottie-react-native";
import { View, Text } from "react-native";
import { COLORS } from "../../constants/Constant";

const DetectionLoading = () => {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LottieView
        source={require("../../assets/lotties_json/detection_loading.json")}
        autoPlay
        loop
        style={{ height: "100%", width: 50 }}
      />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 16, fontWeight: "600", color: COLORS.whiteTextColor }}>
          Đang phân tích...
        </Text>
      </View>
    </View>
  );
};

export default DetectionLoading;
