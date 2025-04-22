import { MaterialIcons } from "@expo/vector-icons";
import { Text, View, Animated, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/Constant";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { authApi, endpoints } from "../../apis/APIs";

const CollectionDetailFooter = ({ collectionId, label, setDownload }) => {
  const [loading, setLoading] = useState(false);
  const [buttonScale] = useState(new Animated.Value(1));
  const navigation = useNavigation();
  const { token } = useAuth();

  const animateButton = (pressed) => {
    Animated.spring(buttonScale, {
      toValue: pressed ? 0.95 : 1,
      useNativeDriver: true,
    }).start();
  };

  const downloadCollection = async () => {
    setLoading(true);
    try {
      await authApi(token).post(
        endpoints["collection-service"]["download-collection"](collectionId)
      );
      const ownerRes = await authApi(token).get(endpoints['collection-service']['get-downloaded']);
      setDownload(ownerRes.data.data);
      navigation.navigate("CollectionHome");
      
      // Show success message with animation
      const successMessage = "Tải bộ từ vựng thành công";
      alert(successMessage);
    } catch (error) {
      console.log(error);
      alert("Có lỗi xảy ra khi tải bộ từ vựng");
    } finally {
      setLoading(false);
    }
  };

  // Add subtle bounce animation on mount
  useEffect(() => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 1.05,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <MaterialIcons name="collections-bookmark" size={24} color="black" />
          <Text style={styles.infoText}>Bộ sưu tập từ vựng</Text>
        </View>
        
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              transform: [{ scale: buttonScale }],
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.downloadButton, loading && styles.downloadButtonDisabled]}
            onPress={downloadCollection}
            disabled={loading}
            onPressIn={() => animateButton(true)}
            onPressOut={() => animateButton(false)}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" style={styles.loadingIndicator} />
            ) : (
              <>
                <Text style={styles.buttonText}>{label}</Text>
                <MaterialIcons name="file-download" size={24} color="#FFF" style={styles.downloadIcon} />
              </>
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  buttonContainer: {
    marginLeft: 16,
  },
  downloadButton: {
    backgroundColor: COLORS.itemColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 160,
  },
  downloadButtonDisabled: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  downloadIcon: {
    marginLeft: 4,
  },
  loadingIndicator: {
    marginHorizontal: 8,
  },
});

export default CollectionDetailFooter;
