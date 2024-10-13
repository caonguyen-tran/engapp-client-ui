import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/Instant";
import IntroLotties from "../../components/lotties/IntroLotties";

const Intro = ({ navigation }) => {
  return (
    <View style={IntroStyle.container}>
      <Text
        style={{
          color: "black",
          fontSize: 32,
          fontFamily: "arial",
          fontWeight: 600,
          marginTop: 60,
        }}
      >
        ENGAPP
      </Text>
      <Text
        style={{
          color: "black",
          fontSize: 24,
          fontFamily: "arial",
          fontWeight: 600,
        }}
      >
        WITH FRIENDS
      </Text>
      <IntroLotties />
      <TouchableOpacity
        style={IntroStyle.btnStyle}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={IntroStyle.textStyle}>Bắt đầu</Text>
      </TouchableOpacity>
    </View>
  );
};

const IntroStyle = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  btnStyle: {
    backgroundColor: COLORS.active,
    width: "92%",
    height: 56,
    borderRadius: 7,
    marginBottom: 24,
  },
  textStyle: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    lineHeight: 56,
    fontWeight: "600",
  },
  imageStyle: {
    width: 400,
    height: 400,
    marginTop: 100,
  },
});
export default Intro;
