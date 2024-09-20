import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import Input from "../../Input/Input";
import { authApi, endpoints } from "../../../apis/APIs";
import { useAuth } from "../../../context/AuthContext";
import LoadingView from "../../lotties/LoadingView";

const ERROR_MSG = "Trường này không được để trống!";
const CreateNewWord = ({ collectionId, onRefresh }) => {
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const [newWord, setNewWord] = useState({
    word: "",
    pofSpeech: "V",
    pronunciation: "",
    definition: "",
    example: "",
    wordLevel: "A1",
    collectionId: collectionId,
  });

  const pofSpeechOptions = [
    { key: "N", value: "Danh từ (N)" },
    { key: "Pronoun", value: "Đại từ (Pron)" },
    { key: "V", value: "Động từ (V)" },
    { key: "Adj", value: "Tính từ (Adj)" },
    { key: "Adv", value: "Trạng từ (Adv)" },
    { key: "Preposition", value: "Giới từ" },
    { key: "Phrasal Verb", value: "Thán từ" },
    { key: "Interjection", value: "Cụm động từ" },
  ];

  const wordLevelOptions = [
    { key: "A1", value: "A1" },
    { key: "A2", value: "A2" },
    { key: "B1", value: "B1" },
    { key: "B2", value: "B2" },
    { key: "C1", value: "C1" },
    { key: "C2", value: "C2" },
  ];

  const inputValidation = () => {
    setError({});
    let valid = true;
    if (!newWord.word) {
      handleError("word", ERROR_MSG);
      valid = false;
    }
    if (!newWord.pronunciation) {
      handleError("pronunciation", ERROR_MSG);
      valid = false;
    }
    if (!newWord.definition) {
      handleError("definition", ERROR_MSG);
      valid = false;
    }
    if (!newWord.pofSpeech) {
      handleError("pofSpeech", ERROR_MSG);
      valid = false;
    }
    if (!newWord.example) {
      handleError("example", ERROR_MSG);
      valid = false;
    }
    if (valid) {
      createSubmit();
    }
  };

  const handleError = (input, value) => {
    setError((current_error) => ({ ...current_error, [input]: value }));
  };

  const change = (field, value) => {
    setNewWord((current) => {
      return { ...current, [field]: value };
    });
  };

  const createSubmit = async () => {
    setLoading(true);
    try {
      const res = await authApi(token).post(
        endpoints["word-service"]["create-word"],
        newWord
      );
      console.log(res.data.data);
      onRefresh()
      alert("Thêm từ mới thành công.")
    } catch (ex) {
      console.log(ex);
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Thêm Từ Vựng</Text>

      <Input
        label="Từ mới"
        value={newWord.word}
        onChangeHandle={(t) => {
          change("word", t);
        }}
        error={error.word}
        holderText="Nhập từ mới..."
      />

      <Text style={styles.label}>Loại từ</Text>
      <SelectList
        setSelected={(val) => change("pofSpeech", val)}
        data={pofSpeechOptions}
        save="key"
        defaultOption={pofSpeechOptions[0]}
        boxStyles={styles.dropdownBoxStyle}
        dropdownStyles={styles.dropdownStyle}
        inputStyles={styles.dropdownInputStyle}
      />

      <Input
        label="Phát âm"
        value={newWord.pronunciation}
        onChangeHandle={(t) => {
          change("pronunciation", t);
        }}
        error={error.pronunciation}
        holderText="Cách phát âm..."
      />

      <Input
        label="Nghĩa"
        value={newWord.definition}
        onChangeHandle={(t) => {
          change("definition", t);
        }}
        error={error.definition}
        holderText="Nghĩa của từ..."
      />

      <Input
        label="Ví dụ"
        value={newWord.example}
        onChangeHandle={(t) => {
          change("example", t);
        }}
        error={error.example}
        holderText="Ví dụ..."
        multipleLine={true}
        custom={{ height: 100 }}
      />

      <Text style={styles.label}>Trình độ từ</Text>
      <SelectList
        setSelected={(val) => change("wordLevel", val)}
        data={wordLevelOptions}
        save="key"
        defaultOption={wordLevelOptions[0]}
        boxStyles={styles.dropdownBoxStyle}
        dropdownStyles={styles.dropdownStyle}
        inputStyles={styles.dropdownInputStyle}
      />

      {!loading ? (
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => inputValidation()}
        >
          <Text style={styles.saveButtonText}>Lưu từ vựng</Text>
        </TouchableOpacity>
      ) : (
        <LoadingView />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#555",
  },
  dropdownBoxStyle: {
    backgroundColor: "#FFF",
    borderColor: "#DDD",
    borderRadius: 10,
    marginBottom: 20,
    height: 50,
  },
  dropdownStyle: {
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  dropdownInputStyle: {
    fontSize: 16,
    color: "#444",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CreateNewWord;
