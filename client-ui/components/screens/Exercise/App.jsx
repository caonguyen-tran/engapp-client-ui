import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

const questions = [
  {
    question: "What is the capital of France?",
    answer: "Paris",
    options: ["Paris", "London", "Berlin", "Madrid"],
  },
  // Add more questions as needed
];

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [score, setScore] = useState(0);

  const handleAnswer = (option) => {
    let correct = option === questions[currentQuestion].answer;
    if (correct) {
      setScore(score + 1);
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
    setUserAnswer(option);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progressBar, { width: progress }]} />
      <Text style={styles.question}>{questions[currentQuestion].question}</Text>
      <TextInput
        style={styles.input}
        value={userAnswer}
        onChangeText={setUserAnswer}
        placeholder="Type your answer"
      />
      {questions[currentQuestion].options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => handleAnswer(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.feedback}>
        {userAnswer === questions[currentQuestion].answer
          ? "Correct!"
          : "Wrong!"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    paddingTop: 50, 
  },
  progressBar: {
    alignSelf: "stretch",
    height: 20,
    backgroundColor: "#4CAF50",
    marginHorizontal: 20,
    borderRadius: 10,
  },
  question: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20,
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
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
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
});

export default App;
