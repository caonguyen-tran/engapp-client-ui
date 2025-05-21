import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import LoadingView from "../../components/lotties/LoadingView";
import Input from "../../components/Input/Input";
import { useState } from "react";
import APIs, { endpoints } from "../../apis/APIs";
import { useAuth } from "./../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { loginStyles } from "./styles/login.styles";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView style={loginStyles.container}>
      <Text style={loginStyles.headerText}>Chào mừng trở lại! 👋</Text>
      <Text style={loginStyles.subText}>Đăng nhập để tiếp tục học tiếng Anh</Text>

      <View style={loginStyles.inputContainer}>
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
          style={loginStyles.forgotPassword}
          onPress={() => {}}
        >
          <Text style={loginStyles.forgotPasswordText}>Quên mật khẩu?</Text>
        </Pressable>
      </View>

      {loading ? (
        <LoadingView />
      ) : (
        <TouchableOpacity style={loginStyles.loginButton} onPress={login}>
          <Text style={loginStyles.loginText}>Đăng Nhập</Text>
        </TouchableOpacity>
      )}

      <View style={loginStyles.registerContainer}>
        <Text style={loginStyles.registerText}>Bạn chưa có tài khoản?</Text>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={loginStyles.registerLink}> Đăng ký</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Login;
