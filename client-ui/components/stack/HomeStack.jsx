import { Platform, SafeAreaView, Text, View } from "react-native";
import { COLORS } from "../../constants/Instant";
import HeaderStack from "../Header/HeaderStack";

const HomeStack = () => {
  return (
      <View>
        <HeaderStack />
        <Text>Home Stack</Text>
      </View>
  );
};

export default HomeStack;
