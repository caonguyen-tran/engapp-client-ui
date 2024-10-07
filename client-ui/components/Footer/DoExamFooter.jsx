import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/Instant";
import LoadingView from "../lotties/LoadingView";

const DoExamFooter = ({
  handleNextQuestion,
  handlePreviousQuestion,
  index,
  questionData,
  submitOnPress,
  loading,
}) => {
  return (
    <View style={styles.navigationButtons}>
      {index === 0 ? (
        <View></View>
      ) : (
        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: "gray" }]}
          onPress={handlePreviousQuestion}
          disabled={index === 0}
        >
          <Text style={styles.navButtonText}>Câu hỏi trước</Text>
        </TouchableOpacity>
      )}

      {index === questionData.length - 1 ? (
        loading ? (
          <View style={{ height: "100%", width: "120" }}>
            <LoadingView />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.navSubmitButton}
            onPress={submitOnPress}
          >
            <Text style={styles.navButtonText}>Nộp bài</Text>
          </TouchableOpacity>
        )
      ) : (
        <TouchableOpacity
          style={styles.navButton}
          onPress={handleNextQuestion}
          disabled={index === questionData.length - 1}
        >
          <Text style={styles.navButtonText}>Câu hỏi tiếp theo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 78,
  },
  navButton: {
    backgroundColor: COLORS.btnColor,
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  navSubmitButton: {
    backgroundColor: COLORS.succcess,
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  navButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default DoExamFooter;
