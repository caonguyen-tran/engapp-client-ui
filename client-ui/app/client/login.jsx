import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import LoadingView from "../../components/lotties/LoadingView";
import Input from "../../components/Input/Input";
import { useState } from "react";
import { COLORS } from "../../constants/Instant";
import APIs, { endpoints } from "../../apis/APIs";
import { useAuth } from "./../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { saveToken } = useAuth();
  const navigation = useNavigation();

  const login = async () => {
    setLoading(true);
    try {
      const data = { username, password };
      const res = await APIs.post(endpoints["security-service"]["get-token"], data);
      saveToken(res.data.data);
    } catch (ex) {
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
      console.log(ex);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Chào mừng trở lại! 👋</Text>
      <Text style={styles.subText}>Đăng nhập để tiếp tục học tiếng Anh</Text>

      <View style={styles.inputContainer}>
        <Input
          holderText="Tên đăng nhập..."
          error={error}
          label="Tên Đăng Nhập"
          value={username}
          onChangeHandle={setUsername}
          isLogin
        />
        <Input
          holderText="Mật khẩu..."
          error={error}
          label="Mật Khẩu"
          value={password}
          onChangeHandle={setPassword}
          isLogin
          isPassword
        />
        <Pressable
          style={styles.forgotPassword}
          onPress={() => {}}
        >
          <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
        </Pressable>
      </View>

      {loading ? (
        <LoadingView />
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={login}>
          <Text style={styles.loginText}>Đăng Nhập</Text>
        </TouchableOpacity>
      )}

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Bạn chưa có tài khoản?</Text>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerLink}> Đăng ký</Text>
        </Pressable>
      </View>

      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.separatorText}>HOẶC</Text>
        <View style={styles.separator} />
      </View>

      <View style={styles.socialContainer}>
        <Pressable>
          <Image
            source={{ uri: "https://res.cloudinary.com/dndakokcz/image/upload/v1706947907/google_qk8s0c.jpg" }}
            style={styles.socialIcon}
          />
        </Pressable>
        <Pressable>
          <Image
            source={{ uri: "https://res.cloudinary.com/dndakokcz/image/upload/v1706947906/facebook_axwuyw.png" }}
            style={styles.socialIcon}
          />
        </Pressable>
        <Pressable>
          <Image
            source={{ uri: "https://res.cloudinary.com/dndakokcz/image/upload/v1706947965/discord_v6dvbt.png" }}
            style={styles.socialIcon}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.active,
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 12,
  },
  forgotPassword: {
    alignItems: "flex-end",
    marginTop: 6,
  },
  forgotPasswordText: {
    color: COLORS.active,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: COLORS.active,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 10,
    elevation: 4,
    shadowColor: COLORS.active,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  loginText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "700",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  registerText: {
    fontSize: 15,
    color: "#6B7280",
  },
  registerLink: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.active,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: "#D1D5DB",
  },
  separatorText: {
    width: 50,
    textAlign: "center",
    color: "#6B7280",
    fontWeight: "500",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  socialIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginHorizontal: 10,
  },
});
