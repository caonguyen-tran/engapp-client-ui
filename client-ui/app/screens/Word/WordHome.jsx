import { useNavigation } from "@react-navigation/native";
import HeaderStack from "../../../components/Header/HeaderStack";
import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import WordLevelView from "../../../components/screens/Word/WordLevelView";
import ReminderView from "../../../components/screens/Collection/ReminderView";
import DownloadedView from "../../../components/screens/Collection/DownloadedView";
import { COLORS } from "./../../../constants/Instant";

const WordHome = () => {
  const navigation = useNavigation();

  const wordLevel = {
    one: {
      key: 1,
      value: 12,
    },
    two: {
      key: 2,
      value: 51,
    },
    three: {
      key: 3,
      value: 6,
    },
    four: {
      key: 4,
      value: 32,
    },
    five: {
      key: 5,
      value: 77,
    },
    six: {
      key: 6,
      value: 42,
    },
  };

  const navHandle = () => {
    navigation.navigate("ListWordPractice");
  };

  return (
    <>
      <HeaderStack label="Bộ từ của bạn" />
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.subtitle}>
            Learn less, remember more with scientific method Spaced Repetition
          </Text>
          <View style={styles.statisticView}>
            <Text style={styles.learnedWords}>Đã học 148/302 từ</Text>
            <WordLevelView keyLevel={wordLevel["one"]} color={COLORS.level1} />
            <WordLevelView keyLevel={wordLevel["two"]} color={COLORS.level2} />
            <WordLevelView
              keyLevel={wordLevel["three"]}
              color={COLORS.level3}
            />
            <WordLevelView keyLevel={wordLevel["four"]} color={COLORS.level4} />
            <WordLevelView keyLevel={wordLevel["five"]} color={COLORS.level5} />
            <WordLevelView keyLevel={wordLevel["six"]} color={COLORS.level6} />
          </View>
          <ReminderView
            custom={{
              width: "90%",
              borderRadius: 20,
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowOffset: { width: 0, height: 3 },
              shadowRadius: 5,
              elevation: 5,
            }}
            navHandle={navHandle}
          />
        </View>
        <DownloadedView navigation={navigation} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  subtitle: {
    color: "#000",
    fontSize: 16,
    marginBottom: 10,
  },
  learnedWords: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#6200EA",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    padding: 20,
    backgroundColor: "#212121",
  },
  footerText: {
    color: "#FFF",
    fontSize: 16,
  },
  statisticView: {
    width: "98%",
    height: 380,
    borderRadius: 12,
    backgroundColor: "#FFF",
    marginTop: 15,
    elevation: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
});

export default WordHome;
