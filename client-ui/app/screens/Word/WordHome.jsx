import { useNavigation } from "@react-navigation/native";
import HeaderStack from "../../../components/Header/HeaderStack";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  Modal,
  Pressable,
} from "react-native";
import ReminderView from "../../../components/screens/Collection/ReminderView";
import DownloadedView from "../../../components/screens/Collection/DownloadedView";
import { COLORS } from "./../../../constants/Constant";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";

const { width } = Dimensions.get('window');

const WordHome = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleImagePick = async (type) => {
    try {
      setLoading(true);
      let result;
      
      if (type === 'camera') {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true,
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true,
        });
      }

      if (!result.canceled) {
        navigation.navigate("DetectionCamera", { image: result.assets[0] });
      }
    } catch (error) {
      console.error("Error picking image:", error);
    } finally {
      setLoading(false);
      setShowOptions(false);
    }
  };

  const quickActions = [
    {
      id: 1,
      title: "AI Vision",
      subtitle: "Chụp ảnh hoặc chọn từ thư viện",
      icon: "camera-alt",
      color: COLORS.whiteTextColor,
      onPress: () => setShowOptions(true),
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
            Khám phá thế giới từ vựng qua ống kính AI
          </Text>
        </View>

        <View style={styles.quickActions}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.actionButton}
              onPress={action.onPress}
              activeOpacity={0.9}
              disabled={loading}
            >
              <LinearGradient
                colors={[COLORS.greenColor, COLORS.blueColor]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientContainer}
              >
                <View style={styles.iconContainer}>
                  {loading ? (
                    <ActivityIndicator size="large" color="white" />
                  ) : (
                    <MaterialIcons
                      name={action.icon}
                      size={40}
                      color={action.color}
                    />
                  )}
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                <View style={styles.pulseEffect} />
              </LinearGradient>
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
          </View>
          <TouchableOpacity
            style={styles.scanList}
            onPress={() => navigation.navigate("DetectionHistory")}
            activeOpacity={0.7}
          >
            <View style={styles.scanItem}>
              <MaterialIcons name="photo-camera" size={24} color={COLORS.grayColor} />
              <View style={styles.scanInfo}>
                <Text style={styles.scanTitle}>Quét hình ảnh</Text>
                <Text style={styles.scanTime}>2 phút trước</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={COLORS.grayColor} />
            </View>
          </TouchableOpacity>
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
              shadowColor: COLORS.shadowColor,
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 8,
              elevation: 3,
            }}
            navHandle={() => navigation.navigate("ListWordPractice")}
          />
        </View>

        <View style={styles.downloadedSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bộ sưu tập đã tải</Text>
          </View>
          <DownloadedView navigation={navigation} />
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showOptions}
        onRequestClose={() => setShowOptions(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chọn ảnh</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cameraButton]}
                onPress={() => handleImagePick('camera')}
                disabled={loading}
              >
                <MaterialIcons name="camera-alt" size={24} color="white" />
                <Text style={styles.modalButtonText}>Chụp ảnh mới</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.galleryButton]}
                onPress={() => handleImagePick('gallery')}
                disabled={loading}
              >
                <MaterialIcons name="photo-library" size={24} color="white" />
                <Text style={styles.modalButtonText}>Chọn từ thư viện</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowOptions(false)}
            >
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    fontSize: 28,
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
    color: COLORS.grayColor,
    textAlign: "center",
    lineHeight: 24,
  },
  quickActions: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  actionButton: {
    width: width - 48,
    height: 200,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.whiteTextColor,
    marginBottom: 8,
  },
  actionSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  pulseEffect: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    top: '50%',
    left: '50%',
    marginLeft: -50,
    marginTop: -50,
    zIndex: -1,
  },
  statsCard: {
    backgroundColor: COLORS.sectionBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: COLORS.shadowColor,
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
    color: COLORS.titleColor,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.grayColor,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.lightGrayColor,
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
    shadowColor: COLORS.shadowColor,
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
    color: COLORS.grayColor,
  },
  downloadedSection: {
    paddingHorizontal: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.blackTextColor,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 25,
    minWidth: 140,
    justifyContent: 'center',
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
  cameraButton: {
    backgroundColor: COLORS.active,
  },
  galleryButton: {
    backgroundColor: COLORS.greenColor,
  },
  modalButtonText: {
    color: COLORS.whiteTextColor,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    padding: 16,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.blackTextColor,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WordHome;
