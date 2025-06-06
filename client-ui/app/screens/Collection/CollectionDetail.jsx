import { StyleSheet, Text, View, Animated } from "react-native";
import HeaderScreen from "../../../components/Header/HeaderScreen";
import CollectionDetailFooter from "../../../components/Footer/CollectionDetailFooter";
import { useEffect, useState, useRef } from "react";
import { authApi, endpoints } from "../../../apis/APIs";
import { useAuth } from "../../../context/AuthContext";
import ListWordView from "../Word/ListWordView";
import NoActiveView from "../../../components/lotties/NoActiveView";
import { useDownload } from "../../../context/DownloadContext";
import { MaterialIcons } from "@expo/vector-icons";
import SkeletonItemLoading from "../../../components/lotties/SkeletonItemLoading";
import { COLORS } from "../../../constants/Constant";
import { SafeAreaView } from "react-native-safe-area-context";

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
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {isOwner ? (
        <HeaderScreen
          label="Từ vựng"
          callback={() => navigation.goBack()}
          nameIcon="add"
          handlePress={() =>
            navigation.navigate("CreateNewWord", {
              collectionId: collectionId,
            })
          }
        />
      ) : (
        <HeaderScreen label="Từ vựng" callback={() => navigation.goBack()} />
      )}

      {loading ? (
        <View style={styles.content}>
          <SkeletonItemLoading />
        </View>
      ) : (
        <Animated.ScrollView
          style={styles.scrollView}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          <View style={styles.content}>
            {data.length !== 0 ? (
              <>
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <MaterialIcons
                      name="folder"
                      size={24}
                      color={COLORS.blackTextColor}
                    />
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
        </Animated.ScrollView>
      )}

      {data.length !== 0 && (
        <CollectionDetailFooter
          label="Tải bộ từ"
          navigation={navigation}
          collectionId={collectionId}
          setDownload={setDownload}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  subContainer: {
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
    backgroundColor: COLORS.backgroundColor,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
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
    alignItems: "center",
    paddingHorizontal: 24,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
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
