import React, { useState } from "react";
import {
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../../constants/Constant";
import APIs, { endpoints } from "../../../apis/APIs";
import { Image } from "react-native";
import PronunciationButton from "../../common/PronunciationButton";

const WordTypeItem = ({ data, label, icon, voice }) => {
  const [translatedWord, setTranslatedWord] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const translateWord = async (word) => {
    try {
      setLoading(true);
      const response = await APIs.post(
        endpoints["blog-analyze-service"]["translate"],
        { word: word }
      );
      setTranslatedWord(response.data);
      setLoading(false);
      setModalVisible(true);
    } catch (error) {
      setLoading(false);
      Alert.alert("Lỗi", "Không thể dịch từ này");
      console.error("Translation error:", error);
    }
  };

  const WordCard = ({ word }) => {
    const isLongWord = word.length > 7;
    return (
      <TouchableOpacity
        style={[styles.wordCard, isLongWord && styles.doubleColumn]}
        activeOpacity={0.7}
        onPress={() => translateWord(word)}
      >
        <Text style={styles.wordText}>
          {loading ? "Đang dịch..." : word}
        </Text>
        <MaterialIcons name="translate" size={16} color={COLORS.blackIconColor} style={styles.translateIcon} />
      </TouchableOpacity>
    );
  };

  const renderConjugationInfo = () => {
    if (label !== "Động từ" || !translatedWord.conjugated) return null;

    const conjugationItems = [
      {
        label: "Nguyên thể",
        value: translatedWord.conjugated.verb_infinitive,
        icon: "format-quote"
      },
      {
        label: "Ngôi 3 số ít",
        value: translatedWord.conjugated["3rd_person_singular"],
        icon: "person"
      },
      {
        label: "Quá khứ",
        value: translatedWord.conjugated.past_tense,
        icon: "history"
      },
      {
        label: "Quá khứ phân từ",
        value: translatedWord.conjugated.past_participle,
        icon: "done-all"
      },
      {
        label: "Hiện tại phân từ",
        value: translatedWord.conjugated.present_participle,
        icon: "schedule"
      }
    ];

    return (
      <View style={styles.conjugationContainer}>
        <View style={styles.conjugationHeader}>
          <MaterialIcons name="format-list-bulleted" size={20} color={COLORS.active} />
          <Text style={styles.conjugationTitle}>Chia động từ</Text>
        </View>
        <View style={styles.conjugationGrid}>
          {conjugationItems.map((item, index) => (
            <View key={index} style={styles.conjugationItem}>
              <View style={styles.conjugationItemContent}>
                <MaterialIcons name={item.icon} size={16} color={COLORS.grayColor} />
                <Text style={styles.conjugationLabel}>{item.label}</Text>
                <Text style={styles.conjugationValue}>{item.value}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name={icon} size={24} color={COLORS.active} />
        <Text style={styles.headerText}>{label}</Text>
      </View>

      <View style={styles.wordsGrid}>
        {data?.map((word, index) => (
          <WordCard key={index} word={word} />
        ))}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {loading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Bản dịch</Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                      setModalVisible(false);
                    }}
                  >
                    <MaterialIcons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                </View>

                <View style={styles.translationContainer}>
                  <View style={styles.translationRow}>
                    <Text style={styles.translationLabel}>Ngôn ngữ:</Text>
                    <View style={styles.languageInfo}>
                      <Text style={styles.translationText}>
                        {translatedWord.lang}
                      </Text>
                      <Image
                        source={{
                          uri: "https://res.cloudinary.com/dndakokcz/image/upload/v1728927635/1f1fb-1f1f3_mql9vk.png",
                        }}
                        style={styles.flagIcon}
                        resizeMode="contain"
                      />
                    </View>
                  </View>

                  <View style={styles.translationRow}>
                    <Text style={styles.translationLabel}>Tiếng Anh:</Text>
                    <Text style={styles.translationText}>
                      {translatedWord.original}
                    </Text>
                  </View>

                  <View style={styles.translationRow}>
                    <Text style={styles.translationLabel}>Tiếng Việt:</Text>
                    <Text style={styles.translationText}>
                      {translatedWord.translated}
                    </Text>
                  </View>

                  {renderConjugationInfo()}

                  <View style={styles.pronunciationContainer}>
                    <PronunciationButton text={translatedWord.original} voice={voice} />
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.backgroundColor,
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.active,
    marginLeft: 8,
  },
  wordsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    gap: 8,
  },
  wordCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: COLORS.lightGrayColor,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  doubleColumn: {
    minWidth: '95%',
  },
  wordText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.contentColor,
  },
  translateIcon: {
    opacity: 0.7,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.line,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.blackTextColor,
  },
  closeButton: {
    padding: 4,
  },
  translationContainer: {
    padding: 16,
    gap: 16,
  },
  translationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  translationLabel: {
    fontSize: 16,
    color: '#666',
  },
  translationText: {
    fontSize: 16,
    fontWeight: "500",
    color: '#1a1a1a',
  },
  flagIcon: {
    height: 20,
    width: 40,
  },
  conjugationContainer: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
  },
  conjugationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  conjugationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.blackTextColor,
  },
  conjugationGrid: {
    gap: 8,
  },
  conjugationItem: {
    backgroundColor: COLORS.lightGrayColor,
    borderRadius: 8,
    padding: 10,
  },
  conjugationItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  conjugationLabel: {
    fontSize: 13,
    color: COLORS.grayColor,
    flex: 1,
  },
  conjugationValue: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.blackTextColor,
  },
  pronunciationContainer: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.line,
    alignItems: 'center',
  },
});

export default WordTypeItem;
