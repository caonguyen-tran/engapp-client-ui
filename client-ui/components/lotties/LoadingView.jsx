import React from "react";
import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";

const LoadingView = () => {
  return (
    <LottieView
      source={require("../../assets/lotties_json/loading.json")}
      autoPlay
      loop
      style= {{
        height: 50,
        width: 50,
        marginTop: 20
      }}
    />
  );
};

export default LoadingView;
