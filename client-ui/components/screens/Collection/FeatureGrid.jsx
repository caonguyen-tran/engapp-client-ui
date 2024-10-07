import React from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { COLORS } from "../../../constants/Instant";
import { Entypo, FontAwesome5, Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FeatureGrid = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.grid}>
      <TouchableOpacity
        key="1"
        style={styles.item}
        onPress={() => navigation.navigate("MyCollection")}
      >
        <FontAwesome5
          name="newspaper"
          size={24}
          color="black"
          style={{ paddingVertical: 10 }}
        />
        <Text style={styles.itemText}>Đọc báo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        key="2"
        style={styles.item}
        onPress={() => navigation.navigate("MyCollection")}
      >
        <Foundation
          name="archive"
          size={24}
          color="black"
          style={{ paddingVertical: 10 }}
        />
        <Text style={styles.itemText}>Collection</Text>
      </TouchableOpacity>
      <TouchableOpacity
        key="3"
        style={styles.item}
        onPress={() => navigation.navigate("MyCollection")}
      >
        <Entypo
          name="language"
          size={24}
          color="black"
          style={{ paddingVertical: 10 }}
        />
        <Text style={styles.itemText}>ChatGPT</Text>
      </TouchableOpacity>
      <TouchableOpacity
        key="4"
        style={styles.item}
        onPress={() => navigation.navigate("MyCollection")}
      >
        <Entypo
          name="open-book"
          size={24}
          color="black"
          style={{ paddingVertical: 10 }}
        />
        <Text style={styles.itemText}>Đọc báo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
    marginVertical: 10,
    borderRadius: 15,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  itemText: {
    color: "black",
    fontSize: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
    columnGap: 10,
    marginTop: 10,
  },
});

export default FeatureGrid;
