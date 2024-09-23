import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput, View } from "react-native";
const MatchByWordProcess = ({word, handleChoice, visibleCallback, correctCallback}) => {
  const navigation = useNavigation();
  const [input, setInput] = useState("");

  const handleSubmitAnswer = () => {
    const isCorrect = input === word.wordResponse.word
    if(isCorrect){ 
      correctCallback(true)
      handleChoice(true)
    }
    else{
      correctCallback(false)
      handleChoice(false)
    }
    visibleCallback()
  }

  return (
    <View style={styles.container}>
      <View style={styles.wordView}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 26, fontWeight: "500" }}>
            {word.wordResponse.definition}
          </Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setInput}
          value={input}
          placeholder="Type the correct word"
          placeholderTextColor="gray"
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity
        onPress={() => handleSubmitAnswer()}
        style={styles.learnButton}
      >
        <Text style={styles.buttonText}>Xong</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    width: "100%",
    marginTop: 30,
  },
  wordView: {
    height: 150,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  definitionContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  definition: {
    fontSize: 16,
    textAlign: "center",
    width: "80%",
    marginVertical: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    width: "90%",
  },
  btnSubmit: {
    height: 40,
    width: 60,
    backgroundColor: "red",
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  learnButton: {
    backgroundColor: "#308AFF",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default MatchByWordProcess;
