import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const opacity = useSharedValue(0);

  const toggleOverlay = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    if (isVisible) {
      opacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
    } else {
      opacity.value = withTiming(0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
    }
  }, [isVisible, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleOverlay} style={styles.button}>
        <Text style={styles.buttonText}>Bấm vào đây để xem nghĩa</Text>
      </TouchableOpacity>

      {isVisible && (
        <Animated.View style={[styles.overlay, animatedStyle]}>
          <Text style={styles.overlayText}>Đây là nghĩa của từ</Text>
          <TouchableOpacity onPress={toggleOverlay} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  button: {
    padding: 16,
    backgroundColor: "#007BFF",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  overlay: {
    position: "absolute",
    top: 100,
    left: 20,
    right: 20,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 8,
    elevation: 5,
    zIndex: 1000, 
  },
  overlayText: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center",
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#dc3545",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default App;
