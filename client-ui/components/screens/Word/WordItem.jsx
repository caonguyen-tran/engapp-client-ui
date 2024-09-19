import { StyleSheet, Text, View } from "react-native";

const WordItem = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.wordLevelContainer}>
        <Text style={styles.wordLevel}>{item.wordLevel.level}</Text>
      </View>
      <View style={styles.wordInfoContainer}>
        <Text style={styles.word}>{item.word}</Text>
        <Text style={styles.partOfSpeech}>{item.pofSpeech.engName}</Text>
        <Text style={styles.pronunciation}>{item.pronunciation}</Text>
        <Text style={styles.definition}>{item.definition}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
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
    fontSize: 16,
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
    fontStyle: "italic",
    color: "#555",
    marginTop: 4,
  },
  definition: {
    fontSize: 16,
    color: "#555",
    marginTop: 8,
  },
});
export default WordItem;
