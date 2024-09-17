import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import LoadingView from "../../components/lotties/LoadingView";
import Input from "../../components/static/Input";
import LoginStyles from "../../styles/LoginStyles";
import { useState } from "react";
import { COLORS } from "../../constants/Instant";
import APIs, { endpoints } from "../../apis/APIs";
import { useAuth } from "./../../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, dispatch } = useAuth();

  const login = async ({ navigation }) => {
    setLoading(true);
    try {
      let data = {
        username: username,
        password: password,
      };

      const res = await APIs.post(endpoints["user-login"], data);

      console.log(res.data);

      dispatch({
        type: "login",
        payload: res.data.data,
      });

      navigation.navigate("BottomNavigator");
    } catch (ex) {
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
      console.log(ex);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={LoginStyles.container}>
      <View>
        <Text style={LoginStyles.headerText}>Đăng nhập</Text>
        <Text style={{ fontSize: 16, color: "#818181" }}>
          Nhập tên đăng nhập và mật khẩu để đăng nhập
        </Text>
      </View>

      <View style={LoginStyles.inputContainer}>
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
          style={{
            paddingVertical: 8,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
          onPress={() => {}}
        >
          <Text style={{ color: COLORS.active, fontWeight: "800" }}>
            Quên mật khẩu ?
          </Text>
        </Pressable>
        {loading == true ? (
          <LoadingView />
        ) : (
          <>
            <TouchableOpacity
              style={LoginStyles.loginButton}
              onPress={login}
            >
              <Text
                style={{
                  fontSize: 24,
                  color: "#fff",
                  fontWeight: "600",
                  lineHeight: 50,
                }}
              >
                Đăng Nhập
              </Text>
            </TouchableOpacity>
          </>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: "#818181" }}>
            Bạn chưa có tài khoản?
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: 700, color: COLORS.active }}
            >
              {" "}
              Đăng ký
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 40,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
          <View>
            <Text style={{ width: 50, textAlign: "center" }}>OR</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pressable onPress={() => {}}>
            <Image
              source={{
                uri: "https://res.cloudinary.com/dndakokcz/image/upload/v1706947907/google_qk8s0c.jpg",
              }}
              style={LoginStyles.imageStyle}
            />
          </Pressable>
          <Pressable onPress={() => {}}>
            <Image
              source={{
                uri: "https://res.cloudinary.com/dndakokcz/image/upload/v1706947906/facebook_axwuyw.png",
              }}
              style={LoginStyles.imageStyle}
            />
          </Pressable>
          <Pressable onPress={() => {}}>
            <Image
              source={{
                uri: "https://res.cloudinary.com/dndakokcz/image/upload/v1706947965/discord_v6dvbt.png",
              }}
              style={LoginStyles.imageStyle}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Login;
