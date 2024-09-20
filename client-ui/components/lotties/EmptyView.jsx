import React from "react";
import LottieView from "lottie-react-native";

const EmptyView = () => {
  return (
    <LottieView
      source={require("../../assets/lotties_json/empty.json")}
      autoPlay
      loop
      style= {{
        height: 400,
        width: "100%",
        marginTop: 40
      }}
    />
  );
};

export default EmptyView;