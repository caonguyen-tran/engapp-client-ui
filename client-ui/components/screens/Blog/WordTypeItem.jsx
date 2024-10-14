import React, { useState } from "react";
import {
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { COLORS } from "../../../constants/Instant";
import APIs, { endpoints } from "../../../apis/APIs";
import { Image } from "react-native";

const WordTypeItem = ({ data, label }) => {
  const [translatedWord, setTranslatedWord] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const translateWord = async (word) => {
    try {
      setLoading(true);

      const response = await APIs.post(
        endpoints["blog-analyze-service"]["translate"],
        { word: word }
      );
      setTranslatedWord(response.data);
      setLoading(false);
      setModalVisible(true);
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Could not translate the word");
      console.error("Translation error:", error);
    }
  };

  const AdjectiveItem = ({ item }) => {
    const isLongWord = item.length > 7;
    return (
      <TouchableOpacity
        style={[styles.adjectiveBox, isLongWord ? styles.doubleColumn : null]}
        activeOpacity={0.7}
        onPress={() => translateWord(item)}
      >
        <Text style={styles.adjectiveText}>
          {loading ? "Đang dịch..." : item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.textHeader}>
        <Text style={styles.headerText}>{label}</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <AdjectiveItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            {loading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              <>
                {translateWord !== null ? (
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        paddingHorizontal: 20,
                      }}
                    >
                      <Text style={styles.modalText}>Ngôn ngữ đích:</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.modalText}>
                          {translatedWord.lang}
                        </Text>
                        <Image
                          source={{
                            uri: "https://res.cloudinary.com/dndakokcz/image/upload/v1728927635/1f1fb-1f1f3_mql9vk.png",
                          }}
                          style={{ height: 20, width: 40 }}
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        paddingHorizontal: 20,
                      }}
                    >
                      <Text style={styles.modalText}>Từ tiếng Anh:</Text>
                      <Text style={styles.modalText}>
                        {translatedWord.original}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        paddingHorizontal: 20,
                      }}
                    >
                      <Text style={styles.modalText}>Từ tiếng Việt:</Text>
                      <Text style={styles.modalText}>
                        {translatedWord.translated}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  adjectiveBox: {
    flex: 1,
    padding: 16,
    margin: 4,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  doubleColumn: {
    flex: 2,
  },
  adjectiveText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  textHeader: {
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "arial",
    color: COLORS.itemColor,
    backgroundColor: "#ccc",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  closeButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  popupView: {
    width: "100%",
  },
});

export default WordTypeItem;
