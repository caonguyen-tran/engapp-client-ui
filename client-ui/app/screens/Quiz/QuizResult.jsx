import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import HeaderScreen from "../../../components/Header/HeaderScreen";
import { TouchableOpacity } from "react-native";
import { authApi, endpoints } from "../../../apis/APIs";
import { useAuth } from "./../../../context/AuthContext";
import LoadingView from "./../../../components/lotties/LoadingView";
import NoActiveView from "./../../../components/lotties/NoActiveView";

const QuizResult = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let res = await authApi(token).get(
          endpoints["quiz-service"]["list-by-owner"]
        );

        setData(res.data.data);
      } catch (ex) {
        console.log(ex);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const TestResultItem = ({ result }) => {
    const pointColor =
      result.overallPoint >= 70 ? styles.highPoint : styles.lowPoint;

    return (
      <TouchableOpacity style={styles.itemContainer} activeOpacity={0.6} onPress={() => navigation.navigate("QuizResultDetail", {resultId: result.id})}>
        <Text style={styles.title}>{result.questionSet.name}</Text>
        <Text style={styles.description}>{result.questionSet.description}</Text>
        <View style={styles.resultContainer}>
          <Text style={[styles.overallPoint, pointColor]}>
            Overall Point: {result.overallPoint}
          </Text>
          <Text style={styles.result}>
            Correct Answers: {result.correctAnswers} | Percentage:{" "}
            {result.correctPercentage}%
          </Text>
        </View>
        <Text style={styles.date}>
          Start: {new Date(result.startTime).toLocaleString()}
        </Text>
        <Text style={styles.date}>
          End: {new Date(result.endTime).toLocaleString()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <HeaderScreen
        label="Kết quả của bạn"
        callback={() => navigation.goBack()}
      />
      {loading ? (
        <LoadingView />
      ) : data.length <= 0 ? (
        <NoActiveView textAlert="Bạn chưa làm bài test nào" />
      ) : (
        <View style={styles.container}>
          <View style={styles.textHeaderView}>
            <Text style={styles.textHeader}>Danh sách bài test đã làm</Text>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <TestResultItem result={item} />}
            ListEmptyComponent={<Text>No results available</Text>}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#f0f4f7",
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 5 },
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  resultContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  overallPoint: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  highPoint: {
    color: "#4CAF50",
  },
  lowPoint: {
    color: "#F44336",
  },
  result: {
    fontSize: 14,
    color: "#555",
  },
  date: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 5,
  },
  textHeaderView: {
    height: 50,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  textHeader: {
    fontSize: 19,
    fontWeight: "bold",
    color: "gray",
  },
});

export default QuizResult;
