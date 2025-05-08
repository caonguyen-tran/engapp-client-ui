import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderScreen from "../../../components/Header/HeaderScreen";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  Dimensions,
  Animated,
  ScrollView,
} from "react-native";
import { aiApi, endpoints } from "../../../apis/APIs";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../../constants/Constant";
import * as ImageManipulator from "expo-image-manipulator";
import { useAuth } from "../../../context/AuthContext";

const { width } = Dimensions.get("window");
const IMAGE_FRAME_SIZE = width * 0.9;
const IMAGE_PADDING = 20;

const HeaderInfo = () => {
  return (
    <View style={styles.headerInfo}>
      <Text style={styles.headerTitle}>Nhận diện hình ảnh</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <MaterialIcons name="auto-awesome" size={20} color={COLORS.active} />
          <Text style={styles.statText}>Nhận diện thông minh</Text>
        </View>
        <View style={styles.statItem}>
          <MaterialIcons name="school" size={20} color={COLORS.active} />
          <Text style={styles.statText}>Học từ vựng</Text>
        </View>
      </View>
    </View>
  );
};

const ImagePreview = ({ image, onRetake }) => {
  return (
    <View style={styles.imageSection}>
      <View style={styles.imageFrame}>
        <Image
          source={{ uri: image.uri }}
          style={styles.previewImage}
          resizeMode="contain"
        />
        <View style={styles.frameOverlay} />
      </View>
      <View style={styles.imageTips}>
        <MaterialIcons name="lightbulb" size={20} color={COLORS.yellowIconColor} />
        <Text style={styles.tipsText}>
          Đảm bảo hình ảnh rõ nét và đủ sáng để nhận diện tốt hơn
        </Text>
      </View>
    </View>
  );
};

const ActionButtons = ({ onRetake, onAnalyze, loading }) => {
  return (
    <View style={styles.controlsSection}>
      <TouchableOpacity
        style={[styles.actionButton, styles.analyzeButton]}
        onPress={onAnalyze}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.whiteTextColor} />
        ) : (
          <>
            <MaterialIcons
              name="auto-awesome"
              size={24}
              color={COLORS.whiteTextColor}
            />
            <Text style={styles.buttonText}>Bắt đầu phân tích</Text>
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.retakeButton]}
        onPress={onRetake}
      >
        <MaterialIcons name="camera-alt" size={24} color={COLORS.blackIconColor} />
        <Text style={[styles.buttonText, styles.retakeButtonText]}>Chụp lại</Text>
      </TouchableOpacity>
    </View>
  );
};

const EmptyState = ({ onRetake }) => {
  return (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <MaterialIcons name="camera-alt" size={64} color={COLORS.active} />
      </View>
      <Text style={styles.emptyTitle}>Không có hình ảnh được chọn</Text>
      <Text style={styles.emptyDescription}>
        Chụp ảnh để học từ mới và cải thiện tiếng Anh của bạn
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetake}>
        <MaterialIcons name="camera-alt" size={24} color="white" />
        <Text style={styles.retryButtonText}>Take Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

const DetectionCamera = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { info } = useAuth();
  const [image, setImage] = useState(route.params?.image || null);
  const [loading, setLoading] = useState(false);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleRetake = () => {
    navigation.navigate("WordHome");
  };

  const detectImage = async () => {
    if (!image) return;
    setLoading(true);

    try {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ resize: { width: 800 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );

      const formData = new FormData();
      formData.append("image", {
        uri: manipulatedImage.uri,
        name: "compressed.jpg",
        type: "image/jpeg",
      });
      formData.append("user_id", info.id.toString());

      const response = await aiApi.post(
        endpoints["image-recognition-service"]["detect-image"],
        formData
      );

      navigation.navigate("DetectionResult", {
        image: image,
        results: response.data.results
      });
    } catch (error) {
      console.error("Error detecting image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderScreen
        label="Nhận diện hình ảnh"
        callback={() => navigation.navigate("WordHome")}
      />
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {image ? (
          <ScrollView style={styles.scrollView}>
            <HeaderInfo />
            <ImagePreview image={image} onRetake={handleRetake} />
            <ActionButtons
              onRetake={handleRetake}
              onAnalyze={detectImage}
              loading={loading}
            />
          </ScrollView>
        ) : (
          <EmptyState onRetake={handleRetake} />
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  headerInfo: {
    padding: IMAGE_PADDING,
    paddingBottom: 0,
    alignItems: "center",
  },
  headerIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(0,0,0,0.03)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.blackTextColor,
    marginBottom: 8,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    marginBottom: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.03)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  statText: {
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.blackTextColor,
    fontWeight: "500",
  },
  imageSection: {
    alignItems: "center",
    padding: IMAGE_PADDING,
  },
  imageFrame: {
    width: IMAGE_FRAME_SIZE,
    height: IMAGE_FRAME_SIZE,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
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
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  frameOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius: 16,
  },
  imageTips: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.03)",
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
    width: "100%",
  },
  tipsText: {
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.blackTextColor,
    flex: 1,
  },
  controlsSection: {
    padding: IMAGE_PADDING,
    paddingTop: 0,
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    justifyContent: "center",
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
  retakeButton: {
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  analyzeButton: {
    backgroundColor: COLORS.active,
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(0,0,0,0.03)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.blackTextColor,
    marginBottom: 12,
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: 16,
    color: COLORS.blackTextColor,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
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
});

export default DetectionCamera;
