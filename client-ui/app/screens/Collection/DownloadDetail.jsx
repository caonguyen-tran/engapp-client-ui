import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import HeaderScreen from "../../../components/Header/HeaderScreen";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { authApi, endpoints } from "../../../apis/APIs";
import { useAuth } from "../../../context/AuthContext";
import WordLearnedItem from "../../../components/screens/Word/WordLearnedItem";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../../constants/Instant";
import { TouchableOpacity } from "react-native";
import NoActiveView from "../../../components/lotties/NoActiveView";
import LoadingView from "../../../components/lotties/LoadingView";

const DownloadDetail = ({ route }) => {
  const { collectionId } = route.params;
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await authApi(token).get(
        endpoints["word-service"]["get-list-by-collection"](collectionId)
      );

      setData(res.data.data);
      console.log(res.data.data);
    } catch (ex) {
      console.log(ex);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <HeaderScreen
        label="Các từ vựng đã học"
        callback={() => navigation.goBack()}
      />
      {loading ? (
        <LoadingView />
      ) : data.length === 0 ? (
        <NoActiveView
          textAlert="Không có từ vựng nào trong bộ sưu tập này!"
          visible={true}
        />
      ) : (
        <>
          <ScrollView>
            <FlatList
              data={data}
              renderItem={({ item }) => <WordLearnedItem item={item} />}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer}
              scrollEnabled={false}
            />
          </ScrollView>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.learnButton}
              onPress={() =>
                navigation.navigate("ChooseListNew", {
                  collectionId: collectionId,
                })
              }
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  marginRight: 10,
                  color: "#fff",
                }}
              >
                Bắt đầu học
              </Text>
              <Feather name="book-open" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 16,
    marginBottom: 40,
  },
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

export default DownloadDetail;
