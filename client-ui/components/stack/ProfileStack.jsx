import { TouchableOpacity } from "react-native"
import { StyleSheet, Text, View } from "react-native"
import { useAuth } from "../../context/AuthContext"
import * as SecureStore from "expo-secure-store"
import { useNavigation } from "@react-navigation/native"

const ProfileStack = () => {
    const {removeToken} = useAuth()
    const logout = () => {
        removeToken()
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.logoutBtn} onPress={() => logout()}>
                <Text>
                    Log out
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logoutBtn: {
        width: 80,
        height: 50,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center"
    }
})
export default ProfileStack