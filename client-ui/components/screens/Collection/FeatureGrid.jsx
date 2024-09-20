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
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FeatureGrid = () => {
  const navigation = useNavigation()
  const features = [
    {
      key: "ChatGPT",
      icon: "https://res.cloudinary.com/dbvrjuzo4/image/upload/v1726658243/collection-service/trn6cwxrhtf4w8obveqq.webp",
      label: "ChatGPT",
    },
    {
      key: "Ngữ pháp",
      icon: "https://res.cloudinary.com/dbvrjuzo4/image/upload/v1726658243/collection-service/trn6cwxrhtf4w8obveqq.webp",
      label: "Ngữ pháp",
    },
    {
      key: "Đọc sách",
      icon: "open-book",
      label: "Đọc sách",
    },
    {
      key: "Bài tập",
      icon: "https://res.cloudinary.com/dbvrjuzo4/image/upload/v1726658243/collection-service/trn6cwxrhtf4w8obveqq.webp",
      label: "Bài tập",
    },
  ];

  return (
    <View style={styles.grid}>
      {features.map((item) => (
        <TouchableOpacity key={item.key} style={styles.item} onPress={() => navigation.navigate("MyCollection")}>
          <Entypo name="open-book" size={24} color="black" style={{paddingVertical: 10}}/>
          <Text style={styles.itemText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
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
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  itemText: {
    color: "black",
    fontSize: 12
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
    columnGap: 10,
  },
});

export default FeatureGrid;
