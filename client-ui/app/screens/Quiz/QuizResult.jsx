import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Platform } from "react-native";
import HeaderScreen from "../../../components/Header/HeaderScreen";
import { TouchableOpacity } from "react-native";
import { authApi, endpoints } from "../../../apis/APIs";
import { useAuth } from "./../../../context/AuthContext";
import LoadingView from "./../../../components/lotties/LoadingView";
import NoActiveView from "./../../../components/lotties/NoActiveView";
import { MaterialIcons } from "@expo/vector-icons";
import { formattedStartTime, formattedEndTime } from "../../../utils/common";
import { COLORS } from "../../../constants/Constant";

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
    const startTime = formattedStartTime(result.startTime);
    const endTime = formattedEndTime(result.endTime);

    return (
      <TouchableOpacity 
        style={styles.itemContainer} 
        activeOpacity={0.7} 
        onPress={() => navigation.navigate("QuizResultDetail", {resultId: result.id})}
      >
        <View style={styles.itemHeader}>
          <View style={styles.titleContainer}>
            <MaterialIcons name="assignment" size={24} color={COLORS.blueColor} />
            <Text style={styles.title}>{result.questionSet.name}</Text>
          </View>
        </View>

        <Text style={styles.description}>{result.questionSet.description}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <MaterialIcons name="check-circle" size={20} color={COLORS.succcess} />
            <Text style={styles.statText}>
              {result.correctAnswers} câu đúng
            </Text>
          </View>
          <View style={styles.statItem}>
            <MaterialIcons name="percent" size={20} color={COLORS.averageScore} />
            <Text style={styles.statText}>
              {result.correctPercentage}%
            </Text>
          </View>
        </View>

        <View style={styles.timeContainer}>
          <MaterialIcons name="schedule" size={16} color="#757575" />
          <Text style={styles.timeText}>
            {startTime} - {endTime}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderScreen
        label="Kết quả của bạn"
        callback={() => navigation.goBack()}
      />
      {loading ? (
        <LoadingView />
      ) : data.length <= 0 ? (
        <NoActiveView textAlert="Bạn chưa làm bài test nào" />
      ) : (
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <MaterialIcons name="history" size={24} color={COLORS.blueColor} />
            <Text style={styles.headerText}>Danh sách bài test đã làm</Text>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <TestResultItem result={item} />}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.blueColor,
  },
  listContainer: {
    paddingBottom: 16,
  },
  itemContainer: {
    backgroundColor: COLORS.sectionBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.lightTextColor,
    flex: 1,
  },
  pointBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointText: {
    color: COLORS.whiteTextColor,
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    color: COLORS.lightTextColor,
    marginBottom: 12,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    color: COLORS.lightTextColor,
    fontWeight: '500',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: COLORS.sectionBackground,
    paddingTop: 12,
  },
  timeText: {
    fontSize: 12,
    color: COLORS.lightTextColor,
  },
});

export default QuizResult;
