import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
  Platform,
  RefreshControl,
} from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { authApi, endpoints } from "../../../apis/APIs";
import HeaderStack from "../../../components/Header/HeaderStack";
import LoadingView from "../../../components/lotties/LoadingView";
import NoActiveView from "../../../components/lotties/NoActiveView";
import ResultStats from "../../../components/Quiz/ResultStats";
import QuizItem from "../../../components/Quiz/QuizItem";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../constants/Constant";
import SkeletonLoading from "../../../components/lotties/SkeletonLoading";

const QuizHome = () => {
  const [listQuestionSet, setListQuestionSet] = useState([]);
  const [listStats, setListStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { token } = useAuth();
  const navigation = useNavigation();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await authApi(token).get(
        endpoints["quiz-service"]["get-all-question-set"]
      );
      const statsRes = await authApi(token).get(
        endpoints["quiz-service"]["get-statistic"]
      );
      setListQuestionSet(res.data.data);
      setListStats(statsRes.data.data);

      console.log(statsRes.data.data);
    } catch (ex) {
      console.log(ex);
      Alert.alert("Lỗi", "Không thể tải dữ liệu. Vui lòng thử lại sau.", [
        { text: "Đóng" },
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleStartQuiz = (questionSetId) => {
    Alert.alert(
      "Bắt đầu làm bài",
      "Bạn có 15 phút để hoàn thành bài kiểm tra này. Bạn có muốn bắt đầu không?",
      [
        {
          text: "Bắt đầu",
          onPress: () =>
            navigation.navigate("DoExamProcess", {
              questionSetId: questionSetId,
            }),
        },
        { text: "Hủy", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderStack />
      <View style={styles.subContainer}>
        {loading && !refreshing ? (
          <View style={styles.skeletonLoading}>
            <SkeletonLoading />
          </View>
        ) : listQuestionSet.length <= 0 ? (
          <NoActiveView
            textAlert="Bộ câu hỏi chưa được cập nhật!"
            visible={false}
          />
        ) : (
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <ResultStats
              detailPress={() => navigation.navigate("QuizResult")}
              data={listStats}
              quizCount={listQuestionSet.length}
            />

            <View style={styles.quizList}>
              {listQuestionSet.map((item) => (
                <QuizItem
                  key={item.id}
                  item={item}
                  onStartQuiz={handleStartQuiz}
                />
              ))}
            </View>
          </ScrollView>
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
  skeletonLoading: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  quizList: {
    paddingTop: 8,
    paddingBottom: 24,
  },
});

export default QuizHome;
