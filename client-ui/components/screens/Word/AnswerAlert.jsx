import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Button,
} from "react-native";
import { COLORS } from "../../../constants/Instant";

const AnswerAlert = ({
  isCorrect,
  position,
  nextPressHandle,
  answer,
  word,
}) => {

  
  return word ? (
    <Animated.View
      style={{
        position: "absolute",
        left: 20,
        right: 20,
        bottom: 200,
        transform: [{ translateY: position }],
        backgroundColor: "white",
        borderRadius: 20,
        height: 420,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
      }}
    >
      <View
        style={{
          width: "100%",
          height: 50,
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: isCorrect ? COLORS.succcess : COLORS.fail,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <Text style={styles.alertText}>
          {isCorrect ? "Bạn đã chọn đúng 🗿" : "Sai mất rùi 💀"}
        </Text>
      </View>
      <View style={styles.contentView}>
        <View style={{ marginBottom: 20 }}>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>
              Câu trả lời của bạn
            </Text>
            <Text style={{ fontSize: 16, marginLeft: 10 }}>{answer}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>Đáp án</Text>
            <Text style={{ fontSize: 16, marginLeft: 10 }}>
              {word.wordResponse.word}
            </Text>
          </View>
        </View>
        <View style={styles.descriptionView}>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>Loại từ: </Text>
            <Text style={{ fontSize: 16 }}>
              {`${word.wordResponse.pofSpeech.viName} (${word.wordResponse.pofSpeech.engName})`}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>Phát âm: </Text>
            <Text style={{ fontSize: 16, fontStyle: "italic", color: "gray" }}>
              {word.wordResponse.pronunciation}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>Nghĩa: </Text>
            <Text style={{ fontSize: 16 }}>{word.wordResponse.definition}</Text>
          </View>
          <View style={{ flexDirection: "row", }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>Ví dụ: </Text>
            <Text style={{ fontSize: 16 }}>{word.wordResponse.example}</Text>
          </View>
        </View>
      </View>
      <View style={styles.btnView}>
        <TouchableOpacity style={styles.nextButton} onPress={nextPressHandle}>
          <Text style={styles.buttonText}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  alertText: {
    fontSize: 17,
    fontWeight: "500",
    fontStyle: "italic",
    color: "white",
  },
  contentView: {
    width: "100%",
    padding: 20,
    height: 300,
    flex: 1,
  },
  btnView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  nextButton: {
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
  answerView: {
    padding: 15,
  },
  correctAnswerView: {
    padding: 15,
  },
  descriptionView: {
    flex: 1,
  },
});

export default AnswerAlert;
