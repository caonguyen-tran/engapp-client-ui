import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../constants/Constant";
import { useCount } from "../../../context/CountContext";

const ReminderView = ({custom, navHandle}) => {
  const { count } = useCount();

  return (
    <>
      {count > 0 ? (
        <View style={[styles.viewSliderStyle, custom]}>
          <View style={styles.viewContent}>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: "500" }}>
                Đã đến lúc ôn tập
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "600",
                  paddingHorizontal: 5,
                  color: "red",
                }}
              >
                {count}
              </Text>
            </View>
            <TouchableOpacity style={styles.learnButton} onPress={() => navHandle()}>
              <Text style={{ fontSize: 18, fontWeight: "600", color: "#fff" }}>
                Ôn tập ngay
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewImage}>
            <Image
              source={require("../../../assets/images/EngApp.png")}
              style={{ height: 120, width: 150 }}
            />
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  viewSliderStyle: {
    width: "98%",
    height: 200,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightColor,
    borderRadius: 6,
    marginTop: 30,
  },
  viewImage: {
    height: 60,
    paddingLeft: 30,
    display: "flex",
    justifyContent: "center",
  },
  viewContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: 20,
  },
  learnButton: {
    width: 200,
    height: 45,
    backgroundColor: COLORS.itemColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
});

export default ReminderView;
