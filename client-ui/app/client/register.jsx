import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Pressable,
  Image,
} from "react-native";
import Input from "../../components/Input/Input";
import LoadingView from "../../components/lotties/LoadingView";
import APIs, { endpoints } from "../../apis/APIs";
import { COLORS } from "../../constants/Instant";
import LoginStyles from "../../styles/LoginStyles";

const Register = ({ navigation }) => {
  const [info, setInfo] = useState({
    username: "",
    password: "",
    email: "",
    confirm_password: "",
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleError = (field, message) => {
    setError((prev) => ({ ...prev, [field]: message }));
  };

  const change = (field, value) => {
    setInfo((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    setError({});
    let valid = true;

    if (!info.email) {
      handleError("email", "Email không được để trống!");
      valid = false;
    } else if (!info.email.match(/\S+@\S+\.\S+/)) {
      handleError("email", "Email bạn nhập không hợp lệ!");
      valid = false;
    }

    if (!info.username) {
      handleError("username", "Tên đăng nhập không được để trống!");
      valid = false;
    } else if (info.username.length < 8) {
      handleError("username", "Tên đăng nhập phải có ít nhất 8 ký tự!");
      valid = false;
    }

    if (!info.password) {
      handleError("password", "Mật khẩu không được để trống!");
      valid = false;
    } else if (info.password.length < 8) {
      handleError("password", "Mật khẩu phải có ít nhất 8 ký tự!");
      valid = false;
    }

    if (!info.confirm_password) {
      handleError("confirm_password", "Xác nhận mật khẩu không được để trống!");
      valid = false;
    } else if (info.password !== info.confirm_password) {
      handleError("confirm_password", "Mật khẩu xác nhận không trùng khớp!");
      valid = false;
    }

    return valid;
  };

  const commitRegister = async () => {
    setLoading(true);
    try {
      const data = {
        username: info.username,
        password: info.password,
        email: info.email,
      };
      await APIs.post(
        endpoints["user-service"]["user-register"],
        data
      );
      Alert.alert("Đăng ký thành công!");
      navigation.navigate("Login");
    } catch (err) {
      Alert.alert("Lỗi", "Đăng ký thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const register = () => {
    if (validateForm()) {
      commitRegister();
    }
  };

  return (
    <View style={LoginStyles.container}>
      <View style={{ marginBottom: 20 }}>
        <Text style={LoginStyles.headerText}>Tạo tài khoản</Text>
        <Text style={{ fontSize: 16, color: "#818181" }}>
          Tham gia EngApp để bắt đầu hành trình học tiếng Anh!
        </Text>
      </View>

      <ScrollView
        style={LoginStyles.inputContainer}
        showsVerticalScrollIndicator={false}
      >
        <Input
          label="Email"
          value={info.email}
          onChangeHandle={(t) => change("email", t)}
          error={error.email}
          holderText="Email"
        />
        <Input
          label="Tên đăng nhập"
          value={info.username}
          onChangeHandle={(t) => change("username", t)}
          error={error.username}
          holderText="Tên đăng nhập..."
        />
        <Input
          label="Mật khẩu"
          value={info.password}
          onChangeHandle={(t) => change("password", t)}
          isPassword
          error={error.password}
          holderText="Mật khẩu..."
        />
        <Input
          label="Xác nhận mật khẩu"
          value={info.confirm_password}
          onChangeHandle={(t) => change("confirm_password", t)}
          isPassword
          error={error.confirm_password}
          holderText="Nhập lại mật khẩu..."
        />

        {loading ? (
          <LoadingView />
        ) : (
          <TouchableOpacity
            style={LoginStyles.loginButton}
            onPress={register}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center",
                paddingVertical: 12,
              }}
            >
              Đăng ký
            </Text>
          </TouchableOpacity>
        )}

        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 16 }}>
          <Text style={{ fontSize: 16, color: "#818181" }}>Bạn đã có tài khoản?</Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text
              style={{ fontSize: 16, fontWeight: "700", color: COLORS.active }}
            >
              {" "}Đăng nhập
            </Text>
          </Pressable>
        </View>

        <View style={{ marginVertical: 30, flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
          <Text style={{ marginHorizontal: 10, color: "#888" }}>hoặc</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center", gap: 20, paddingBottom: 60 }}>
          {[
            {
              uri: "https://res.cloudinary.com/dndakokcz/image/upload/v1706947907/google_qk8s0c.jpg",
              alt: "Google",
            },
            {
              uri: "https://res.cloudinary.com/dndakokcz/image/upload/v1706947906/facebook_axwuyw.png",
              alt: "Facebook",
            },
            {
              uri: "https://res.cloudinary.com/dndakokcz/image/upload/v1706947965/discord_v6dvbt.png",
              alt: "Discord",
            },
          ].map((social, idx) => (
            <Pressable key={idx} onPress={() => {}}>
              <Image
                source={{ uri: social.uri }}
                style={LoginStyles.imageStyle}
                accessibilityLabel={social.alt}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;
