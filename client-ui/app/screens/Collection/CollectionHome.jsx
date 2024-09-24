import { ActivityIndicator, FlatList, ScrollView, StyleSheet } from "react-native";
import HeaderStack from "../../../components/Header/HeaderStack";
import CollectionItem from "../../../components/screens/Collection/CollectionItem";
import ReminderView from "../../../components/screens/Collection/ReminderView";
import FeatureGrid from "../../../components/screens/Collection/FeatureGrid";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { authApi, endpoints } from "../../../apis/APIs";
import { useAuth } from "../../../context/AuthContext";
import LoadingView from "../../../components/lotties/LoadingView";

const CollectionHome = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const {token} = useAuth()

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await authApi(token).get(endpoints['collection-service']['get-all'](page))
      
      const newData = response.data.data
      setData((prevData) => [...prevData, ...newData]);
    } catch (ex) {
      console.log(ex);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData(page);
  }, []);

  const loadMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const renderFooter = () => {
    return (
      loading ? 
      <View style={{ padding: 10 }}>
        <LoadingView />
      </View> : null
    );
  };

  return (
    <>
      <HeaderStack />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{justifyContent: "center", alignItems: "center"}}>
          <FeatureGrid />
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <CollectionItem item={item} navigation={navigation}/>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={false}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      </ScrollView>
    </>
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
});

export default CollectionHome;
