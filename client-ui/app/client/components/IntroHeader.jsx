import { Text, View } from "react-native";
import { introStyles } from "../styles/intro.styles";

export const IntroHeader = () => {
  return (
    <View style={introStyles.header}>
      <Text style={introStyles.appName}>ENGAPP</Text>
      <Text style={introStyles.slogan}>Học tiếng Anh cùng bạn bè</Text>
    </View>
  );
}; 