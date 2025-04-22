import { Text, TouchableOpacity, View, Animated, ActivityIndicator, Platform } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/Constant";
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect } from "react";

const DoExamFooter = ({
  handleNextQuestion,
  handlePreviousQuestion,
  index,
  questionData,
  submitOnPress,
  loading,
}) => {
  const [prevButtonScale] = useState(new Animated.Value(1));
  const [nextButtonScale] = useState(new Animated.Value(1));

  const animateButton = (buttonScale, pressed) => {
    Animated.spring(buttonScale, {
      toValue: pressed ? 0.95 : 1,
      useNativeDriver: true,
    }).start();
  };

  // Add subtle bounce animation on mount
  useEffect(() => {
    const animateInitial = (buttonScale) => {
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 1.05,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(buttonScale, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start();
    };

    animateInitial(prevButtonScale);
    animateInitial(nextButtonScale);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Question Counter */}
        <View style={styles.counterContainer}>
          <MaterialIcons name="question-answer" size={24} color="black" />
          <Text style={styles.counterText}>
            Câu hỏi {index + 1}/{questionData.length}
          </Text>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonsContainer}>
          {index !== 0 && (
            <Animated.View
              style={[
                styles.buttonWrapper,
                {
                  transform: [{ scale: prevButtonScale }],
                },
              ]}
            >
              <TouchableOpacity
                style={[styles.navigationButton, styles.prevButton]}
                onPress={handlePreviousQuestion}
                onPressIn={() => animateButton(prevButtonScale, true)}
                onPressOut={() => animateButton(prevButtonScale, false)}
                activeOpacity={0.8}
              >
                <MaterialIcons name="arrow-back" size={20} color="#FFF" />
                <Text style={styles.buttonText}>Trước</Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          <Animated.View
            style={[
              styles.buttonWrapper,
              {
                transform: [{ scale: nextButtonScale }],
              },
            ]}
          >
            {index === questionData.length - 1 ? (
              <TouchableOpacity
                style={[styles.navigationButton, styles.submitButton]}
                onPress={submitOnPress}
                disabled={loading}
                onPressIn={() => animateButton(nextButtonScale, true)}
                onPressOut={() => animateButton(nextButtonScale, false)}
                activeOpacity={0.8}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" style={styles.loadingIndicator} />
                ) : (
                  <>
                    <Text style={styles.buttonText}>Nộp bài</Text>
                    <MaterialIcons name="check-circle" size={20} color="#FFF" />
                  </>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.navigationButton, styles.nextButton]}
                onPress={handleNextQuestion}
                onPressIn={() => animateButton(nextButtonScale, true)}
                onPressOut={() => animateButton(nextButtonScale, false)}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Tiếp</Text>
                <MaterialIcons name="arrow-forward" size={20} color="#FFF" />
              </TouchableOpacity>
            )}
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  counterText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonWrapper: {
    marginLeft: 8,
  },
  navigationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 100,
  },
  prevButton: {
    backgroundColor: '#6B7280',
  },
  nextButton: {
    backgroundColor: COLORS.btnColor,
  },
  submitButton: {
    backgroundColor: COLORS.succcess,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
    marginHorizontal: 4,
  },
  loadingIndicator: {
    marginHorizontal: 8,
  },
});

export default DoExamFooter;
