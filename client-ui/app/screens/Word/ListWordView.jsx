import { Animated, StyleSheet } from "react-native";
import WordItem from "../../../components/screens/Word/WordItem";

const ListWordView = ({ data }) => {
  const renderItem = ({ item, index }) => {
    const animatedValue = new Animated.Value(0);
    
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      delay: index * 100,
      useNativeDriver: true,
    }).start();

    return (
      <Animated.View
        style={{
          opacity: animatedValue,
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        }}
      >
        <WordItem item={item} />
      </Animated.View>
    );
  };

  return (
    <Animated.FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => `word-${item.id}-${index}`}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
});

export default ListWordView;
