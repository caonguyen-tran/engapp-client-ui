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
  const correctPercentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);
  const start = moment(startTime);
  const end = moment(endTime);
  const duration = moment.duration(end.diff(start));
  const formattedDuration = `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.scoreCircle}>
          <Text style={styles.scoreValue}>{overallPoint}</Text>
          <Text style={styles.scoreLabel}>Điểm số</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={styles.statIcon}>
              <Text style={styles.iconText}>✓</Text>
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>{correctAnswers}/{totalQuestions}</Text>
              <Text style={styles.statLabel}>Câu đúng</Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <View style={[styles.statIcon, styles.percentageIcon]}>
              <Text style={styles.iconText}>%</Text>
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>{correctPercentage}%</Text>
              <Text style={styles.statLabel}>Tỉ lệ đúng</Text>
            </View>
          </View>

          <View style={styles.statItem}>
            <View style={[styles.statIcon, styles.timeIcon]}>
              <Text style={styles.iconText}>⏱</Text>
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statValue}>{formattedDuration}</Text>
              <Text style={styles.statLabel}>Thời gian</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  scoreCircle: {
    alignItems: "center",
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#2196F3",
    marginBottom: 4,
  },
  scoreLabel: {
    fontSize: 16,
    color: "#666666",
    fontWeight: "500",
  },
  statsContainer: {
    gap: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  percentageIcon: {
    backgroundColor: "#E8F5E9",
  },
  timeIcon: {
    backgroundColor: "#FFF3E0",
  },
  iconText: {
    fontSize: 20,
    color: "#2196F3",
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 14,
    color: "#666666",
  },
});

export default ExamStats;
