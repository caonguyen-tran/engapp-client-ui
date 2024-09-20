import { FlatList, StyleSheet } from "react-native";
import WordItem from "../../../components/screens/Word/WordItem";

const ListWordView = ({ data }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <WordItem item={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
});
export default ListWordView;
