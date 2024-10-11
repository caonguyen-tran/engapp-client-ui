import React from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";

const ExamStats = ({
  correctAnswers,
  totalQuestions,
  overallPoint,
  startTime,
  endTime,
}) => {
  const correctPercentage = ((correctAnswers / totalQuestions) * 100).toFixed(
    2
  );

  const start = moment(startTime);
  const end = moment(endTime);
  const duration = moment.duration(end.diff(start));
  const formattedDuration = `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Kết quả</Text>

      <View style={styles.overallPointContainer}>
        <Text style={styles.overallPointLabel}>Overall</Text>
        <Text style={styles.overallPoint}>{overallPoint}</Text>
      </View>

      <View style={styles.resultRow}>
        <Text style={styles.label}>Số câu hỏi đúng:</Text>
        <Text style={styles.value}>
          {correctAnswers}/{totalQuestions}
        </Text>
      </View>

      <View style={styles.resultRow}>
        <Text style={styles.label}>Tỉ lệ đúng:</Text>
        <Text style={styles.value}>{correctPercentage}%</Text>
      </View>

      <View style={styles.resultRow}>
        <Text style={styles.label}>Thời gian:</Text>
        <Text style={styles.value}>{formattedDuration}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  overallPointContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  overallPointLabel: {
    fontSize: 18,
    color: "#555",
  },
  overallPoint: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    color: "#333",
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ExamStats;
