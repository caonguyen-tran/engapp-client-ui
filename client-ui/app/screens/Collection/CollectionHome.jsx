import { FlatList, StyleSheet, Text, View, Animated } from "react-native";
import HeaderStack from "../../../components/Header/HeaderStack";
import CollectionItem from "../../../components/screens/Collection/CollectionItem";
import FeatureGrid from "../../../components/screens/Collection/FeatureGrid";
import { useEffect, useState, useRef } from "react";
import { authApi, endpoints } from "../../../apis/APIs";
import { useAuth } from "../../../context/AuthContext";
import LoadingView from "../../../components/lotties/LoadingView";
import { COLORS } from "../../../constants/Constant";
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const HEADER_HEIGHT = 56;

const CollectionHome = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const { token } = useAuth();
  const scrollY = useRef(new Animated.Value(0)).current;

  const fetchData = async (pageNumber = 0) => {
    setLoading(true);

    try {
      const response = await authApi(token).get(endpoints['collection-service']['get-all'](pageNumber));
      const newData = response.data.data;
      setData((prevData) => [...prevData, ...newData]);
    } catch (ex) {
      console.log(ex);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const loadMoreData = () => {
    if (!loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage);
    }
  };

  const renderHeader = () => (
    <View style={styles.headerSection}>
      <Text style={styles.sectionTitle}>Bộ sưu tập</Text>
      <Text style={styles.sectionSubtitle}>Khám phá các bộ sưu tập từ vựng</Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="collections-bookmark" size={64} color={COLORS.primary} />
      <Text style={styles.emptyText}>Chưa có bộ sưu tập nào</Text>
      <Text style={styles.emptySubText}>Hãy tạo bộ sưu tập đầu tiên của bạn</Text>
    </View>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footerLoader}>
        <LoadingView />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.headerContainer}>
          <HeaderStack />
        </View>
        <AnimatedFlatList
          ListHeaderComponent={
            <>
              {renderHeader()}
              <FeatureGrid />
            </>
          }
          data={data}
          renderItem={({ item }) => (
            <CollectionItem item={item} navigation={navigation} />
          )}
          keyExtractor={(item, index) => `collection-${item.id}-${index}`}
          contentContainerStyle={[
            styles.listContainer,
            { paddingTop: HEADER_HEIGHT }
          ]}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  headerContainer: {
    zIndex: 100,
    backgroundColor: COLORS.backgroundColor,
    elevation: 4,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerSection: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.backgroundColor,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.titleColor,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: COLORS.grayColor,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  footerLoader: {
    padding: 20,
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.blackTextColor,
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: COLORS.grayColor,
    marginTop: 8,
  },
});

export default CollectionHome;
