import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import HeaderScreen from "../../../components/Header/HeaderScreen";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { authApi, endpoints } from "../../../apis/APIs";
import { useAuth } from "../../../context/AuthContext";
import WordLearnedItem from "../../../components/screens/Word/WordLearnedItem";

const DownloadDetail = ({ route }) => {
  const { collectionId } = route.params;
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const { token } = useAuth();

  const fetchData = async () => {
    try {
      const res = await authApi(token).get(
        endpoints["word-service"]["get-list-by-collection"](collectionId)
      );

      setData(res.data.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ScrollView>
        <HeaderScreen
          label="Các từ vựng đã học"
          callback={() => navigation.goBack()}
        />
        <FlatList
          data={data}
          renderItem={({ item }) => <WordLearnedItem item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={false}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 16,
    marginBottom: 40,
  },
});

export default DownloadDetail;
