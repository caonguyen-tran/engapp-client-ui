import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { authApi, endpoints } from "../../../apis/APIs";
import { useAuth } from "../../../context/AuthContext";
import DownloadedItem from "./DownloadedItem";
import LoadingView from "../../lotties/LoadingView";

const DownloadedView = ({ navigation }) => {
  const [data, setData] = useState([]);
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await authApi(token).get(
        endpoints["collection-service"]["get-downloaded"]
      );

      console.log(res.data.data.length);
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
    <View style={styles.collectionView}>
      <View style={styles.collectionHeaderView}>
        <Text style={{ fontSize: 20, fontWeight: "600", color: "gray" }}>
          Bộ sưu tập bạn đã tải
        </Text>
      </View>

      {loading ? (
        <LoadingView />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <DownloadedItem item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  content: {
    flex: 1,
    width: "100%",
  },
  listContainer: {
    padding: 16,
    width: "100%",
  },
  collectionView: {
    flex: 1,
    marginTop: 30,
    marginHorizontal: 10,
  },
  collectionHeaderView: {
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});

export default DownloadedView;
