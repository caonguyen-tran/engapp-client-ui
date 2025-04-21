import { View } from "react-native";
import { introStyles } from "./styles/intro.styles";
import IntroLotties from "../../components/lotties/IntroLotties";
import { IntroHeader } from "./components/IntroHeader";
import { StartButton } from "./components/StartButton";

const Intro = ({ navigation }) => {
  const handleStartPress = () => navigation.navigate("Login");

  return (
    <View style={introStyles.container}>
      <IntroHeader />
      <IntroLotties />
      <StartButton onPress={handleStartPress} />
    </View>
  );
};

export default Intro;
