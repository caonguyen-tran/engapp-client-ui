import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Text, TextInput, View, Animated } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from "../../../constants/Constant";

const MatchByWordProcess = ({word, handleChoice, visibleCallback, correctCallback}) => {
  const [input, setInput] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));
  const [shakeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSubmitAnswer = () => {
    const isCorrect = input.toLowerCase().trim() === word.wordResponse.word.toLowerCase().trim();
    
    if (isCorrect) {
      correctCallback(true);
      handleChoice(true);
    } else {
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      
      correctCallback(false);
      handleChoice(false);
    }
    visibleCallback();
  };

  const handleKeyPress = (e) => {
    if (e.nativeEvent.key === 'Enter') {
      handleSubmitAnswer();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View 
        style={[
          styles.container, 
          { opacity: fadeAnim, transform: [{ translateX: shakeAnim }] }
        ]}
      >
        <View style={styles.card}>
          <View style={styles.wordView}>
            <MaterialIcons name="lightbulb" size={24} color="#FFC107" style={styles.icon} />
            <Text style={styles.definitionText}>
              {word.wordResponse.definition}
            </Text>
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setInput}
              value={input}
              placeholder="Type the correct word"
              placeholderTextColor="#9E9E9E"
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={handleSubmitAnswer}
              returnKeyType="done"
              blurOnSubmit={true}
            />
          </View>
          
          <TouchableOpacity
            onPress={handleSubmitAnswer}
            style={styles.submitButton}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#308AFF', '#1E88E5']}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Submit</Text>
              <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: "100%",
    backgroundColor: COLORS.backgroundColor,
  },
  card: {
    width: "100%",
    backgroundColor: COLORS.sectionBackground,
    borderRadius: 16,
    padding: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  wordView: {
    minHeight: 120,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
  },
  definitionText: {
    fontSize: 22,
    fontWeight: "500",
    color: "#333333",
    lineHeight: 30,
  },
  icon: {
    marginBottom: 10,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 24,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 16,
    fontSize: 18,
    backgroundColor: "#FFFFFF",
    color: "#333333",
  },
  submitButton: {
    width: "100%",
    height: 56,
    borderRadius: 8,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.whiteTextColor,
    marginRight: 8,
  },
});

export default MatchByWordProcess;
