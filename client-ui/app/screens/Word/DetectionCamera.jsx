import { useNavigation } from "@react-navigation/native";   
import HeaderScreen from "../../../components/Header/HeaderScreen";
import { Text, View } from "react-native";

const DetectionCamera = () => {
    const navigation = useNavigation();
    return (
        <>
            <HeaderScreen
                label="Nhận diện từ vựng"
                callback={() => navigation.navigate("WordHome")}
            />
            <View>
                <Text>Nhận diện</Text>
            </View>
        </>
    )
}

export default DetectionCamera;
