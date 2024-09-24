import { useEffect, useState } from "react";
import HeaderElement from "../../../components/Header/HeaderElement";
import { authApi, endpoints } from "../../../apis/APIs";
import { useAuth } from "../../../context/AuthContext";
import LoadingView from "../../../components/lotties/LoadingView";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NoActiveView from "../../../components/lotties/NoActiveView";
import { TouchableOpacity } from "react-native";

const ListWordPractice = () => {
  const [listWord, setListWord] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        let res = await authApi(token).get(
          endpoints["word-service"]["get-list-by-review"](false)
        );
        let data = res.data.data;
        let request = data.map((item) => ({ ...item, questionType: 0 }));

        setListWord(request);
      } catch (ex) {
        console.log(ex);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

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

  return (
    <>
      <HeaderElement textHeader="ôn tập" closeHandle={() => handleClose()} />
      {loading ? (
        <LoadingView />
      ) : listWord.length <= 0 ? (
        <NoActiveView textAlert="Không có từ vựng nào cần ôn!" visible={true} />
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.headerText}>Các từ vựng bạn cần ôn</Text>
            {listWord.map((item) => (
              <View style={styles.card} key={item.id}>
                <Text style={styles.wordText}>{item.wordResponse.word}</Text>
                <Text style={styles.pronunciationText}>
                  {item.wordResponse.pronunciation}
                </Text>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Definition:</Text>
                  <Text style={styles.definitionText}>
                    {item.wordResponse.definition}
                  </Text>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Example:</Text>
                  <Text style={styles.exampleText}>
                    {item.wordResponse.example}
                  </Text>
                </View>

                <View style={styles.button}>
                  <Text style={styles.buttonText}>
                    {item.learnedMaster.name}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.fixedButton}
            onPress={() =>
              navigation.navigate("LearnNewWordProcess", {
                listWord: listWord,
                flag: false,
              })
            }
          >
            <Text style={styles.buttonText}>Bắt đầu ôn</Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f4f8",
    paddingBottom: 100,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 10,
  },
  wordText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  pronunciationText: {
    fontSize: 18,
    color: "#777",
    marginBottom: 15,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  definitionText: {
    fontSize: 16,
    color: "#444",
  },
  exampleText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#444",
  },
  button: {
    marginTop: 20,
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  fixedButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#4caf50",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ListWordPractice;
