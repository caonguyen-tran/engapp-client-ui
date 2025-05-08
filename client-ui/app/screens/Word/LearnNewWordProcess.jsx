import { useEffect, useRef, useState } from "react";
import { Alert, Animated, Dimensions, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import HeaderElement from "../../../components/Header/HeaderElement";
import LearnWord from "./LearnWord";
import { useNavigation } from "@react-navigation/native";
import MatchByWordProcess from "./MatchByWordProcess";
import LearnWordVI from "./LearnWordVI";
import AnswerAlert from "../../../components/screens/Word/AnswerAlert";
import { COLORS } from "../../../constants/Constant";
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");

const LearnNewWordProcess = ({ route }) => {
  const { listWord, flag } = route.params;
  const navigation = useNavigation();
  const [progress, setProgress] = useState(new Animated.Value(0));
  const [index, setIndex] = useState(0);
  const [clone, setClone] = useState([...listWord]);
  const [element, setElement] = useState(clone[index]);
  const position = useState(new Animated.Value(height))[0];
  const [visible, setVisible] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);

  const genElement = () => {
    const ran = Math.floor(Math.random() * clone.length);
    const elementRandom = clone[ran];
    setElement(elementRandom);
  };

  useEffect(() => {
    if (!visible) {
      Animated.timing(position, {
        toValue: height,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      setVisible(true);
      Animated.timing(position, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  useEffect(() => {
    // Calculate progress percentage whenever clone changes
    const totalWords = listWord.length;
    const remainingWords = clone.length;
    const completedWords = totalWords - remainingWords;
    const percentage = (completedWords / totalWords) * 100;
    setProgressPercentage(percentage);

    // Animate the progress bar
    Animated.timing(progress, {
      toValue: percentage,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [clone]);

  const progressBarChange = (correct) => {
    if (progress.__getValue() !== 0) {
      if (correct) {
        Animated.timing(progress, {
          toValue: progress.__getValue() + 50,
          duration: 500,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(progress, {
          toValue: progress.__getValue() - 50,
          duration: 500,
          useNativeDriver: false,
        }).start();
      }
    }
  };

  const handleChoice = (correct) => {
    if (correct) {
      let numberQuestionType = element.questionType;
      if (numberQuestionType == 0 || numberQuestionType == 1) {
        let newQuestionType = element.questionType + 1;
        let newClone = clone.map((item) =>
          item.id === element.id
            ? { ...item, questionType: newQuestionType }
            : item
        );
        setClone([...newClone]);
      } else {
        setClone((prev) => prev.filter((item) => item.id !== element.id));
      }
    }
    progressBarChange(correct);
  };

  const nextOnPress = () => {
    genElement();
    setVisible(!visible);
  };

  useEffect(() => {
    if (clone.length === 0) {
      if (flag === true) {
        navigation.navigate("ProcessComplete", { listWord: listWord });
      } else {
        navigation.navigate("PracticeComplete", { listWord: listWord });
      }
    }
  }, [clone]);

  const visibleCallback = () => {
    setVisible(!visible);
  };

  const correctCallBack = (value) => {
    setCorrect(value);
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
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.subContainer}>
        <HeaderElement
          textHeader="Chọn đáp án đúng"
          closeHandle={() => handleClose()}
        />
        {element ? (
          <>
            <View style={styles.mainView}>
              <View style={styles.progressContainer}>
                <Animated.View
                  style={[
                    styles.progressBar,
                    { width: `${progress.__getValue()}%` },
                  ]}
                />
                <Text style={styles.progressText}>
                  {Math.round(progressPercentage)}%
                </Text>
              </View>
              {element.questionType === 0 ? (
                <LearnWord
                  word={element}
                  handleChoice={handleChoice}
                  listWord={listWord}
                  visibleCallback={visibleCallback}
                  correctCallback={correctCallBack}
                />
              ) : element.questionType === 1 ? (
                <MatchByWordProcess
                  word={element}
                  handleChoice={handleChoice}
                  visibleCallback={visibleCallback}
                  correctCallback={correctCallBack}
                />
              ) : element.questionType === 2 ? (
                <LearnWordVI
                  word={element}
                  handleChoice={handleChoice}
                  listWord={listWord}
                  visibleCallback={visibleCallback}
                  correctCallback={correctCallBack}
                />
              ) : (
                <Text>None</Text>
              )}
            </View>
            <AnswerAlert
              position={position}
              isCorrect={correct}
              nextPressHandle={() => nextOnPress()}
              word={element}
            />
          </>
        ) : (
          <></>
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
  mainView: {
    flex: 1,
  },
  progressContainer: {
    marginHorizontal: 20,
    marginTop: 40,
    height: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  progressBar: {
    height: "100%",
    backgroundColor: COLORS.succcess,
    borderRadius: 10,
  },
  progressText: {
    position: "absolute",
    right: 10,
    top: 0,
    bottom: 0,
    textAlignVertical: "center",
    color: "#000",
    fontWeight: "bold",
  },
});

export default LearnNewWordProcess;
