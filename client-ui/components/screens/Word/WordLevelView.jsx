import { StyleSheet, Text, View } from "react-native";

const WordLevelView = ({ color, keyLevel }) => {
  return (
    <View key={keyLevel.key} style={styles.container}>
      <View style={{width: 150}}><Text style={{fontSize: 18, fontWeight: "500", color: "#000"}}>Mức độ {keyLevel.key}:</Text></View>
      <View style={[styles.levelColor, { backgroundColor: color }]}>
        <Text style={{ fontSize: 14, fontWeight: "500", color: "#000" }}>{keyLevel.value} từ</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  levelColor: {
    height: 30,
    width: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
});

export default WordLevelView;
