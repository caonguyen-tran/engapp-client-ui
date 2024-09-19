import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Button,
} from "react-native";

const AnswerAlert = ({ isCorrect, visible, close, position }) => {
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
        height: 400,
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  alertText: {
    fontSize: 17,
    fontWeight: "500",
    color: "white",
  },
});

export default AnswerAlert;
