import React from "react";
import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";

const IntroLotties = () => {
  return (
    <LottieView
      source={require("../../assets/lotties_json/intro.json")}
      autoPlay
      loop
      style= {{
        height: 500,
        width: "100%",
        marginTop: 20
      }}
    />
  );
};

export default IntroLotties;
