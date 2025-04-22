import moment from "moment";
import {
  ActionSheetIOS,
  Alert,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import { useDownload } from "../../../context/DownloadContext";
import { authApi, endpoints } from "../../../apis/APIs";
import { useAuth } from "../../../context/AuthContext";
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from "../../../constants/Constant";

const DownloadedItem = ({ item, navigation }) => {
  const timeAgo = moment(item.downloadAt).fromNow();
  const { token } = useAuth();
  const { setDownload } = useDownload();

  const alertConfirmRemove = (downloadId) => {
    Alert.alert(
      "Xóa bộ sưu tập",
      "Bạn có chắc chắn muốn xóa bộ sưu tập này không?",
      [
        {
          text: "Xóa",
          onPress: () => removeItem(downloadId),
          style: "destructive"
        },
        { 
          text: "Hủy", 
          style: "cancel" 
        },
      ],
      { cancelable: true }
    );
  };

  const handleLongPress = () => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Hủy", "Xóa", "Xem chi tiết"],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            alertConfirmRemove(item.id);
          } else if (buttonIndex === 2) {
            navigation.navigate("DownloadDetail", {
              collectionId: item.collection.id,
            });
          }
        }
      );
    }
  };

  const removeItem = async (downloadId) => {
    try {
      await authApi(token).delete(
        endpoints["collection-service"]["remove-downloaded"](downloadId)
      );

      let res = await authApi(token).get(endpoints['collection-service']['get-downloaded'])
      setDownload(res.data.data)
      Alert.alert("Thông báo", "Xóa thành công!");
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate("DownloadDetail", {
          collectionId: item.collection.id,
        })
      }
      onLongPress={handleLongPress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.collection.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.badge}>
          <MaterialIcons name="cloud-download" size={16} color="#fff" />
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{item.collection.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.collection.description}</Text>
        
        <View style={styles.footer}>
          <View style={styles.timeContainer}>
            <MaterialIcons name="access-time" size={14} color="#666" />
            <Text style={styles.time}>{timeAgo}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.sectionBackground,
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 4,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  moreButton: {
    padding: 4,
  },
});

export default DownloadedItem;
