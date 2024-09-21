import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Button,
} from "react-native";

const AnswerAlert = ({ isCorrect, visible, close, position, callback, nextPressHandle, answer }) => {


  return (
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
          backgroundColor: isCorrect ? "green" : "red",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <Text style={styles.alertText}>
          {isCorrect ? "Ban da chon dung" : "Ban sai roi!"}
        </Text>
      </View>
      <View style={styles.contentView}>
        
      </View>
      <View style={styles.btnView}>
        <TouchableOpacity style={styles.nextButton} onPress={nextPressHandle}>
          <Text style={styles.buttonText}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  alertText: {
    fontSize: 17,
    fontWeight: "500",
    color: "white",
  },
  contentView: {
    width: "100%",
    padding: 20,
    height: 250,
    flex: 1
  },
  btnView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20
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
});

export default AnswerAlert;
