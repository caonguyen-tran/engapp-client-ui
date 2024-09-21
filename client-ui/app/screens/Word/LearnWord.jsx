import { useEffect, useState } from "react";
import {
  Animated,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AnswerAlert from "../../../components/screens/Word/AnswerAlert";
import HeaderElement from "../../../components/Header/HeaderElement";

const { height } = Dimensions.get("window");

const LearnWord = ({ navigation }) => {
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [visible, setVisible] = useState(false);
  const position = useState(new Animated.Value(height))[0];

  const questions = [
    {
      question: "What is the capital of France?",
      answer: "Paris",
      options: ["Paris", "London", "Berlin", "Madrid"],
    },
  ];

  const handleAnswer = (option) => {
    let correct = option === questions[currentQuestion].answer;
    if (correct) {
      Animated.timing(progress, {
        toValue: progress.__getValue() + 50,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(progress, {
        toValue: progress.__getValue() - 50,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
    setVisible(!visible);
    setUserAnswer(option);
  };

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

  const callback = () => {
    setVisible(!visible)
  }

  return (
    <>
      <HeaderElement textHeader="Học từ" />
      <View style={styles.mainView}>
        <Animated.View style={[styles.progressBar, { width: progress }]} />
        <View style={styles.questionView}>
          <Text style={styles.question}>Factor</Text>
          <View style={styles.bottomText}>
            <View style={styles.wordLevelView}>
              <Text style={styles.wordLevel}>C1</Text>
            </View>
            <Text style={styles.typeWord}>Noun</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {visible ? <></> : <AnswerAlert callback={callback} position={position} isCorrect={true} />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  progressBar: {
    alignSelf: "stretch",
    height: 20,
    backgroundColor: "#4CAF50",
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 40,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    paddingTop: 50,
  },
  question: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  questionView: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  input: {
    height: 50,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    width: "90%",
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: "#fff",
  },
  option: {
    height: 100,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  optionText: {
    fontSize: 18,
    textAlign: "center",
    color: "#333",
  },
  feedback: {
    fontSize: 18,
    color: "#E53935",
    margin: 20,
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
});

export default LearnWord;
