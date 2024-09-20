import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import {
  AntDesign,
  FontAwesome5,
  FontAwesome6,
  Foundation,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { COLORS } from "../../../constants/Instant";

const ProfileHome = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS == "android" ? 26 : 0,
        flex: 1,
        backgroundColor: COLORS.primary,
      }}
    >
      <View style={styles.headerStyle}>
        <Text style={styles.textHeader}>Profile</Text>
      </View>
      <View style={styles.profileView}>
        <View style={styles.avatarFrame}>
          <Image
            source={require("../../../assets/images/EngApp.png")}
            style={{ height: 90, width: 90, borderRadius: 5 }}
          />
        </View>
        <Text style={{ fontSize: 22, fontWeight: "600", paddingVertical: 6 }}>
          nguyen
        </Text>
        <Text style={{ fontSize: 16, color: "gray" }}>nguyen@email.com</Text>
      </View>
      <ScrollView
        style={styles.optionView}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          style={styles.optionItem}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <MaterialCommunityIcons
            name="account-details"
            size={32}
            color={COLORS.itemColor}
            style={{ width: 40, marginLeft: 10 }}
          />
          <Text
            style={{
              textAlign: "left",
              flex: 1,
              fontSize: 18,
              fontWeight: "600",
              marginLeft: 8,
            }}
          >
            Thông tin chi tiết
          </Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color="gray"
            style={{ padding: 10 }}
          />
        </Pressable>
        <Pressable style={styles.optionItem}>
          <MaterialIcons
            name="collections-bookmark"
            size={26}
            color={COLORS.itemColor}
            style={{ width: 40, marginLeft: 10 }}
          />
          <Text
            style={{
              textAlign: "left",
              flex: 1,
              fontSize: 18,
              fontWeight: "600",
              marginLeft: 8,
            }}
          >
            Bộ sưu tập từ vựng
          </Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color="gray"
            style={{ padding: 10 }}
          />
        </Pressable>
        <Pressable style={styles.optionItem}>
          <Foundation
            name="results"
            size={26}
            color={COLORS.itemColor}
            style={{ width: 40, marginLeft: 10 }}
          />
          <Text
            style={{
              textAlign: "left",
              flex: 1,
              fontSize: 18,
              fontWeight: "600",
              marginLeft: 8,
            }}
          >
            Kết quả làm bài
          </Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color="gray"
            style={{ padding: 10 }}
          />
        </Pressable>
        <Pressable style={styles.optionItem}>
          <FontAwesome6
            name="wallet"
            size={26}
            color={COLORS.itemColor}
            style={{ width: 40, marginLeft: 10 }}
          />
          <Text
            style={{
              textAlign: "left",
              flex: 1,
              fontSize: 18,
              fontWeight: "600",
              marginLeft: 8,
            }}
          >
            Từ vựng đã học
          </Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color="gray"
            style={{ padding: 10 }}
          />
        </Pressable>
        <Pressable style={styles.optionItem}>
          <AntDesign
            name="heart"
            size={26}
            color={COLORS.itemColor}
            style={{ width: 40, marginLeft: 10 }}
          />
          <Text
            style={{
              textAlign: "left",
              flex: 1,
              fontSize: 18,
              fontWeight: "600",
              marginLeft: 8,
            }}
          >
            Danh sách yêu thích
          </Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color="gray"
            style={{ padding: 10 }}
          />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ProfileHome;

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 58,
  },
  textHeader: {
    fontSize: 24,
    fontWeight: "600",
  },
  profileView: {
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  avatarFrame: {
    height: 110,
    width: 110,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 10,
    marginVertical: 10,
  },
  optionView: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: "absolute",
    top: "45%",
    height: "100%",
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  optionItem: {
    width: "100%",
    height: 52,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
});
