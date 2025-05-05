import { StyleSheet, Text, View, Animated } from "react-native";
import HeaderScreen from "../../../components/Header/HeaderScreen";
import CollectionDetailFooter from "../../../components/Footer/CollectionDetailFooter";
import { useEffect, useState, useRef } from "react";
import { authApi, endpoints } from "../../../apis/APIs";
import { useAuth } from "../../../context/AuthContext";
import LoadingView from "../../../components/lotties/LoadingView";
import ListWordView from "../Word/ListWordView";
import NoActiveView from "../../../components/lotties/NoActiveView";
import { useDownload } from "../../../context/DownloadContext";
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from "../../../constants/Constant";

const CollectionDetail = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const { collectionId } = route.params;
  const [isOwner, setIsOwner] = useState(false);
  const { setDownload } = useDownload();
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const ownerRes = await authApi(token).get(
          endpoints["collection-service"]["inspect-owner"](collectionId)
        );
        const wordRes = await authApi(token).get(
          endpoints["word-service"]["get-words-by-collection"](collectionId)
        );

        setData(wordRes.data.data);
        setIsOwner(ownerRes.data.data);
      } catch (ex) {
        console.log(ex);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.98],
    extrapolate: 'clamp',
  });

  const headerElevation = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 3],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.headerContainer,
          {
            opacity: headerOpacity,
            elevation: headerElevation,
          },
        ]}
      >
        {isOwner ? (
          <HeaderScreen
            label="Từ vựng"
            callback={() => navigation.goBack()}
            nameIcon="add"
            handlePress={() =>
              navigation.navigate("CreateNewWord", { collectionId: collectionId })
            }
          />
        ) : (
          <HeaderScreen label="Từ vựng" callback={() => navigation.goBack()} />
        )}
      </Animated.View>

      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <LoadingView />
          </View>
        ) : (
          <View style={styles.content}>
            {data.length !== 0 ? (
              <>
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <MaterialIcons name="folder" size={24} color={COLORS.blackTextColor} />
                    <Text style={styles.statNumber}>{data.length}</Text>
                    <Text style={styles.statLabel}>Từ vựng</Text>
                  </View>
                </View>
                <ListWordView data={data} />
              </>
            ) : (
              <NoActiveView
                textAlert="Không có từ vựng nào trong bộ sưu tập này!"
                visible={false}
              />
            )}
          </View>
        )}
      </Animated.ScrollView>

      {data.length !== 0 && (
        <CollectionDetailFooter
          label="Tải bộ từ"
          navigation={navigation}
          collectionId={collectionId}
          setDownload={setDownload}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  headerContainer: {
    backgroundColor: COLORS.sectionBackground,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: COLORS.sectionBackground,
    marginBottom: 8,
    elevation: 1,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.blackTextColor,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.grayColor,
    marginTop: 4,
  },
});

export default CollectionDetail;
