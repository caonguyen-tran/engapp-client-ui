import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/Instant";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import LoadingView from "../lotties/LoadingView";
import { useAuth } from "../../context/AuthContext";
import { authApi, endpoints } from "../../apis/APIs";

const CollectionDetailFooter = ({ collectionId, label }) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {token} = useAuth()
  const downloadCollection = async () => {
    setLoading(true);
    try {
      console.log(collectionId)
      const res = await authApi(token).post(
        endpoints["collection-service"]["download-collection"](collectionId)
      );

      console.log(res.data.code);

      navigation.navigate("CollectionHome");
      alert("Tải bộ từ vựng thành công.");
    } catch (ex) {
      console.log(ex);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingView />
      ) : (
        <TouchableOpacity
          style={styles.learnButton}
          onPress={() => downloadCollection()}
        >
          <Text style={{ fontSize: 16, fontWeight: "600", marginRight: 10 }}>
            {label}
          </Text>
          <Feather name="book-open" size={24} color="black" />
        </TouchableOpacity>
      )}
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
