import { Text, TouchableOpacity } from "react-native";
import { introStyles } from "../styles/intro.styles";

export const StartButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={introStyles.btnStyle} onPress={onPress}>
      <Text style={introStyles.textStyle}>Bắt đầu</Text>
    </TouchableOpacity>
  );
}; 