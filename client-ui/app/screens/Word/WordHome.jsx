import { useNavigation } from "@react-navigation/native";
import HeaderStack from "../../../components/Header/HeaderStack";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ReminderView from "../../../components/screens/Collection/ReminderView";
import DownloadedView from "../../../components/screens/Collection/DownloadedView";
import { COLORS } from "./../../../constants/Constant";
import { MaterialIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";

const WordHome = () => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const quickActions = [
    {
      id: 1,
      title: "Chụp ảnh",
      icon: "camera-alt",
      color: COLORS.greenIconColor,
      onPress: () => navigation.navigate("CameraScan"),
    },
    {
      id: 2,
      title: "Thư viện",
      icon: "photo-library",
      color: COLORS.blueIconColor,
      onPress: () => navigation.navigate("ImageLibrary"),
    },
    {
      id: 3,
      title: "Lịch sử",
      icon: "history",
      color: COLORS.yellowIconColor,
      onPress: () => navigation.navigate("ScanHistory"),
    },
  ];

  return (
    <View style={styles.container}>
      <HeaderStack label="Học từ vựng thông minh" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <Text style={styles.title}>Học từ vựng với AI</Text>
          <Text style={styles.subtitle}>
            Chụp ảnh hoặc chọn từ thư viện để học từ vựng mới
          </Text>
        </View>

        <View style={styles.quickActions}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.actionButton}
              onPress={action.onPress}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: action.color + "20" },
                ]}
              >
                <MaterialIcons
                  name={action.icon}
                  size={32}
                  color={action.color}
                />
              </View>
              <Text style={styles.actionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>148</Text>
            <Text style={styles.statLabel}>Từ đã học</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>85%</Text>
            <Text style={styles.statLabel}>Tỷ lệ nhớ</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Lần quét</Text>
          </View>
        </View>

        <View style={styles.recentScans}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Lần quét gần đây</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("ScanHistory")}
            >
            </TouchableOpacity>
          </View>
          <View style={styles.scanList}>
            <View style={styles.scanItem}>
              <MaterialIcons name="photo-camera" size={24} color="#666666" />
              <View style={styles.scanInfo}>
                <Text style={styles.scanTitle}>Quét hình ảnh</Text>
                <Text style={styles.scanTime}>2 phút trước</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#666666" />
            </View>
          </View>
        </View>

        <View style={styles.recentScans}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nhắc nhở ôn tập</Text>
          </View>
          <ReminderView
            custom={{
              width: "100%",
              borderRadius: 16,
              backgroundColor: COLORS.sectionBackground,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 8,
              elevation: 3
            }}
            navHandle={() => navigation.navigate("ListWordPractice")}
          />
        </View>

        <View style={styles.downloadedSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bộ sưu tập đã tải</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("MyCollection")}
            >
              <Text style={styles.seeAll}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <DownloadedView navigation={navigation} />
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
  scrollContent: {
    paddingBottom: 24,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  headerSection: {
    marginBottom: 32,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.titleColor,
    marginBottom: 8,
    textAlign: "center",
  },
  reminderSection: {
    alignItems: "center",
    width: "100%",
    paddingBottom: 30,
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
    paddingHorizontal: 24,
  },
  actionButton: {
    alignItems: "center",
    width: "30%",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    color: "#333333",
    textAlign: "center",
  },
  statsCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
    marginHorizontal: 24,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a237e",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#666666",
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#E0E0E0",
  },
  recentScans: {
    marginBottom: 24,
    paddingHorizontal: 24,
    width: "100%",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  seeAll: {
    fontSize: 14,
    color: COLORS.primary,
  },
  scanList: {
    backgroundColor: COLORS.sectionBackground,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  scanItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  scanInfo: {
    flex: 1,
    marginLeft: 16,
  },
  scanTitle: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 4,
  },
  scanTime: {
    fontSize: 14,
    color: "#666666",
  },
  downloadedSection: {
    paddingHorizontal: 24,
  },
});

export default WordHome;
