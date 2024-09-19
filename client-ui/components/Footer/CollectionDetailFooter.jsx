import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/Instant";
import { useNavigation } from "@react-navigation/native";

const CollectionDetailFooter = () => {
  return (
    <View
      style={styles.container}
    >
      <TouchableOpacity style={styles.learnButton}>
        <Text style={{fontSize: 16, fontWeight: "600", marginRight: 10}}>Học ngay</Text>
        <Feather name="book-open" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: COLORS.primary,
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  learnButton: {
    width: 180,
    height: 45,
    backgroundColor: "gray",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
});

export default CollectionDetailFooter;
