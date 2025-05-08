import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../../constants/Constant";
import HeaderScreen from "../../../components/Header/HeaderScreen";
import { parseBoundingBox } from "../../../utils/common";

const { width } = Dimensions.get("window");

const WordCard = ({ word, onPress }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.wordCard, isExpanded && styles.wordCardExpanded]}
      onPress={() => setIsExpanded(!isExpanded)}
    >
      <View style={styles.wordHeader}>
        <View style={styles.wordTitleContainer}>
          <Text style={styles.wordTitle}>{word.object_name}</Text>
          <View style={styles.confidenceChip}>
            <MaterialIcons name="trending-up" size={14} color={COLORS.active} />
            <Text style={styles.confidenceText}>
              {`${(word.confidence * 100).toFixed(1)}%`}
            </Text>
          </View>
        </View>
        <MaterialIcons
          name={isExpanded ? "expand-less" : "expand-more"}
          size={24}
          color={COLORS.active}
        />
      </View>

      {isExpanded && (
        <View style={styles.wordDetails}>
          <View style={styles.detailItem}>
            <MaterialIcons name="translate" size={20} color={COLORS.active} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Nghĩa</Text>
              <Text style={styles.detailText}>{word.definition}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <MaterialIcons name="lightbulb" size={20} color={COLORS.active} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Ví dụ</Text>
              <Text style={styles.detailText}>{word.example}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <MaterialIcons name="category" size={20} color={COLORS.active} />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Từ loại</Text>
              <Text style={styles.detailText}>
                {word.position_of_speech === "N"
                  ? "Danh từ"
                  : word.position_of_speech}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.learnButton} onPress={onPress}>
            <MaterialIcons name="school" size={20} color="white" />
            <Text style={styles.learnButtonText}>Tìm hiểu thêm</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const DetectionResult = ({ route, navigation }) => {
  const { image, results } = route.params;
  const [loading, setLoading] = useState(true);
  const [detectedObjects, setDetectedObjects] = useState([]);
  const [error, setError] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);

  useEffect(() => {
    if (!image || !results) {
      setError("Missing required data");
      setLoading(false);
      return;
    }

    try {
      const objects = results.objects || [];
      setDetectedObjects(objects);
      setLoading(false);
    } catch (err) {
      console.error("Error processing results:", err);
      setError("Error processing detection results");
      setLoading(false);
    }
  }, [image, results]);

  const handleRetake = () => {
    navigation.navigate("WordHome");
  };

  const handleLearnMore = (word) => {
    if (!results?.history_id) {
      Alert.alert("Error", "Unable to save results. Please try again.");
      return;
    }
    navigation.navigate("DetectionHistoryDetail", { id: results.history_id });
  };

  if (error) {
    return (
      <View style={styles.container}>
        <HeaderScreen
          label="Kết quả nhận diện"
          callback={() => navigation.goBack()}
        />
        <View style={styles.errorContainer}>
          <MaterialIcons
            name="error-outline"
            size={48}
            color={COLORS.errorColor}
          />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetake}>
            <MaterialIcons name="camera-alt" size={24} color="white" />
            <Text style={styles.retryButtonText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <HeaderScreen
          label="Detection Results"
          callback={() => navigation.goBack()}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.active} />
          <Text style={styles.loadingText}>Processing results...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderScreen
        label="Detection Results"
        callback={() => navigation.goBack()}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageSection}>
          <Image
            source={{ uri: image.uri }}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.imageOverlay} />
        </View>

        <View style={styles.summarySection}>
          <View style={styles.summaryCard}>
            <MaterialIcons name="translate" size={32} color={COLORS.active} />
            <Text style={styles.summaryTitle}>
              {detectedObjects.length} Từ được nhận diện
            </Text>
            <Text style={styles.summarySubtitle}>
              Nhấn vào từng từ để tìm hiểu thêm
            </Text>
          </View>
        </View>

        <View style={styles.wordsSection}>
          {detectedObjects.length === 0 ? (
            <View style={styles.noWordsContainer}>
              <MaterialIcons
                name="search-off"
                size={48}
                color={COLORS.subTextColor}
              />
              <Text style={styles.noWordsText}>Không tìm thấy từ nào</Text>
              <Text style={styles.noWordsSubtext}>
                Thử chụp lại hình ảnh với văn bản rõ hơn
              </Text>
            </View>
          ) : (
            detectedObjects.map((word, index) => (
              <WordCard
                key={index}
                word={word}
                onPress={() => handleLearnMore()}
              />
            ))
          )}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.retakeButton]}
            onPress={handleRetake}
          >
            <MaterialIcons
              name="camera-alt"
              size={24}
              color={COLORS.blackIconColor}
            />
            <Text style={[styles.buttonText, styles.retakeButtonText]}>
              Chụp hình ảnh khác{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  scrollView: {
    flex: 1,
  },
  imageSection: {
    height: 200,
    margin: 16,
    borderRadius: 16,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  summarySection: {
    padding: 16,
  },
  summaryCard: {
    backgroundColor: COLORS.sectionBackground,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  summaryTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.titleColor,
    marginTop: 12,
  },
  summarySubtitle: {
    fontSize: 16,
    color: COLORS.subTextColor,
    marginTop: 8,
  },
  wordsSection: {
    padding: 16,
  },
  wordCard: {
    backgroundColor: COLORS.sectionBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  wordCardExpanded: {
    borderColor: COLORS.active,
  },
  wordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wordTitleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  wordTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.titleColor,
    marginRight: 12,
  },
  confidenceChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceText: {
    color: COLORS.active,
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
  wordDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderColor,
  },
  detailItem: {
    flexDirection: "row",
    marginBottom: 16,
  },
  detailContent: {
    flex: 1,
    marginLeft: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.active,
    fontWeight: "600",
    marginBottom: 4,
  },
  detailText: {
    fontSize: 15,
    color: COLORS.subTextColor,
    lineHeight: 22,
  },
  learnButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.active,
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  learnButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  noWordsContainer: {
    alignItems: "center",
    padding: 32,
  },
  noWordsText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.subTextColor,
    marginTop: 16,
  },
  noWordsSubtext: {
    fontSize: 14,
    color: COLORS.subTextColor,
    textAlign: "center",
    marginTop: 8,
  },
  actionButtons: {
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  saveButton: {
    backgroundColor: COLORS.active,
  },
  retakeButton: {
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  buttonText: {
    color: COLORS.whiteTextColor,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  retakeButtonText: {
    color: COLORS.blackIconColor,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.errorColor,
    marginTop: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.active,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  retryButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.subTextColor,
  },
});

export default DetectionResult;
