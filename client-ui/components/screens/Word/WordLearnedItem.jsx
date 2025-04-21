import moment from "moment";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, wordLevel } from "../../../constants/Instant";

const WordLearnedItem = ({ item }) => {
  const timeAgo = moment(item.learnDate).fromNow();
  return item ? (
    <View style={styles.mainContainer}>
      <View style={styles.itemContainer}>
        <View style={[styles.wordLevelContainer, 
          {
            backgroundColor: wordLevel.aLevel.includes(item.wordResponse.wordLevel.level)
              ? COLORS.aLevel
              : wordLevel.bLevel.includes(item.wordResponse.wordLevel.level)
              ? COLORS.bLevel
              : COLORS.cLevel,
          }]}>
          <Text style={styles.wordLevel}>
            {item.wordResponse.wordLevel.level}
          </Text>
        </View>
        <View style={styles.wordInfoContainer}>
          <Text style={styles.word}>{item.wordResponse.word}</Text>
          <Text style={styles.partOfSpeech}>
            {item.wordResponse.pofSpeech.engName}
          </Text>
          <Text style={styles.pronunciation}>
            {item.wordResponse.pronunciation}
          </Text>
          <Text style={styles.definition}>{item.wordResponse.definition}</Text>
        </View>
      </View>

      <View style={styles.wordLearnedContainer}>
        <View style={styles.wordLearnedInfo}>
          <Text style={styles.word}>{`Tỉ lệ đúng: ${item.successRate}`}</Text>
          <Text style={styles.partOfSpeech}>
            Đã học: {item.learn ? " Rồi" : " Chưa"}
          </Text>
          <Text style={styles.pronunciation}>
            Đã ôn: {item.review ? " Rồi" : " Chưa"}
          </Text>
          <Text style={styles.definition}>{`Học lúc: ${timeAgo}`}</Text>
        </View>
        <View style={[styles.masterLevelContainer]}>
          <Text style={styles.wordLevel}>{item.learnedMaster.key}</Text>
        </View>
      </View>
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "red",
    marginTop: 20,
    shadowColor: "#000",
    borderRadius: 8,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  wordLevelContainer: {
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  wordLevel: {
    color: "white",
    fontWeight: "bold",
    fontSize: 26,
  },
  wordInfoContainer: {
    flex: 1,
  },
  word: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  partOfSpeech: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  pronunciation: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  definition: {
    fontSize: 16,
    color: "#555",
    marginTop: 8,
  },
  wordLearnedContainer: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "gray",
    justifyContent: "flex-end",
  },
  masterLevelContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    width: 60,
  },
  wordLearnedInfo: {
    flex: 1,
    marginRight: 20,
  },
});
export default WordLearnedItem;
