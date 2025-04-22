import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { COLORS } from "../../../constants/Constant";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AddCollectionButton = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CreateCollection")}>
        <MaterialIcons
          name="create-new-folder"
          size={30}
          color="white"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.buttonText}>Thêm bộ sưu tập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    height: 120,
  },
  button: {
    backgroundColor: COLORS.itemColor,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    width: "80%",
    height: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default AddCollectionButton;
