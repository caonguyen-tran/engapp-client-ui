import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../context/AuthContext";
import { aiApi } from "../../../apis/APIs";
import { endpoints } from "../../../apis/APIs";
import { useEffect, useState } from "react";
import HeaderScreen from "../../../components/Header/HeaderScreen";
import { formatDate, formatTime } from "../../../utils/common";
import { Ionicons } from "@expo/vector-icons";
import LoadingView from "../../../components/lotties/LoadingView";
import { COLORS } from "../../../constants/Constant";
import SkeletonItemLoading from "../../../components/lotties/SkeletonItemLoading";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

const DetectionHistory = () => {
  const navigation = useNavigation();
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { info } = useAuth();

  useEffect(() => {
    const fetchHistories = async () => {
      setLoading(true);
      try {
        const response = await aiApi.get(
          endpoints["image-recognition-service"]["get-histories"](info.id)
        );
        setHistories(response.data.items);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistories();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("DetectionHistoryDetail", { id: item.id })
      }
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <View style={styles.dateBadge}>
            <Ionicons
              name="time-outline"
              size={14}
              color={COLORS.whiteTextColor}
            />
            <Text style={styles.dateBadgeText}>
              {formatDate(item.created_date)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.timeText}>
          {`Lúc ${formatTime(item.created_date)}`}
        </Text>
        <View style={styles.idContainer}>
          <Text style={styles.idText} numberOfLines={1}>
            ID: {item.id}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <View style={styles.headerIconContainer}>
          <Ionicons
            name="camera-outline"
            size={24}
            color={COLORS.yellowIconColor}
          />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Lịch sử nhận diện</Text>
          <Text style={styles.headerSubtitle}>
            {histories.length} hình ảnh đã được nhận diện
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.subContainer}>
        <HeaderScreen
          label="Lịch sử nhận diện"
          callback={() => navigation.navigate("WordHome")}
        />
        {loading ? (
          <SkeletonItemLoading />
        ) : histories.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Ionicons
                name="images-outline"
                size={64}
                color={COLORS.yellowIconColor}
              />
            </View>
            <Text style={styles.emptyText}>Chưa có lịch sử nhận diện</Text>
            <Text style={styles.emptySubText}>
              Bắt đầu sử dụng camera để nhận diện
            </Text>
          </View>
        ) : (
          <FlatList
            data={histories}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={renderHeader}
          />
        )}
      </View>
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
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.sectionBackground,
    padding: 16,
    borderRadius: 12,
    shadowColor: COLORS.shadowColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.yellowIconColor + "20",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
  },
  card: {
    width: CARD_WIDTH,
    margin: 8,
    backgroundColor: COLORS.sectionBackground,
    borderRadius: 16,
    shadowColor: COLORS.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: "relative",
    height: CARD_WIDTH,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 8,
  },
  dateBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dateBadgeText: {
    color: COLORS.whiteTextColor,
    fontSize: 12,
    marginLeft: 4,
    fontWeight: "500",
  },
  cardFooter: {
    padding: 12,
    backgroundColor: COLORS.sectionBackground,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  timeText: {
    fontSize: 12,
    color: COLORS.titleColor,
    marginBottom: 4,
  },
  idContainer: {
    backgroundColor: COLORS.sectionBackground,
    padding: 4,
    borderRadius: 4,
  },
  idText: {
    fontSize: 10,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.yellowIconColor + "20",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});

export default DetectionHistory;
