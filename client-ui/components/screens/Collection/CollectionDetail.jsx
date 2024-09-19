import { FlatList, StyleSheet, Text, View } from "react-native";
import HeaderScreen from "../../Header/HeaderScreen";
import { ScrollView } from "react-native";
import CollectionDetailFooter from "../../Footer/CollectionDetailFooter";
import { COLORS } from "../../../constants/Instant";
import { TouchableOpacity } from "react-native";
import WordItem from "../Word/WordItem";

const CollectionDetail = ({ navigation }) => {
  const data = [
    {
      id: "66eabb173fbd6b138f80d806",
      word: "resolve",
      pofSpeech: {
        key: "V",
        engName: "Verb",
        viName: "Động từ",
      },
      pronunciation: "/prəˈvɪʒ.ən/",
      definition: "giải quyết, quyết định",
      example: "The dispute over the song rights proved impossible to resolve.",
      createdDate: "2024-09-18T11:35:51.273Z",
      updatedDate: "2024-09-18T11:35:51.273Z",
      wordLevel: {
        level: "C1",
        description: "Advanced",
      },
      createdBy: "133a645e-23f4-4201-b791-eec97ebc9653",
      collectionId: "66eab68a588d1c6c4596c787",
    },
    {
      id: "66eabace3fbd6b138f80d805",
      word: "provision",
      pofSpeech: {
        key: "N",
        engName: "Noun",
        viName: "Danh từ",
      },
      pronunciation: "/prəˈvɪʒ.ən/",
      definition: "sự cung cấp, chu cấp",
      example:
        "The provision of good public transport will be essential for developing the area.",
      createdDate: "2024-09-18T11:34:38.719Z",
      updatedDate: "2024-09-18T11:34:38.719Z",
      wordLevel: {
        level: "C1",
        description: "Advanced",
      },
      createdBy: "133a645e-23f4-4201-b791-eec97ebc9653",
      collectionId: "66eab68a588d1c6c4596c787",
    },
    {
        id: "66eabace3fbd6b138f80d802",
        word: "provision",
        pofSpeech: {
          key: "N",
          engName: "Noun",
          viName: "Danh từ",
        },
        pronunciation: "/prəˈvɪʒ.ən/",
        definition: "sự cung cấp, chu cấp",
        example:
          "The provision of good public transport will be essential for developing the area.",
        createdDate: "2024-09-18T11:34:38.719Z",
        updatedDate: "2024-09-18T11:34:38.719Z",
        wordLevel: {
          level: "C1",
          description: "Advanced",
        },
        createdBy: "133a645e-23f4-4201-b791-eec97ebc9653",
        collectionId: "66eab68a588d1c6c4596c787",
      },
      {
        id: "66eabace3fbd6b138f80d801",
        word: "provision",
        pofSpeech: {
          key: "N",
          engName: "Noun",
          viName: "Danh từ",
        },
        pronunciation: "/prəˈvɪʒ.ən/",
        definition: "sự cung cấp, chu cấp",
        example:
          "The provision of good public transport will be essential for developing the area.",
        createdDate: "2024-09-18T11:34:38.719Z",
        updatedDate: "2024-09-18T11:34:38.719Z",
        wordLevel: {
          level: "C1",
          description: "Advanced",
        },
        createdBy: "133a645e-23f4-4201-b791-eec97ebc9653",
        collectionId: "66eab68a588d1c6c4596c787",
      },
  ];
  return (
    <>
      <HeaderScreen label="Từ vựng" callback={() => navigation.goBack()} />
      <FlatList
        data={data}
        renderItem={({ item }) => <WordItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <CollectionDetailFooter navigation={navigation}/>
    </>
  );
};

const styles = StyleSheet.create({
  scrollStyle: {
    flex: 1,
    width: "100%",
  },
  contentView: {},
  listItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: COLORS.lightColor,
    height: 150,
    marginTop: 20,
  },
  wordLevelView: {},
  listContainer: {
    padding: 16,
  },

});

export default CollectionDetail;
