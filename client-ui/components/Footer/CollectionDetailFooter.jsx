import { AntDesign, Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/Instant";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import LoadingView from "../lotties/LoadingView";
import { useAuth } from "../../context/AuthContext";
import { authApi, endpoints } from "../../apis/APIs";

const CollectionDetailFooter = ({ collectionId, label, setDownload }) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { token } = useAuth();

  const downloadCollection = async () => {
    setLoading(true);
    try {
      console.log(collectionId);
      await authApi(token).post(
        endpoints["collection-service"]["download-collection"](collectionId)
      );
      const onwerRes = await authApi(token).get(endpoints['collection-service']['get-my-collection'])
      navigation.navigate("CollectionHome");
      setDownload(onwerRes.data.data)
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
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              marginRight: 10,
              color: "white",
            }}
          >
            {label}
          </Text>
          <AntDesign name="download" size={24} color="white" />
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
    backgroundColor: COLORS.itemColor,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
});

export default CollectionDetailFooter;
