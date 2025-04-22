import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../../constants/Constant";

const LearnWord = ({ word, handleChoice, listWord, visibleCallback, correctCallback }) => {
  const [options, setOptions] = useState([]);

  const fillOptions = (arrays) => {
    let fillArray = []
    let i = 0;
    while(i < 3){
      if(arrays[i].id !== word.id){
        fillArray.push(arrays[i].wordResponse.definition)
      }
      i++; 
    }
    let ranNum = Math.floor(Math.random() * fillArray.length)

    fillArray.splice(ranNum, 0, word.wordResponse.definition)
    setOptions([...fillArray])
  }

  useEffect(() => {
    fillOptions(listWord)
    console.log(options)
  }, [word]);

  const handleChooseOption = (index) => {
    const isCorrect = options[index] === word.wordResponse.definition
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
    <>
      {word ? (
        <View style={styles.mainView}>
          <View style={styles.questionView}>
            <Text style={styles.question}>{word.wordResponse.word}</Text>
          </View>
          {options ? (
            <View style={{ flex: 1 }}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.option}
                  onPress={() => handleChooseOption(index)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <></>
          )}
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  progressBar: {
    alignSelf: "stretch",
    height: 20,
    backgroundColor: COLORS.succcess,
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 40,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: COLORS.backgroundColor,
    paddingTop: 50,
  },
  question: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  questionView: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  input: {
    height: 50,
    marginHorizontal: 20,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    width: "90%",
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: "#ffffff",
  },
  option: {
    height: 100,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: COLORS.sectionBackground,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  optionText: {
    fontSize: 18,
    textAlign: "center",
    color: COLORS.subTextColor,
  },
  feedback: {
    fontSize: 18,
    color: COLORS.dangerColor,
    margin: 20,
  },
  bottomText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  wordLevelView: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: COLORS.sectionBackground,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  wordLevel: {
    fontSize: 14,
    fontWeight: "500",
  },
  typeWord: {
    color: "gray",
    fontSize: 15,
    fontWeight: "500",
  },
});

export default LearnWord;
