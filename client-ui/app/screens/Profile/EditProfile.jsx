import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { COLORS } from "../../../constants/Constant";
import HeaderScreen from "../../../components/Header/HeaderScreen";
import Input from "../../../components/Input/Input";
import { useAuth } from "../../../context/AuthContext";

const EditProfile = ({ navigation }) => {
  const [edit, setEdit] = useState(false);
  const { removeToken } = useAuth();

  const [currentUser, setCurrentUser] = useState({
    first_name: "",
    last_name: "",
    address: "",
    email: "",
  });

  const change = (field, value) => {
    setCurrentUser((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const ActionButton = ({ icon, title, onPress, danger }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.actionButton, danger && styles.dangerButton]}
    >
      <MaterialIcons
        name={icon}
        size={24}
        color={danger ? COLORS.dangerColor : COLORS.blackTextColor}
        style={styles.actionIcon}
      />
      <Text style={[styles.actionText, danger && styles.dangerText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <HeaderScreen
        nameIcon="edit"
        label="Chỉnh sửa thông tin"
        callback={() => navigation.goBack()}
        handlePress={() => setEdit(!edit)}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../../../assets/images/EngApp.png")}
              style={styles.avatar}
            />
            <Pressable style={styles.editAvatarButton}>
              <MaterialIcons
                name="photo-camera"
                size={20}
                color={COLORS.whiteTextColor}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
          <Input
            value={currentUser.first_name}
            label="Họ"
            holderText="Nhập họ của bạn"
            isLogin
            onChangeHandle={(t) => change("first_name", t)}
          />
          <Input
            value={currentUser.last_name}
            label="Tên"
            holderText="Nhập tên của bạn"
            onChangeHandle={(t) => change("last_name", t)}
            isLogin
          />
          <Input
            value={currentUser.address}
            label="Địa chỉ"
            holderText="Nhập địa chỉ của bạn"
            onChangeHandle={(t) => change("address", t)}
            isLogin
          />
          <Input
            value={currentUser.email}
            label="Email"
            holderText="Nhập email của bạn"
            onChangeHandle={(t) => change("email", t)}
            isLogin
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Cài đặt tài khoản</Text>
          <ActionButton
            icon="password"
            title="Đổi mật khẩu"
            onPress={() => {}}
          />
          <ActionButton
            icon="logout"
            title="Đăng xuất"
            onPress={() => {
              removeToken();
            }}
            danger
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.saveButton}
          onPress={() => {}}
        >
          <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    paddingTop: Platform.OS === "android" ? 26 : 0,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 24,
    backgroundColor: COLORS.sectionBackground,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  avatarContainer: {
    position: "relative",
    padding: 4,
    backgroundColor: COLORS.sectionBackground,
    borderRadius: 70,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editAvatarButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.active,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: COLORS.sectionBackground,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  card: {
    backgroundColor: COLORS.sectionBackground,
    borderRadius: 16,
    padding: 20,
    margin: 16,
    marginTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.blackTextColor,
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.sectionBackground,
    borderRadius: 12,
    marginBottom: 12,
  },
  actionIcon: {
    marginRight: 12,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.blackTextColor,
  },
  dangerButton: {
    backgroundColor: "rgba(255, 59, 48, 0.1)",
  },
  dangerText: {
    color: COLORS.dangerColor,
  },
  saveButton: {
    backgroundColor: COLORS.active,
    margin: 16,
    marginTop: 8,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: COLORS.active,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.whiteTextColor,
  },
});
