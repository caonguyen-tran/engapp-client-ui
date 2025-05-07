import { View } from "react-native";
import { introStyles } from "./styles/intro.styles";
import IntroLotties from "../../components/lotties/IntroLotties";
import { IntroHeader } from "./components/IntroHeader";
import { StartButton } from "./components/StartButton";
import { SafeAreaView } from "react-native-safe-area-context";

const Intro = ({ navigation }) => {
  const handleStartPress = () => navigation.navigate("Login");

  return (
    <SafeAreaView style={introStyles.container}>
      <IntroHeader />
      <IntroLotties />
      <StartButton onPress={handleStartPress} />
    </SafeAreaView>
  );
};

export default Intro;
