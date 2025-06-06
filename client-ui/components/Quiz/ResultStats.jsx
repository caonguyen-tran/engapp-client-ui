import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants/Constant";
import { useEffect } from "react";
import { calculateStatsData } from "../../utils/common";

const StatItem = ({ icon, label, value, color = COLORS.active }) => (
  <View style={styles.statItem}>
    <MaterialIcons
      name={icon}
      size={24}
      color={color}
      style={styles.statIcon}
    />
    <View style={styles.statContent}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
    </View>
  </View>
);

const PartProgress = ({ part, count, total = 5 }) => (
  <View style={styles.partProgress}>
    <Text style={styles.partText}>Part {part}</Text>
    <View style={styles.progressBar}>
      <View
        style={[
          styles.progressFill,
          {
            width: `${(count / total) * 100}%`,
            backgroundColor: COLORS.active,
          },
        ]}
      />
    </View>
    <Text style={styles.partCount}>{count}</Text>
  </View>
);

const ResultStats = ({ detailPress, data, quizCount }) => {
  const calData = calculateStatsData(data);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="analytics" size={24} color={COLORS.titleColor} />
        <Text style={styles.headerText}>Thống kê kết quả</Text>
      </View>

      <View style={styles.statsGrid}>
        <StatItem
          icon="check-circle"
          label="Tỉ lệ trả lời đúng"
          value={` ${calData.avgCorrectPercentage.toFixed(2)} %`}
          color={COLORS.greenIconColor}
        />
        <StatItem
          icon="timer"
          label="Thời gian trung bình"
          value={calData.avgFinishedTime < 0 ? 0 : ` ${(calData.avgFinishedTime/60).toFixed(2)} phút`}
          color={COLORS.blueIconColor}
        />
        <StatItem
          icon="star"
          label="Điểm trung bình"
          value={calData.avgOverallPoint}
          color={COLORS.yellowIconColor}
        />
      </View>

      <View style={styles.partsSection}>
        <Text style={styles.sectionTitle}>Số đề đã làm</Text>
        <View style={styles.partsList}>
          <PartProgress
            part={5}
            count={data[0] == null || !data[0] ? 0 : data[0].totalCount}
            total={quizCount}
          />
          <PartProgress
            part={6}
            count={data[1] == null || !data[1] ? 0 : data[1].totalCount}
          />
          <PartProgress
            part={7}
            count={data[2] == null || !data[2] ? 0 : data[2].totalCount}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.detailButton}
        onPress={detailPress}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Xem chi tiết</Text>
        <MaterialIcons name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    margin: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.titleColor,
  },
  statsGrid: {
    gap: 16,
    marginBottom: 24,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 12,
  },
  statIcon: {
    marginRight: 16,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "600",
  },
  partsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  partsList: {
    gap: 12,
  },
  partProgress: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  partText: {
    width: 50,
    fontSize: 14,
    color: "#666",
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  partCount: {
    width: 24,
    fontSize: 14,
    color: "#666",
    textAlign: "right",
  },
  detailButton: {
    backgroundColor: COLORS.btnColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 12,
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.btnColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ResultStats;
