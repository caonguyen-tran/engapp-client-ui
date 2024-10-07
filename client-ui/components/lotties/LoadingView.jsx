import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";

const LoadingView = () => {
  return (
    <View
      style={{
        height: 100,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LottieView
        source={require("../../assets/lotties_json/loading.json")}
        autoPlay
        loop
        style={{ height: 150, width: 150 }}
      />
    </View>
  );
};

export default LoadingView;
