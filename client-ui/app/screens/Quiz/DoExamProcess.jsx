import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import HeaderElement from "../../../components/Header/HeaderElement";
import { useNavigation } from "@react-navigation/native";
import DoExamFooter from "../../../components/Footer/DoExamFooter";
import { authApi, endpoints } from "../../../apis/APIs";
import { useAuth } from "../../../context/AuthContext";
import LoadingView from "../../../components/lotties/LoadingView";
import NoActiveView from "../../../components/lotties/NoActiveView";

const DoExamProcess = ({ route }) => {
  const [clone, setClone] = useState([]);
  const [index, setIndex] = useState(0);
  const [questionData, setQuestionData] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const { questionSetId } = route.params;
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);


  const handleNextQuestion = () => {
    if (index < questionData.length - 1) {
      setIndex(index + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleAnswerPress = (id) => {
    const elements = questionData[index].question.answers;
    const i = elements.findIndex((x) => x.id === id);
    questionData[index].answer = elements[i];
    setClone([...questionData]);
  };

  const renderAnswer = (answer) => {
    const current = questionData[index].answer;
    let isSelected = false;
    if (current) {
      isSelected = current.id === answer.id;
    }

    const answerStyle = isSelected
      ? styles.selectedAnswer
      : styles.answerOption;

    return (
      <TouchableOpacity
        key={answer.id}
        style={answerStyle}
        onPress={() => handleAnswerPress(answer.id)}
      >
        <Text style={styles.answerText}>{answer.content}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        let res = await authApi(token).post(
          endpoints["quiz-service"]["do-question-set"](questionSetId)
        );

        if (res.data.data !== null) {
          setQuestionData(res.data.data);
          setClone(res.data.data);
        }
      } catch (ex) {
        console.log(ex);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const submitOnPress = async () => {
    setLoading(true);
    try {
      let res = await authApi(token).post(
        endpoints["quiz-service"]["submit-quiz"],
        clone
      );

      navigation.navigate("QuizResultDetail", { resultId: res.data.data });
    } catch (ex) {
      console.log(ex);
    }
    setLoading(false);
  };

  const handleClose = () => {
    Alert.alert(
      "Thông báo",
      "Bạn có muốn thoát tiến trình làm bài không ?",
      [
        { text: "OK", onPress: () => navigation.navigate("QuizHome") },
        { text: "Cancel", onPress: () => {}, style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <>
      <HeaderElement textHeader={formatTime(seconds)} closeHandle={handleClose} />
      {loading ? (
        <LoadingView />
      ) : questionData.length <= 0 ? (
        <NoActiveView
          visible={false}
          textAlert="Đề này không có sẵn câu hỏi hoặc bạn đã làm rồi !"
        />
      ) : (
        <>
          <View style={styles.container}>
            <Text style={styles.questionSetName}>
              {clone[index].question.questionSet.name}
            </Text>
            <Text style={styles.questionContent}>
              {clone[index].question.questionNumber}.{" "}
              {clone[index].question.questionContent}
            </Text>

            <View style={styles.answersContainer}>
              {clone[index].question.answers.map((answer) =>
                renderAnswer(answer)
              )}
            </View>
          </View>
          <DoExamFooter
            handleNextQuestion={handleNextQuestion}
            handlePreviousQuestion={handlePreviousQuestion}
            index={index}
            questionData={questionData}
            submitOnPress={() => submitOnPress()}
            loading={loading}
          />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  questionSetName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 25,
    color: "#333",
  },
  questionContent: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 20,
    color: "#000",
  },
  answersContainer: {
    marginVertical: 15,
  },
  answerOption: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedAnswer: {
    backgroundColor: "#e0f7fa",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: "#00796b",
    borderWidth: 2,
  },
  answerText: {
    fontSize: 16,
    color: "#333",
  },
});
export default DoExamProcess;
