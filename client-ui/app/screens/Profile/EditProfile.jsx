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
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { COLORS } from "../../../constants/Instant";
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
    setCurrentUser((current) => {
      return { ...current, [field]: value };
    });
  };
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS == "android" ? 26 : 0,
        flex: 1,
        backgroundColor: COLORS.primary,
      }}
    >
      <View style={EditProfileStyle.container}>
        <HeaderScreen
          nameIcon="edit"
          label="Chỉnh sửa thông tin"
          callback={() => navigation.goBack()}
          handlePress={() => {
            setEdit(!edit);
          }}
        />
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={EditProfileStyle.avatarView}>
            <Image
              source={require("../../../assets/images/EngApp.png")}
              style={{ height: 90, width: 90, borderRadius: 5 }}
            />
            <Pressable style={EditProfileStyle.editText}>
              <Text style={{ fontWeight: "600", color: "#fff" }}>Edit</Text>
            </Pressable>
          </View>
          <View style={{ marginVertical: 15, justifyContent: "flex-start" }}>
            <Input
              value={currentUser.first_name}
              label="Họ"
              holderText="Họ"
              isLogin
              onChangeHandle={(t) => {
                change("first_name", t);
              }}
            />
            <Input
              value={currentUser.last_name}
              label="Tên"
              holderText="Tên"
              onChangeHandle={(t) => {
                change("last_name", t);
              }}
              isLogin
            />
            <Input
              value={currentUser.address}
              label="Địa chỉ"
              holderText="Địa chỉ"
              onChangeHandle={(t) => {
                change("address", t);
              }}
              isLogin
            />
            <Input
              value={currentUser.email}
              label="Email"
              holderText="Email"
              onChangeHandle={(t) => {
                change("email", t);
              }}
              isLogin
            />
          </View>
          <View
            style={{
              width: "100%",
              height: 180,
              justifyContent: "flex-start",
              padding: 15,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                flexDirection: "row",
                width: "100%",
                height: 56,
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="password"
                size={28}
                color="black"
                style={{ paddingHorizontal: 8 }}
              />
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                Đổi mật khẩu
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                flexDirection: "row",
                width: "100%",
                height: 56,
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              onPress={() => {
                removeToken();
              }}
            >
              <MaterialIcons
                name="logout"
                size={28}
                color="black"
                style={{ paddingHorizontal: 8 }}
              />
              <Text style={{ fontSize: 18, fontWeight: "600", color: "red" }}>
                Đăng xuất
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "100%", height: 120, alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                width: "90%",
                height: 58,
                backgroundColor: COLORS.active,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 6,
                elevation: 20,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "600", color: "white" }}>
                Lưu thay đổi
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

const EditProfileStyle = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    height: "100%",
    alignItems: "center",
  },
  avatarView: {
    width: 110,
    height: 110,
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 20,
    marginTop: 40,
  },
  editText: {
    width: 90,
    height: 20,
    backgroundColor: "#000",
    position: "absolute",
    bottom: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.7,
  },
});
