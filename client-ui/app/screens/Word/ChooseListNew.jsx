import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import HeaderElement from "../../../components/Header/HeaderElement";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ChooseListNew = ({ route }) => {
  const [index, setIndex] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [listNew, setListNew] = useState([]);
  const navigation = useNavigation();
  const { lists } = route.params;

  const handleChoice = (choice) => {
    if (choice) {
      setListNew((prev) => [...prev, lists[index]]);
      setWordCount(wordCount + 1);
      setIndex(index + 1);
    } else {
      setIndex(index + 1);
    }
  };

  useEffect(() => {
    if (listNew.length >= 5) {
      navigation.navigate("MatchByStart", { listNew: listNew });
    }
  }, [listNew]);

  const handleClose = () => {
    Alert.alert(
      "Thông báo",
      "Bạn có muốn thoát tiến trình học không ?",
      [{ text: "OK", onPress: () => navigation.navigate("WordHome") },
        {text: 'Cancel', onPress: () => {}, style: 'cancel'}
      ],
      { cancelable: true }
    );
  };

  return (
    <>
      <HeaderElement
        textHeader={`Chọn từ để học ${wordCount}/5`}
        callback={() => handleClose()}
      />
      <View style={styles.container}>
        <View style={styles.card}>
          <View>
            <Text style={styles.word}>{lists[index].wordResponse.word}</Text>
            <Text style={styles.pronunciation}>
              {lists[index].wordResponse.pronunciation}
            </Text>
            <View style={styles.bottomText}>
              <View style={styles.wordLevelView}>
                <Text style={styles.wordLevel}>
                  {lists[index].wordResponse.wordLevel.level}
                </Text>
              </View>
              <Text style={styles.typeWord}>
                {lists[index].wordResponse.pofSpeech.engName}
              </Text>
            </View>
          </View>
          <View style={styles.contentView}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
              Nghĩa:
            </Text>
            <Text style={styles.definition}>
              {lists[index].wordResponse.definition}
            </Text>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
              Ví dụ:
            </Text>
            <Text style={styles.definition}>
              {lists[index].wordResponse.example}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.skipButton}
              onPress={() => handleChoice(false)}
            >
              <Text style={styles.buttonText}>Bỏ qua</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.learnButton}
              onPress={() => handleChoice(true)}
            >
              <Text style={styles.buttonText}>Học từ này</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  card: {
    backgroundColor: "#1e1e1e",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    height: 550,
    justifyContent: "space-between",
    marginTop: 30,
  },
  word: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },
  pronunciation: {
    fontSize: 16,
    color: "#BBBBBB",
    textAlign: "center",
    marginBottom: 20,
  },
  definition: {
    fontSize: 18,
    color: "#DDDDDD",
    textAlign: "justify",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  learnButton: {
    backgroundColor: "#308AFF",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  skipButton: {
    backgroundColor: "gray",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  bottomText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  wordLevelView: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  wordLevel: {
    fontSize: 14,
    fontWeight: "500",
  },
  typeWord: {
    color: "gray",
    fontSize: 15,
    fontWeight: "500",
  },
  contentView: {
    justifyContent: "flex-start",
  },
});

export default ChooseListNew;
