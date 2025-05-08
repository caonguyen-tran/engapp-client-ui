import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Text } from "react-native";
import { authApi, endpoints } from "../../../apis/APIs";
import { useAuth } from "../../../context/AuthContext";
import HeaderElement from "../../../components/Header/HeaderElement";
import CompletedView from "../../../components/lotties/CompletedView";
import LoadingView from "../../../components/lotties/LoadingView";
import { COLORS } from "../../../constants/Constant";
import { SafeAreaView } from "react-native-safe-area-context";

const ProcessComplete = ({ route }) => {
  const navigation = useNavigation();
  const { listWord } = route.params;
  const listLearnedRequest = listWord.map((item) => ({ learnedId: item.id }));
  const [learnedResponse, setLearnedResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response = await authApi(token).post(
          endpoints["word-service"]["learn-first-time"],
          listLearnedRequest
        );

        setLearnedResponse(response.data.data);
        console.log(response.data);
      } catch (ex) {
        console.log(ex);
      }
      setLoading(false);
    };

    fetchData();
    console.log(listLearnedRequest);
  }, []);

  const renderItem = ({ item }) => (
    <View style={[styles.wordContainer, styles.wordCompleted]}>
      <Text style={styles.wordText}>{item.wordResponse.word}</Text>
      <TouchableOpacity style={styles.completeButton} disabled={item.completed}>
        <Text style={styles.completeButtonText}>
          {item.completed ? "Đã học" : "Hoàn thành"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.subContainer}>
        {!loading ? (
          <>
            <Text style={styles.header}>Hoàn thành tiến trình</Text>
            <CompletedView />
            <FlatList
              data={learnedResponse}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              style={styles.list}
            />
            <View style={styles.backBtnContainer}>
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => navigation.navigate("WordHome")}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "white",
                    marginRight: 5,
                  }}
                >
                  Quay về
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <LoadingView />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  subContainer: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  list: {
    marginTop: 10,
  },
  wordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: COLORS.sectionBackground,
    borderRadius: 10,
    marginBottom: 10,
  },
  wordCompleted: {
    backgroundColor: "#DFF2BF",
  },
  wordIncomplete: {
    backgroundColor: "#FFD2D2",
  },
  wordText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  completeButton: {
    backgroundColor: COLORS.succcess,
    padding: 10,
    borderRadius: 5,
  },
  completeButtonText: {
    color: COLORS.whiteTextColor,
    fontWeight: "bold",
  },
  backBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.btnColor,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  backBtnContainer: {
    width: "100%",
    marginBottom: 25,
  },
});

export default ProcessComplete;
