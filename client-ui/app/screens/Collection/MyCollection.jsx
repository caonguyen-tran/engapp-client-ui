import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import HeaderScreen from "../../../components/Header/HeaderScreen";
import AddCollectionButton from "../../../components/screens/Collection/AddCollectionButton";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import LoadingView from "../../../components/lotties/LoadingView";
import EmptyView from "../../../components/lotties/EmptyView";
import { authApi, endpoints } from "../../../apis/APIs";
import { useAuth } from "../../../context/AuthContext";
import WordItem from "../../../components/screens/Word/WordItem";
import CollectionItem from "../../../components/screens/Collection/CollectionItem";

const MyCollection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const navigation = useNavigation();
  const { token } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      try {
        let res = await authApi(token).get(
          endpoints["collection-service"]["get-my-collection"]
        );
        setData(res.data.data);
      } catch (ex) {
        console.log(ex);
      }
    };

    fetch();
  }, []);
  return (
    <>
      <HeaderScreen label="Bộ sưu tập của tôi" callback={() => navigation.goBack()}/>
      <ScrollView contentContainerStyle={styles.container}>
        <AddCollectionButton />
        <View style={styles.collectionView}>
          <View style={styles.collectionHeaderView}>
            <Text style={{ fontSize: 20, fontWeight: "600", color: "gray" }}>
              Bộ sưu tập
            </Text>
          </View>
          {loading ? (
            <LoadingView />
          ) : (
            <>
              {data.length !== 0 ? (
                <>
                  <FlatList
                    data={data}
                    renderItem={({ item }) => (
                      <CollectionItem item={item} navigation={navigation} />
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                    scrollEnabled={false}
                  />
                </>
              ) : (
                <EmptyView />
              )}
            </>
          )}
          
        </View>
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

export default MyCollection;
