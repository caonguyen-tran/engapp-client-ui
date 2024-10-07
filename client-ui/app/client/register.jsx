import { useState } from "react";
import APIs, { endpoints } from "../../apis/APIs";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Input from "../../components/Input/Input";
import LoadingView from "../../components/lotties/LoadingView";
import LoginStyles from "../../styles/LoginStyles";
import { COLORS } from "../../constants/Instant";

const Register = ({ navigation }) => {
  const [info, setInfo] = useState({
    username: "",
    password: "",
    email: "",
    confirm_password: "",
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const register = () => {
    setError({});
    let valid = true;
    if (!info.email) {
      handleError("email", "Email không được để trống!");
      valid = false;
    } else if (!info.email.match(/\S+@\S+\.\S+/)) {
      handleError("email", "Email bạn nhập không phù hợp!");
      valid = false;
    }
    if (!info.username) {
      handleError("username", "Username không được để trống!");
      valid = false;
    } else if (info.username.length < 8) {
      handleError("username", "Số lượng kí tự trong username phải lớn hơn 8!");
      valid = false;
    }
    if (!info.password) {
      handleError("password", "Password không được để trống!");
      valid = false;
    } else if (info.password.length < 8) {
      handleError("password", "Số lượng kí tự trong password phải lớn hơn 8!");
      valid = false;
    }
    if (!info.confirm_password) {
      handleError("confirm_password", "Xác nhận mật khẩu không được để trống!");
      valid = false;
    } else if (info.confirm_password !== info.password) {
      handleError(
        "confirm_password",
        "Password và Confirm Password không trùng nhau!"
      );
      valid = false;
    }
    if (valid) {
      console.log("valid")
      commitRegister();
    }
  };

  const handleError = (input, value) => {
    setError((current_error) => ({ ...current_error, [input]: value }));
  };

  const commitRegister = async () => {
    setLoading(true);
    try {
      let data = {
        username: info.username,
        password: info.password,
        email: info.email,
      };
      console.log(data)
      let res = await APIs.post(endpoints["user-service"]["user-register"], data);
      
      console.log(res.data)
      navigation.navigate("Login");
      Alert.alert("Register succesfully!");
    } catch (ex) {
      setError("Error System!");
    } finally {
      setLoading(false);
    }
  };

  const change = (field, value) => {
    setInfo((current) => {
      return { ...current, [field]: value };
    });
  };
  return (
    <View style={LoginStyles.container}>
      <View>
        <Text style={LoginStyles.headerText}>Tạo tài khoản</Text>
        <Text style={{ fontSize: 16,
            color: "#818181",
            shadowColor: "black" }}>
          Tạo tài khoản để học cùng EngApp
        </Text>
      </View>

      <ScrollView
        style={LoginStyles.inputContainer}
        showsVerticalScrollIndicator={false}
      >
        <Input
          label="Email"
          value={info.email}
          onChangeHandle={(t) => {
            change("email", t);
          }}
          error={error.email}
          holderText="Email"
        />
        <Input
          label="Tên đăng nhập"
          value={info.username}
          onChangeHandle={(t) => {
            change("username", t);
          }}
          error={error.username}
          holderText="Tên đăng nhập..."
        />
        <Input
          label="Mật khẩu"
          value={info.password}
          onChangeHandle={(t) => {
            change("password", t);
          }}
          isPassword
          error={error.password}
          holderText="Mật khẩu..."
        />
        <Input
          label="Xác nhận mật khẩu"
          value={info.confirm_password}
          onChangeHandle={(t) => {
            change("confirm_password", t);
          }}
          isPassword
          error={error.confirm_password}
          holderText="Nhập lại mật khẩu..."
        />
        {loading ? (
          <LoadingView />
        ) : (
          <>
            <TouchableOpacity
              style={LoginStyles.loginButton}
              onPress={register}
            >
              <Text
                style={{
                  fontSize: 24,
                  color: "#fff",
                  fontWeight: "600",
                  lineHeight: 50,
                }}
              >
                Đăng ký
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
            Bạn đã có tài khoản?
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: 700, color: COLORS.active }}
            >
              {" "}
              Đăng nhập
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
            paddingBottom: 60,
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
      </ScrollView>
    </View>
  );
};

export default Register;
