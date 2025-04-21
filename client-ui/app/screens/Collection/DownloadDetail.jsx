import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import HeaderScreen from "../../../components/Header/HeaderScreen";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { authApi, endpoints } from "../../../apis/APIs";
import { useAuth } from "../../../context/AuthContext";
import WordLearnedItem from "../../../components/screens/Word/WordLearnedItem";
import NoActiveView from "../../../components/lotties/NoActiveView";
import LoadingView from "../../../components/lotties/LoadingView";
import LearnWordFooter from "../../../components/Footer/LearnWordFooter";

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
          <LearnWordFooter collectionId={collectionId} />
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
  }
});

export default DownloadDetail;
