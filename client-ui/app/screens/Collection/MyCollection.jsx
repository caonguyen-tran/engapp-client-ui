import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import HeaderScreen from "../../../components/Header/HeaderScreen";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import EmptyView from "../../../components/lotties/EmptyView";
import { authApi, endpoints } from "../../../apis/APIs";
import { useAuth } from "../../../context/AuthContext";
import CollectionItem from "../../../components/screens/Collection/CollectionItem";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../../constants/Constant";
import { SafeAreaView } from "react-native-safe-area-context";
import SkeletonItemLoading from "../../../components/lotties/SkeletonItemLoading";

const MyCollection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { token } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        let res = await authApi(token).get(
          endpoints["collection-service"]["get-my-collection"]
        );
        setData(res.data.data);
      } catch (ex) {
        console.log(ex);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  const quickActions = [
    {
      id: 1,
      title: "Tạo bộ sưu tập",
      icon: "add-circle-outline",
      color: COLORS.greenIconColor,
      onPress: () => navigation.navigate("CreateCollection"),
    },
    {
      id: 2,
      title: "Tìm kiếm",
      icon: "search",
      color: COLORS.blueIconColor,
      onPress: () => {},
    },
    {
      id: 3,
      title: "Sắp xếp",
      icon: "sort",
      color: COLORS.yellowIconColor,
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.subContainer}>
        <HeaderScreen
          label="Bộ sưu tập của tôi"
          callback={() => navigation.goBack()}
        />
        {loading ? (
          <SkeletonItemLoading />
        ) : (
          <ScrollView style={styles.scrollView}>
            <View style={styles.headerSection}>
              <Text style={styles.title}>Quản lý bộ sưu tập</Text>
              <Text style={styles.subtitle}>
                Tạo và quản lý các bộ sưu tập từ vựng của bạn
              </Text>
            </View>

            <View style={styles.quickActions}>
              {quickActions.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  style={styles.actionButton}
                  onPress={action.onPress}
                >
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: action.color + "20" },
                    ]}
                  >
                    <MaterialIcons
                      name={action.icon}
                      size={24}
                      color={action.color}
                    />
                  </View>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.collectionSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Bộ sưu tập của bạn</Text>
                <Text style={styles.collectionCount}>
                  {data.length} bộ sưu tập
                </Text>
              </View>

              {data.length !== 0 ? (
                <FlatList
                  data={data}
                  renderItem={({ item }) => (
                    <CollectionItem
                      item={item}
                      navigation={navigation}
                      style={styles.collectionItem}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.listContainer}
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <View style={styles.emptyContainer}>
                  <EmptyView />
                  <Text style={styles.emptyText}>
                    Bạn chưa có bộ sưu tập nào
                  </Text>
                  <TouchableOpacity
                    style={styles.createButton}
                    onPress={() => navigation.navigate("CreateCollection")}
                  >
                    <Text style={styles.createButtonText}>
                      Tạo bộ sưu tập mới
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>
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
  scrollView: {
    flex: 1,
    paddingTop: 30,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  headerSection: {
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.titleColor,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    lineHeight: 24,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  actionButton: {
    alignItems: "center",
    width: "30%",
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    color: "#333333",
    textAlign: "center",
  },
  collectionSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333333",
  },
  collectionCount: {
    fontSize: 14,
    color: "#666666",
  },
  listContainer: {
    paddingVertical: 8,
  },
  collectionItem: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: "#666666",
    marginTop: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  createButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createButtonText: {
    color: COLORS.whiteColor,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default MyCollection;
