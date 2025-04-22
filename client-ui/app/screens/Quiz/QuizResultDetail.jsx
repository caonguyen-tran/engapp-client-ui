import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { authApi, endpoints } from "../../../apis/APIs";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import LoadingView from "../../../components/lotties/LoadingView";
import HeaderScreen from "../../../components/Header/HeaderScreen";
import { useNavigation } from "@react-navigation/native";
import ExamStats from "../../../components/Quiz/ExamStats";
import { COLORS } from "../../../constants/Constant";

const QuizResultDetail = ({ route }) => {
  const { resultId } = route.params;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState();
  const { token } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let res = await authApi(token).get(
          endpoints["quiz-service"]["list-exam-by-result"](resultId)
        );
        let resDetail = await authApi(token).get(
          endpoints["quiz-service"]["get-quiz-result"](resultId)
        );
        setDetail(resDetail.data.data);
        setData(res.data.data);
      } catch (ex) {
        console.log(ex);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const QuestionItem = ({ question, userAnswer }) => {
    return (
      <View style={styles.questionContainer}>
        <Text
          style={styles.questionText}
        >{`Câu ${question.questionNumber}`}</Text>
        <Text style={styles.questionText}>{question.questionContent}</Text>
        <View style={styles.answerContainer}>
          {question.answers.map((answer) => {
            let answerStyle = styles.defaultAnswer;

            if (userAnswer === null) {
              if (answer.answerKey === question.correctAnswer) {
                answerStyle = styles.correctAnswer;
              }
            } else {
              if (answer.answerKey === question.correctAnswer) {
                answerStyle = styles.correctAnswer;
              } else if (answer.answerKey === userAnswer.answerKey) {
                answerStyle = styles.wrongAnswer;
              }
            }

            return (
              <Text
                key={answer.answerKey}
                style={[styles.answerText, answerStyle]}
              >
                {answer.content}
              </Text>
            );
          })}
        </View>
        <Text style={styles.explanationText}>{question.explainAnswer}</Text>
      </View>
    );
  };

  const QuestionList = () => {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {detail ? (
          <ExamStats
            startTime={detail.startTime}
            endTime={detail.endTime}
            correctAnswers={detail.correctAnswers}
            overallPoint={detail.overallPoint}
            totalQuestions={data.length}
          />
        ) : (
          <></>
        )}
        {data.map((item) => (
          <QuestionItem
            key={item.id}
            question={item.question}
            userAnswer={item.answer}
          />
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderScreen
        label="Kết quả làm bài"
        callback={() => navigation.navigate("QuizHome")}
      />
      {loading ? (
        <LoadingView />
      ) : (
        <>
          <QuestionList />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  scrollContainer: {
    paddingBottom: 16,
    marginTop: 20,
  },
  questionContainer: {
    backgroundColor: COLORS.sectionBackground,
    borderRadius: 10,
    padding: 20,
    marginBottom: 16,
    shadowColor: COLORS.shadowColor,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    marginHorizontal: 10,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.blackTextColor,
    marginBottom: 12,
    textAlign: "justify",
  },
  questionNumber: {},
  answerContainer: {
    marginBottom: 12,
  },
  answerText: {
    fontSize: 16,
    padding: 10,
    marginBottom: 6,
    borderRadius: 6,
    textAlign: "center",
  },
  defaultAnswer: {
    backgroundColor: COLORS.sectionBackground,
    color: COLORS.lightTextColor,
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
  correctAnswer: {
    backgroundColor: "#DFFFD6",
    color: "#4CAF50",
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  wrongAnswer: {
    backgroundColor: "#FFD6D6",
    color: "#F44336",
    borderWidth: 1,
    borderColor: "#F44336",
  },
  explanationText: {
    fontSize: 14,
    color: COLORS.lightTextColor,
    marginTop: 12,
    textAlign: "justify",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 12,
  },
});

export default QuizResultDetail;
