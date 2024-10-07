import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useAuth } from "./../../../context/AuthContext";
import { authApi, endpoints } from "../../../apis/APIs";
import HeaderStack from "../../../components/Header/HeaderStack";
import LoadingView from "../../../components/lotties/LoadingView";
import NoActiveView from "../../../components/lotties/NoActiveView";
import { TouchableOpacity } from "react-native";
import ResultStats from "../../../components/Quiz/ResultStats";
import { useNavigation } from "@react-navigation/native";

const QuizHome = () => {
  const [listQuestionSet, setListQuestionSet] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let res = await authApi(token).get(
          endpoints["quiz-service"]["get-all-question-set"]
        );

        setListQuestionSet(res.data.data);
      } catch (ex) {
        console.log(ex);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const alertConfirmDoQuiz = (questionSetId) => {
    Alert.alert(
      "Thông báo",
      "Bạn có 15 phút cho đề này, bạn có muốn bắt đầu không ?",
      [
        {
          text: "Bắt đầu",
          onPress: () =>
            navigation.navigate("DoExamProcess", {
              questionSetId: questionSetId,
            }),
        },
        { text: "Cancel", onPress: () => {}, style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.questionSetView}>
      <View style={styles.itemContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.date}>
          Ngày tạo: {new Date(item.createdDate).toLocaleDateString()}
        </Text>
        <Text style={styles.part}>Reading Part: {item.readingPart}</Text>
        <Text
          style={[styles.status, { color: item.isActive ? "green" : "red" }]}
        >
          Trạng thái: {item.isActive ? "Hoạt động" : "Không hoạt động"}
        </Text>
      </View>
      {item.isActive ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => alertConfirmDoQuiz(item.id)}
        >
          <Text style={styles.buttonText}>Làm bài</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );

  return (
    <>
      <HeaderStack />
      {loading ? (
        <LoadingView />
      ) : listQuestionSet.length <= 0 ? (
        <NoActiveView
          textAlert="Bộ câu hỏi chưa được cập nhật!"
          visible={false}
        />
      ) : (
        <>
          <ScrollView>
            <ResultStats detailPress={() => navigation.navigate("QuizResult")}/>
            <FlatList
              data={listQuestionSet}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          </ScrollView>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  questionSetView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginTop: 20,
    padding: 15,
  },
  itemContainer: {
    marginVertical: 10,
    borderRadius: 8,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    marginVertical: 5,
    color: "#666",
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  part: {
    fontSize: 14,
    marginVertical: 5,
  },
  status: {
    fontSize: 14,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default QuizHome;
