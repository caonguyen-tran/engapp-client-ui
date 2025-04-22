import { StyleSheet, Text, View, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import { COLORS, wordLevel } from "../../../constants/Constant";

const WordLearnedItem = ({ item }) => {
  const timeAgo = moment(item.learnDate).fromNow();
  
  const getLevelColor = (level) => {
    if (wordLevel.aLevel.includes(level)) return COLORS.aLevel;
    if (wordLevel.bLevel.includes(level)) return COLORS.bLevel;
    return COLORS.cLevel;
  };

  const getMasterLevelColor = (key) => {
    const colors = {
      'S': '#FFD700',  // Gold
      'A': '#40C057',  // Green
      'B': '#4DABF7',  // Blue
      'C': '#FF922B',  // Orange
      'D': '#FA5252',  // Red
    };
    return colors[key] || '#868E96';  // Default gray
  };

  return item ? (
    <View style={styles.container}>
      {/* Word Header Section */}
      <View style={styles.header}>
        <View style={[styles.levelBadge, { backgroundColor: getLevelColor(item.wordResponse.wordLevel.level) }]}>
          <Text style={styles.levelText}>{item.wordResponse.wordLevel.level}</Text>
        </View>
        <View style={styles.wordMain}>
          <Text style={styles.wordText}>{item.wordResponse.word}</Text>
          <View style={styles.pronunciationContainer}>
            <MaterialIcons name="volume-up" size={16} color={COLORS.active} style={styles.icon} />
            <Text style={styles.pronunciationText}>/{item.wordResponse.pronunciation}/</Text>
          </View>
        </View>
      </View>

      {/* Word Details Section */}
      <View style={styles.details}>
        <View style={styles.partOfSpeechContainer}>
          <Text style={styles.partOfSpeech}>{item.wordResponse.pofSpeech.engName}</Text>
        </View>
        <Text style={styles.definition}>{item.wordResponse.definition}</Text>
      </View>

      {/* Learning Progress Section */}
      <View style={styles.progressSection}>
        <View style={styles.progressStats}>
          <View style={styles.statItem}>
            <MaterialIcons name="trending-up" size={18} color={COLORS.active} />
            <Text style={styles.statText}>Tỉ lệ đúng: {item.successRate}</Text>
          </View>
          <View style={styles.statItem}>
            <MaterialIcons 
              name={item.learn ? "check-circle" : "schedule"} 
              size={18} 
              color={item.learn ? COLORS.active : "#757575"} 
            />
            <Text style={styles.statText}>
              {item.learn ? "Đã học" : "Chưa học"}
            </Text>
          </View>
          <View style={styles.statItem}>
            <MaterialIcons 
              name="refresh"
              size={18} 
              color={item.review ? COLORS.active : "#757575"} 
            />
            <Text style={styles.statText}>
              {item.review ? "Đã ôn tập" : "Chưa ôn tập"}
            </Text>
          </View>
        </View>
        <View style={[styles.masterBadge, { backgroundColor: getMasterLevelColor(item.learnedMaster.key) }]}>
          <Text style={styles.masterText}>{item.learnedMaster.key}</Text>
        </View>
      </View>

      {/* Time Section */}
      <View style={styles.timeSection}>
        <MaterialIcons name="access-time" size={16} color="#757575" />
        <Text style={styles.timeText}>{timeAgo}</Text>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  levelBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  levelText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  wordMain: {
    flex: 1,
  },
  wordText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  pronunciationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pronunciationText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  icon: {
    marginRight: 4,
  },
  details: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  partOfSpeechContainer: {
    marginBottom: 8,
  },
  partOfSpeech: {
    fontSize: 14,
    color: COLORS.active,
    fontWeight: '500',
  },
  definition: {
    fontSize: 15,
    color: '#34495e',
    lineHeight: 22,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  progressStats: {
    flex: 1,
    gap: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontSize: 14,
    color: '#666',
  },
  masterBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  masterText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  timeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 6,
  },
  timeText: {
    fontSize: 12,
    color: '#757575',
  },
});

export default WordLearnedItem;
