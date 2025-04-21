import { StyleSheet, Text, View, TouchableOpacity, Animated } from "react-native";
import { COLORS, wordLevel } from "../../../constants/Instant";
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from "react";

const WordItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpand = () => {
    setExpanded(!expanded);
    Animated.spring(animation, {
      toValue: expanded ? 0 : 1,
      useNativeDriver: true,
    }).start();
  };

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <TouchableOpacity 
      style={styles.itemContainer}
      onPress={toggleExpand}
      activeOpacity={0.8}
    >
      <View style={styles.headerRow}>
        <View style={styles.leftContent}>
          <View
            style={[
              styles.wordLevelContainer,
              {
                backgroundColor: wordLevel.aLevel.includes(item.wordLevel.level)
                  ? COLORS.aLevel
                  : wordLevel.bLevel.includes(item.wordLevel.level)
                  ? COLORS.bLevel
                  : COLORS.cLevel,
              },
            ]}
          >
            <Text style={styles.wordLevel}>{item.wordLevel.level}</Text>
          </View>
          <View style={styles.wordMainInfo}>
            <Text style={styles.word}>{item.word}</Text>
            <Text style={styles.pronunciation}>{item.pronunciation}</Text>
          </View>
        </View>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <MaterialIcons name="expand-more" size={24} color={COLORS.primary} />
        </Animated.View>
      </View>
      
      {expanded && (
        <View style={styles.expandedContent}>
          <View style={styles.divider} />
          <View style={styles.partOfSpeechContainer}>
            <MaterialIcons name="format-quote" size={16} color={COLORS.primary} />
            <Text style={styles.partOfSpeech}>{item.pofSpeech.engName}</Text>
          </View>
          <Text style={styles.definition}>{item.definition}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  wordLevelContainer: {
    padding: 6,
    borderRadius: 6,
    minWidth: 40,
    alignItems: 'center',
  },
  wordLevel: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  wordMainInfo: {
    marginLeft: 12,
    flex: 1,
  },
  word: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  pronunciation: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  expandedContent: {
    marginTop: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  partOfSpeechContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  partOfSpeech: {
    fontSize: 14,
    color: COLORS.primary,
    marginLeft: 6,
    fontWeight: '500',
  },
  definition: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
  },
});

export default WordItem;
