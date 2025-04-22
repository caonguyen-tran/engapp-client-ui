import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { StyleSheet, Text, TextInput, View, SafeAreaView } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import HeaderElement from "../../../components/Header/HeaderElement";

const MatchByWord = ({ route }) => {
  const { listNew } = route.params;
  const [queue, setQueue] = useState([...listNew]);
  const [listWord, setListWord] = useState([]);
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();
  const [input, setInput] = useState("");
  const [correct, setCorrect] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (listWord.length >= 5) {
      navigation.navigate("LearnNewWordProcess", { 
        listWord: listWord, 
        flag: true 
      });
    }
  }, [listWord]);

  const handleAnswer = (value) => {
    if (queue && queue.length > 0) {
      const isCorrect = value.toLowerCase() === queue[index].wordResponse.word.toLowerCase();
      setCorrect(isCorrect);
      setShowResult(true);

      if (isCorrect) {
        setListWord((prev) => [
          ...prev,
          { ...queue[index], questionType: 0 },
        ]);
      } else {
        setQueue((prev) => [...prev, queue[index]]);
      }
    }
  };

  const nextQuestion = () => {
    setIndex(index + 1);
    setShowResult(false);
    setInput("");
  };

  const handleClose = () => {
    Alert.alert(
      "Thông báo",
      "Bạn có muốn thoát tiến trình học không ?",
      [
        { text: "OK", onPress: () => navigation.navigate("WordHome") },
        { text: "Cancel", onPress: () => {}, style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const renderResultCard = () => {
    if (!showResult) return null;

    return (
      <View style={styles.resultCard}>
        <View style={styles.resultHeader}>
          <MaterialIcons 
            name={correct ? "check-circle" : "error"} 
            size={40} 
            color={correct ? "#4CAF50" : "#F44336"} 
          />
          <Text style={styles.resultText}>
            {correct ? "Chính xác!" : "Chưa đúng"}
          </Text>
        </View>
        <Text style={styles.correctAnswer}>
          Từ đúng: {queue[index].wordResponse.word}
        </Text>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={nextQuestion}
        >
          <Text style={styles.nextButtonText}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderElement textHeader="Bắt đầu" closeHandle={handleClose} />
      {queue && queue[index] && queue[index].wordResponse ? (
        <View style={styles.container}>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${(index / queue.length) * 100}%` }]} />
          </View>

          <View style={styles.card}>
            <View style={styles.wordSection}>
              <Text style={styles.wordText}>
                {queue[index].wordResponse.word}
              </Text>
              <Text style={styles.pronunciationText}>
                {queue[index].wordResponse.pronunciation}
              </Text>
            </View>

            <View style={styles.definitionSection}>
              <Text style={styles.exampleText}>
                {queue[index].wordResponse.example}
              </Text>
              <Text style={styles.definitionText}>
                {queue[index].wordResponse.definition}
              </Text>
            </View>

            <View style={styles.inputSection}>
              <TextInput
                style={styles.input}
                onChangeText={setInput}
                value={input}
                placeholder="Nhập từ đúng"
                placeholderTextColor="#9E9E9E"
                autoCapitalize="none"
                editable={!showResult}
              />
              <TouchableOpacity
                style={[styles.submitButton, !input && styles.submitButtonDisabled]}
                onPress={() => handleAnswer(input)}
                disabled={!input || showResult}
              >
                <Text style={styles.submitButtonText}>Kiểm tra</Text>
              </TouchableOpacity>
            </View>
          </View>

          {renderResultCard()}
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 20,
  },
  progress: {
    height: '100%',
    backgroundColor: '#308AFF',
    borderRadius: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  wordSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  wordText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 8,
  },
  pronunciationText: {
    fontSize: 18,
    color: '#757575',
    fontStyle: 'italic',
  },
  definitionSection: {
    marginBottom: 24,
  },
  exampleText: {
    fontSize: 16,
    color: '#424242',
    marginBottom: 12,
    lineHeight: 24,
  },
  definitionText: {
    fontSize: 16,
    color: '#616161',
    lineHeight: 24,
  },
  inputSection: {
    marginTop: 16,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 18,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#308AFF',
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#BDBDBD',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  resultCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  resultText: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 12,
    color: '#212121',
  },
  correctAnswer: {
    fontSize: 18,
    color: '#616161',
    textAlign: 'center',
    marginBottom: 24,
  },
  nextButton: {
    backgroundColor: '#308AFF',
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default MatchByWord;
