import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const ResultStats = ({detailPress}) => {
  return (
    <View style={[styles.container]}>
      <Text style={styles.header}>Thống kê </Text>

      <View style={styles.statRow}>
        <Text style={styles.statTitle}>Tỉ lệ trả lời đúng:</Text>
        <Text style={styles.statValue}>85%</Text>
      </View>

      <View style={styles.statRow}>
        <Text style={styles.statTitle}>Số đề đã làm:</Text>
        <View style={styles.partDetails}>
          <Text style={styles.partText}>Part 5: 3</Text>
          <Text style={styles.partText}>Part 6: 2</Text>
          <Text style={styles.partText}>Part 7: 4</Text>
        </View>
      </View>

      <View style={styles.statRow}>
        <Text style={styles.statTitle}>Điểm trung bình:</Text>
        <Text style={styles.statValue}>7.5</Text>
      </View>

      <View style={styles.statRow}>
        <Text style={styles.statTitle}>Thời gian làm bài trung bình:</Text>
        <Text style={styles.statValue}>30 phút</Text>
      </View>

      <TouchableOpacity
        style={styles.learnButton}
        onPress={detailPress}
      >
        <Text style={styles.buttonText}>Xem chi tiết</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    paddingVertical: 30
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  statTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  partDetails: {
    flexDirection: "column",
  },
  partText: {
    fontSize: 16,
    marginTop: 2,
  },
  learnButton: {
    backgroundColor: "#308AFF",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginVertical: 10
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default ResultStats;
