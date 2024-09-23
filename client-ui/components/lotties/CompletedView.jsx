import LottieView from "lottie-react-native";

const CompletedView = () => {
  return (
    <LottieView
      source={require("../../assets/lotties_json/completed.json")}
      autoPlay
      loop
      style={{
        height: 150,
        width: "100%",
      }}
    />
  );
};

export default CompletedView;
