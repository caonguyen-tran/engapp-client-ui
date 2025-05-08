import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { aiApi, endpoints } from "../../../apis/APIs";
import { COLORS } from "../../../constants/Constant";
import HeaderScreen from "../../../components/Header/HeaderScreen";
import { parseBoundingBox } from "../../../utils/common";
import SkeletonLoading from "../../../components/lotties/SkeletonLoading";

const DetectionHistoryDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoryDetail = async () => {
      try {
        setLoading(true);
        const response = await aiApi.get(
          endpoints["image-recognition-service"]["get-history-by-id"](id)
        );
        setHistory(response.data.history);
      } catch (error) {
        console.error("Error fetching history detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryDetail();
  }, [id]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.subContainer}>
        <HeaderScreen
          label="Kết quả phát hiện"
          callback={() => navigation.goBack()}
        />
        {loading ? (
          <SkeletonLoading />
        ) : history ? (
          <ScrollView>
            <View style={styles.imageContainer}>
              <View style={styles.imageCard}>
                <Image
                  source={{ uri: history.image }}
                  style={styles.image}
                  resizeMode="contain"
                />
                <View style={styles.imageOverlay} />
              </View>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Icon name="image" size={20} color={COLORS.active} />
                <Text style={styles.statText}>
                  Đối tượng phát hiện: {history.objects.length}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Icon name="calendar-today" size={20} color={COLORS.active} />
                <Text style={styles.statText}>Analysis ID: {history.id}</Text>
              </View>
            </View>

            <View style={styles.objectsContainer}>
              <View style={styles.sectionHeader}>
                <Icon name="auto-awesome" size={24} color={COLORS.active} />
                <Text style={styles.sectionTitle}>Đối tượng phát hiện</Text>
              </View>

              {history.objects.length === 0 ? (
                <View style={styles.noObjectsContainer}>
                  <Icon
                    name="search-off"
                    size={48}
                    color={COLORS.subTextColor}
                  />
                  <Text style={styles.noObjectsText}>
                    Không có đối tượng phát hiện
                  </Text>
                  <Text style={styles.noObjectsSubText}>
                    Hãy phân tích hình ảnh khác
                  </Text>
                </View>
              ) : (
                history.objects.map((object, index) => {
                  const box = parseBoundingBox(object.bounding_box);
                  return (
                    <View key={object.id} style={styles.objectCard}>
                      <View style={styles.objectHeader}>
                        <View style={styles.objectNameContainer}>
                          <Icon name="tag" size={16} color={COLORS.active} />
                          <Text style={styles.objectName}>
                            {object.object_name}
                          </Text>
                        </View>
                        <View style={styles.confidenceChip}>
                          <Icon
                            name="trending-up"
                            size={14}
                            color={COLORS.active}
                          />
                          <Text style={styles.confidenceText}>
                            {`${(object.confidence * 100).toFixed(1)}%`}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.objectDetails}>
                        <View style={styles.detailRow}>
                          <Icon
                            name="translate"
                            size={16}
                            color={COLORS.active}
                          />
                          <Text style={styles.definition}>
                            <Text style={styles.label}>Nghĩa: </Text>
                            {object.definition}
                          </Text>
                        </View>
                        <View style={styles.detailRow}>
                          <Icon
                            name="lightbulb"
                            size={16}
                            color={COLORS.active}
                          />
                          <Text style={styles.example}>
                            <Text style={styles.label}>Ví dụ: </Text>
                            {object.example}
                          </Text>
                        </View>
                        <View style={styles.detailRow}>
                          <Icon
                            name="category"
                            size={16}
                            color={COLORS.active}
                          />
                          <Text style={styles.position}>
                            <Text style={styles.label}>Loại từ: </Text>
                            {object.position_of_speech === "N"
                              ? "Danh từ"
                              : object.position_of_speech}
                          </Text>
                        </View>
                        <View style={styles.detailRow}>
                          <Icon name="crop" size={16} color={COLORS.active} />
                          <Text style={styles.boundingBox}>
                            <Text style={styles.label}>Vị trí nhận diện: </Text>
                            {`(${box.x1}, ${box.y1}) to (${box.x2}, ${box.y2})`}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })
              )}
            </View>
          </ScrollView>
        ) : (
          <View style={styles.errorContainer}>
            <Icon name="error-outline" size={48} color={COLORS.errorColor} />
            <Text style={styles.errorText}>
              Failed to load detection details
            </Text>
          </View>
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.backgroundColor,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.errorColor,
    marginTop: 16,
  },
  title: {
    marginLeft: 16,
    fontSize: 22,
    fontWeight: "600",
    color: COLORS.titleColor,
  },
  imageContainer: {
    padding: 20,
  },
  imageCard: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 8,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(100, 255, 218, 0.05)",
  },
  image: {
    width: "100%",
    height: 300,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(100, 255, 218, 0.05)",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: COLORS.sectionBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.subTextColor,
    fontWeight: "500",
  },
  objectsContainer: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.titleColor,
    marginLeft: 12,
  },
  objectCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    backgroundColor: COLORS.sectionBackground,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  objectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  objectNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  objectName: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.subTextColor,
    marginLeft: 8,
  },
  confidenceChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.sectionBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  confidenceText: {
    color: COLORS.active,
    fontSize: 14,
    marginLeft: 4,
    fontWeight: "600",
  },
  objectDetails: {
    marginTop: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  label: {
    fontWeight: "600",
    color: COLORS.active,
  },
  definition: {
    fontSize: 15,
    color: COLORS.subTextColor,
    marginLeft: 12,
    flex: 1,
    lineHeight: 22,
  },
  example: {
    fontSize: 15,
    color: COLORS.subTextColor,
    marginLeft: 12,
    flex: 1,
    lineHeight: 22,
    fontStyle: "italic",
  },
  position: {
    fontSize: 15,
    color: COLORS.subTextColor,
    marginLeft: 12,
    flex: 1,
    lineHeight: 22,
  },
  boundingBox: {
    fontSize: 15,
    color: COLORS.subTextColor,
    marginLeft: 12,
    flex: 1,
    lineHeight: 22,
  },
  noObjectsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noObjectsText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.subTextColor,
    marginBottom: 16,
  },
  noObjectsSubText: {
    fontSize: 14,
    color: COLORS.subTextColor,
  },
});

export default DetectionHistoryDetail;
