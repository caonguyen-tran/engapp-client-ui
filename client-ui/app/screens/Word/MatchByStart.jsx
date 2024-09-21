import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Alert, Animated, Dimensions, TouchableOpacity } from "react-native";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import HeaderScreen from "../../../components/Header/HeaderScreen";
import AnswerAlert from "../../../components/screens/Word/AnswerAlert";
import HeaderElement from "../../../components/Header/HeaderElement";

const { height } = Dimensions.get("window");

const MatchByStart = ({ route }) => {
  const { listNew } = route.params;
  const [queue, setQueue] = useState([...listNew]);
  const [listWord, setListWord] = useState([]);
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();
  const position = useState(new Animated.Value(height))[0];
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState("");
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    if (listWord >= 5) {
      navigation.navigate("LearnNewWordProcess", { listWord: listWord });
    }
  }, [listWord]);

  const handleAnswer = (value) => {
    if (queue && queue.length > 0) {
      const correct = value === queue[index].wordResponse.word;
      if (correct) {
        setListWord((prev) => {
          const updatedListWord = [
            ...prev,
            { ...queue[index], enToVi: 0, viToEn: 0, matchEng: 0 },
          ];
          return updatedListWord;
        });

        setCorrect(true);
      } 
      else {
        setCorrect(false);
        setQueue((prev) => [...prev, queue[index]]);
      }
      setInput("");
      setVisible(false);
    }
  };

  const nextOnPress = () => {
    setIndex(index + 1);
    setVisible(!visible);
  }

  useEffect(() => {
    if (listWord.length >= 5) {
      navigation.navigate("LearnNewWordProcess", {
        listWord: listWord,
      });
    }
  }, [listWord]);

  useEffect(() => {
    if (visible) {
      Animated.timing(position, {
        toValue: height,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    } else {
      setVisible(true);
      Animated.timing(position, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

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
      <HeaderElement textHeader="Bắt đầu" callback={() => handleClose()}/>
      {queue && queue[index] && queue[index].wordResponse ? (
        <View style={styles.container}>
          <View style={styles.wordView}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 26, fontWeight: "500" }}>
                {queue[index].wordResponse.word}
              </Text>
            </View>
            <Text style={{ fontSize: 16, fontStyle: "italic", color: "gray" }}>
              {queue[index].wordResponse.pronunciation}
            </Text>
          </View>
          <View style={styles.definitionContainer}>
            <Text
              style={{ fontSize: 18, fontWeight: "500" }}
            >{`Ví dụ: ${queue[index].wordResponse.example}`}</Text>

            <Text style={styles.definition}>
              {`Nghĩa: ${queue[index].wordResponse.definition}`}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text
              style={{
                textAlign: "left",
                width: "90%",
                paddingVertical: 10,
                fontSize: 18,
                fontWeight: "500",
              }}
            >{`Câu trả lời: ${queue[index].wordResponse.word}`}</Text>
            <TextInput
              style={styles.input}
              onChangeText={setInput}
              value={input}
              placeholder="Type the correct word"
              placeholderTextColor="gray"
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity
            onPress={() => handleAnswer(input)}
            style={styles.learnButton}
          >
            <Text style={styles.buttonText}>Xong</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}

      {visible ? (
        <></>
      ) : correct ? (
        <AnswerAlert
          position={position}
          isCorrect={true}
          data={queue[index]}
          answer={input}
          nextPressHandle={() => nextOnPress()}
        />
      ) : (
        <AnswerAlert
          position={position}
          isCorrect={false}
          data={queue[index]}
          answer={input}
          nextPressHandle={() => nextOnPress()}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    width: "100%",
    marginTop: 30,
  },
  wordView: {
    height: 150,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  definitionContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  definition: {
    fontSize: 16,
    textAlign: "center",
    width: "80%",
    marginVertical: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    width: "90%",
  },
  btnSubmit: {
    height: 40,
    width: 60,
    backgroundColor: "red",
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  learnButton: {
    backgroundColor: "#308AFF",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default MatchByStart;
