import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/Instant";
import IntroLotties from "../../components/lotties/IntroLotties";

const Intro = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>ENGAPP</Text>
        <Text style={styles.slogan}>Học tiếng Anh cùng bạn bè</Text>
      </View>

      <IntroLotties />

      <TouchableOpacity
        style={styles.btnStyle}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.textStyle}>Bắt đầu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
  },
  appName: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.active,
    letterSpacing: 1,
  },
  slogan: {
    fontSize: 18,
    color: "#4B5563",
    marginTop: 6,
    fontWeight: "500",
  },
  btnStyle: {
    backgroundColor: COLORS.active,
    width: "100%",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.active,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  textStyle: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
