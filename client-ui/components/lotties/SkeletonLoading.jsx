import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";

const SkeletonLoading = () => {
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <LottieView
        source={require("../../assets/lotties_json/skeleton_loading.json")}
        autoPlay
        loop
        style={{ height: "70%", width: "100%" }}
      />
    </View>
  );
};

export default SkeletonLoading;
