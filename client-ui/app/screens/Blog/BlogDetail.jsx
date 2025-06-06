import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import WordTypeItem from "../../../components/screens/Blog/WordTypeItem";
import HeaderScreen from "../../../components/Header/HeaderScreen";
import APIs, { authApi, endpoints } from "../../../apis/APIs";
import { useAuth } from "../../../context/AuthContext";
import { formatDate } from "../../../utils/common";
import { COLORS } from "../../../constants/Constant";
import SkeletonLoading from "../../../components/lotties/SkeletonLoading";
import PronunciationButton from "../../../components/common/PronunciationButton";
import VoiceOptionModal from "../../../components/screens/Blog/VoiceOptionModal";
import { SafeAreaView } from "react-native-safe-area-context";

const BlogDetail = ({ route }) => {
  const [data, setData] = useState({});
  const [analyzeData, setAnalyzeData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState({
    id: "en-US-Chirp3-HD-Achernar",
    name: "Giọng của Achernar - Nữ",
    icon: "woman",
  });
  const { token } = useAuth();
  const { id } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await authApi(token).get(
          endpoints["blog-service"]["get-by-id"](id)
        );

        const analyze_res = await APIs.post(
          endpoints["blog-analyze-service"]["analyze-text"],
          {
            text: res.data.data.content,
          }
        );
        setData(res.data.data);
        setAnalyzeData(analyze_res.data);
      } catch (ex) {
        console.log(ex);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.subContainer}>
        <HeaderScreen
          label="Nhật ký NLP"
          callback={() => navigation.goBack()}
        />
        {loading ? (
          <SkeletonLoading />
        ) : (
          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.contentWrapper}>
              <View style={styles.header}>
                <Text style={styles.title}>{data.title}</Text>
                <View style={styles.metaInfo}>
                  <View style={styles.metaWrapper}>
                    <MaterialIcons
                      name="event"
                      size={16}
                      color={COLORS.grayColor}
                    />
                    <Text style={styles.date}>
                      {formatDate(data.createdDate)}
                    </Text>
                  </View>
                  <View style={styles.metaWrapper}>
                    <MaterialIcons
                      name="person"
                      size={16}
                      color={COLORS.grayColor}
                    />
                    <Text style={styles.author}>ID: {data.userId}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.contentContainer}>
                <Text style={styles.content}>{data.content}</Text>
                <View style={styles.pronunciationWrapper}>
                  <PronunciationButton
                    text={data.content}
                    style={styles.pronunciationButton}
                    label="Đọc bài blog"
                    voice={selectedVoice}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.voiceSettingsButton}
                onPress={() => setShowVoiceModal(true)}
              >
                <MaterialIcons
                  name="settings-voice"
                  size={20}
                  color={COLORS.primary}
                />
                <Text style={styles.voiceSettingsText}>
                  {selectedVoice.name}
                </Text>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={20}
                  color={COLORS.primary}
                />
              </TouchableOpacity>

              <VoiceOptionModal
                showVoiceModal={showVoiceModal}
                setShowVoiceModal={setShowVoiceModal}
                selectedVoice={selectedVoice}
                setSelectedVoice={setSelectedVoice}
              />

              <View style={styles.vocabularySection}>
                <View style={styles.sectionHeader}>
                  <MaterialIcons
                    name="school"
                    size={24}
                    color={COLORS.blackTextColor}
                  />
                  <Text style={styles.sectionTitle}>Từ vựng gợi ý học tập</Text>
                </View>

                <View style={styles.wordTypesContainer}>
                  <WordTypeItem
                    label="Tính từ"
                    data={analyzeData.adjectives}
                    icon="format-color-text"
                    voice={selectedVoice}
                  />
                  <WordTypeItem
                    label="Danh từ"
                    data={analyzeData.nouns}
                    icon="category"
                    voice={selectedVoice}
                  />
                  <WordTypeItem
                    label="Động từ"
                    data={analyzeData.verbs}
                    icon="directions-run"
                    voice={selectedVoice}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  subContainer: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  scrollContainer: {
    flex: 1,
  },
  contentWrapper: {
    padding: 16,
  },
  header: {
    backgroundColor: COLORS.sectionBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.blackTextColor,
    marginBottom: 12,
    lineHeight: 32,
  },
  metaWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  metaInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  date: {
    fontSize: 14,
    color: COLORS.grayColor,
    marginLeft: 4,
    marginRight: 12,
  },
  author: {
    fontSize: 14,
    color: COLORS.grayColor,
    marginLeft: 4,
  },
  contentContainer: {
    backgroundColor: COLORS.sectionBackground,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.contentColor,
    marginBottom: 16,
  },
  pronunciationWrapper: {
    alignItems: "center",
    marginTop: 8,
  },
  pronunciationButton: {
    alignSelf: "center",
  },
  vocabularySection: {
    backgroundColor: COLORS.sectionBackground,
    borderRadius: 16,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.blackTextColor,
    marginLeft: 8,
  },
  wordTypesContainer: {
    gap: 16,
  },
  voiceSettingsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary + "15",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  voiceSettingsText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default BlogDetail;
