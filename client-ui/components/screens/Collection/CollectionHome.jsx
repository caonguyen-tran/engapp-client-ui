import {
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../../constants/Instant";
import { ImageSlider } from "react-native-image-slider-banner";
import { useEffect } from "react";
import { Image } from "react-native";
import { Feather } from "@expo/vector-icons";

const CollectionHome = () => {
  return (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.viewMain}>
        <View style={styles.viewSliderStyle}>
          <View style={styles.viewContent}>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: "500" }}>
                Đã đến lúc ôn tập
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "600",
                  paddingHorizontal: 5,
                  color: "red",
                }}
              >
                2
              </Text>
            </View>
            <TouchableOpacity style={styles.learnButton}>
              <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
                Ôn tập ngay
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.viewImage}>
            <Image
              source={require("../../../assets/images/EngApp.png")}
              style={{ height: 120, width: 150 }}
            />
          </View>
        </View>

        <View style={styles.listView}>
          <View style={styles.listHeader}>
            <Text
              style={{
                textAlign: "left",
                fontSize: 25,
                fontWeight: "500",
                color: "gray",
                paddingVertical: 8,
              }}
            >
              Bộ sưu tập từ vựng
            </Text>
          </View>
          <View style={styles.listItem}>
            <View style={styles.itemHeader}>
              <Text>Header</Text>
            </View>
            <View style={styles.itemContent}>
              <Text>content</Text>
            </View>
            <View style={styles.itemReaction}>
              <Text>reaction</Text>
              <TouchableOpacity style={styles.downloadButton}>
                <Text style={{fontSize: 18, fontWeight: "500", marginRight: 6}}>Học</Text>
                <Feather name="book-open" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  content: {
    flex: 1,
    width: "100%",
  },
  viewMain: {
    width: "100%",
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  viewReminder: {},
  viewSliderStyle: {
    width: "98%",
    height: 200,
    flexDirection: "row",
    justifyContent: "flex-start",
    display: "flex",
    alignItems: "center",
    backgroundColor: COLORS.lightColor,
    borderRadius: 6,
    marginTop: 30,
  },
  viewImage: {
    height: 60,
    paddingLeft: 30,
    display: "flex",
    justifyContent: "center",
  },
  viewContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingLeft: 20,
  },
  learnButton: {
    width: 200,
    height: 45,
    backgroundColor: "gray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  downloadButton: {
    width: 100,
    height: 45,
    backgroundColor: "gray",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  listHeader: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "left",
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  listView: {
    flex: 1,
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  listItem: {
    marginBottom: 20,
    backgroundColor: "red",
    height: 260,
    width: "97%",
    padding: 10,
  },
  itemHeader: {
    height: 60,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  itemContent: {
    flex: 1,
  },
  itemReaction: {
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10
  },
});

export default CollectionHome;
