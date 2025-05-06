import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderScreen from "../../../components/Header/HeaderScreen";
import { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
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

const { width, height } = Dimensions.get("window");
const IMAGE_FRAME_SIZE = width * 0.9;
const IMAGE_PADDING = 20;

const DetectionCamera = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { info } = useAuth();
  const [image, setImage] = useState(route.params?.image || null);
  const [loading, setLoading] = useState(false);
  const [rotation, setRotation] = useState(0);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const rotateImage = async () => {
    if (image) {
      setLoading(true);
      try {
        const rotatedImage = await ImageManipulator.manipulateAsync(
          image.uri,
          [{ rotate: 90 }],
          { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        );
        setImage(rotatedImage);
        setRotation((prev) => (prev + 90) % 360);
      } catch (error) {
        console.error("Error rotating image:", error);
      } finally {
        setLoading(false);
      }
    }
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
      console.log(response.data)
      navigation.navigate("DetectionHistoryDetail", { id: response.data.results.history_id });
    } catch (error) {
      console.error("Error detecting image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderScreen
        label="Nhận diện từ vựng"
        callback={() => navigation.navigate("WordHome")}
      />
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {image ? (
          <ScrollView style={styles.scrollView}>
            <View style={styles.imageSection}>
              <View style={styles.imageFrame}>
                <Image
                  source={{ uri: image.uri }}
                  style={[
                    styles.previewImage,
                    { transform: [{ rotate: `${rotation}deg` }] },
                  ]}
                  resizeMode="contain"
                />
                <View style={styles.frameOverlay} />
              </View>
              <View style={styles.rotationInfo}>
                <MaterialIcons
                  name="rotate-right"
                  size={20}
                  color={COLORS.primary}
                />
                <Text style={styles.rotationText}>Xoay: {rotation}°</Text>
              </View>
            </View>

            <View style={styles.controlsSection}>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.retakeButton]}
                  onPress={() => navigation.navigate("WordHome")}
                >
                  <MaterialIcons name="camera-alt" size={24} color="white" />
                  <Text style={styles.buttonText}>Chụp lại</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.rotateButton]}
                  onPress={rotateImage}
                  disabled={loading}
                >
                  <MaterialIcons name="rotate-right" size={24} color="white" />
                  <Text style={styles.buttonText}>Xoay</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[styles.actionButton, styles.analyzeButton]}
                onPress={detectImage}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={COLORS.whiteTextColor} />
                ) : (
                  <>
                    <MaterialIcons
                      name="search"
                      size={24}
                      color={COLORS.whiteTextColor}
                    />
                    <Text style={styles.buttonText}>Bắt đầu generate</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="camera-alt" size={64} color={COLORS.primary} />
            <Text style={styles.emptyText}>Không có ảnh để hiển thị</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => navigation.navigate("WordHome")}
            >
              <Text style={styles.retryButtonText}>Quay lại</Text>
            </TouchableOpacity>
          </View>
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
  imageSection: {
    alignItems: "center",
    padding: IMAGE_PADDING,
  },
  imageFrame: {
    width: IMAGE_FRAME_SIZE,
    height: IMAGE_FRAME_SIZE,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
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
    borderRadius: 10,
  },
  frameOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius: 20,
  },
  rotationInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    padding: 8,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 20,
  },
  rotationText: {
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.blackTextColor,
    fontWeight: "600",
  },
  controlsSection: {
    padding: IMAGE_PADDING,
    paddingTop: 0,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 25,
    minWidth: 120,
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
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  rotateButton: {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  analyzeButton: {
    backgroundColor: COLORS.active,
    width: "100%",
    padding: 16,
  },
  buttonText: {
    color: COLORS.whiteTextColor,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.blackTextColor,
    marginTop: 16,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 24,
    padding: 16,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    minWidth: 200,
    alignItems: "center",
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
  },
});

export default DetectionCamera;
