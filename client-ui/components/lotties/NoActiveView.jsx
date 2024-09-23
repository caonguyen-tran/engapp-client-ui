import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NoActiveView = ({ textAlert, visible }) => {
  const navigation = useNavigation();
  return (
    <View style={{ alignItems: "center", padding: 20, marginTop: 40 }}>
      <LottieView
        source={require("../../assets/lotties_json/noactive.json")}
        autoPlay
        loop
        style={{
          height: 300,
          width: "100%",
          marginVertical: 30,
        }}
      />
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
        {textAlert}
      </Text>
      {visible ? (
        <View style={styles.backBtnContainer}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.navigate("WordHome")}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "white",
                marginRight: 5,
              }}
            >
              Quay về
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#308AFF",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  backBtnContainer: {
    width: "100%",
    marginTop: 40,
  },
});

export default NoActiveView;
