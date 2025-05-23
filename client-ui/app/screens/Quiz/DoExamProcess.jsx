import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import HeaderElement from "../../../components/Header/HeaderElement";
import { useNavigation } from "@react-navigation/native";
import DoExamFooter from "../../../components/Footer/DoExamFooter";
import { authApi, endpoints } from "../../../apis/APIs";
import { useAuth } from "../../../context/AuthContext";
import NoActiveView from "../../../components/lotties/NoActiveView";
import { COLORS } from "../../../constants/Constant";
import SkeletonLoading from "../../../components/lotties/SkeletonLoading";
import { SafeAreaView } from "react-native-safe-area-context";

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
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.subContainer}>
        <HeaderElement
          textHeader={formatTime(seconds)}
          closeHandle={handleClose}
        />

        {loading ? (
          <SkeletonLoading />
        ) : questionData.length <= 0 ? (
          <NoActiveView
            visible={false}
            textAlert="Đề này không có sẵn câu hỏi hoặc bạn đã làm rồi !"
          />
        ) : (
          <>
            <View style={styles.quizContent}>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  subContainer: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  questionSetName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 25,
    color: COLORS.blackTextColor,
  },
  quizContent: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.backgroundColor,
  },
  questionContent: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 20,
    color: COLORS.blackTextColor,
  },
  answersContainer: {
    marginVertical: 15,
  },
  answerOption: {
    backgroundColor: COLORS.sectionBackground,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedAnswer: {
    backgroundColor: COLORS.doExamAnswerBackgroundColor,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderColor: COLORS.doExamAnswerBorderColor,
    borderWidth: 2,
  },
  answerText: {
    fontSize: 16,
    color: COLORS.lightTextColor,
  },
});
export default DoExamProcess;
