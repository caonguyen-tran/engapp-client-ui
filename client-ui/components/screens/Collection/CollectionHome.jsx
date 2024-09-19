import { FlatList, ScrollView, StyleSheet } from "react-native";
import { COLORS } from "../../../constants/Instant";
import HeaderStack from "../../Header/HeaderStack";
import CollectionItem from "./CollectionItem";
import ReminderView from "./ReminderView";
import FeatureGrid from "./FeatureGrid";
import { View } from "react-native";

const CollectionHome = ({ navigation }) => {
  const data = [
    {
      id: "66eab6c4588d1c6c4596c78a",
      name: "Bộ từ vựng TOEIC 400+ phần 2",
      description: "Bộ từ vựng TOEIC đạt mốc 400+ phần 2",
      image:
        "https://res.cloudinary.com/dbvrjuzo4/image/upload/v1726658243/collection-service/trn6cwxrhtf4w8obveqq.webp",
      createAt: "2024-09-18T11:17:24.293Z",
      updateAt: "2024-09-18T11:17:24.293Z",
      createBy: "133a645e-23f4-4201-b791-eec97ebc9653",
    },
    {
      id: "66eab6b5588d1c6c4596c789",
      name: "Bộ từ vựng TOEIC 400+ phần 1 ",
      description: "Bộ từ vựng TOEIC đạt mốc 400+ phần 1",
      image:
        "https://res.cloudinary.com/dbvrjuzo4/image/upload/v1726658228/collection-service/yowzew8ymmp5ywfdcmau.webp",
      createAt: "2024-09-18T11:17:09.969Z",
      updateAt: "2024-09-18T11:17:09.969Z",
      createBy: "133a645e-23f4-4201-b791-eec97ebc9653",
    },
    {
      id: "66eab69f588d1c6c4596c788",
      name: "Bộ từ vựng TOEIC 450+ phần 1 ",
      description: "Bộ từ vựng TOEIC đạt mốc 450+ phần 1",
      image:
        "https://res.cloudinary.com/dbvrjuzo4/image/upload/v1726658206/collection-service/dic5q6gg3zdysswqmwk8.webp",
      createAt: "2024-09-18T11:16:47.633Z",
      updateAt: "2024-09-18T11:16:47.633Z",
      createBy: "133a645e-23f4-4201-b791-eec97ebc9653",
    },
    {
      id: "66eab69f588d1c6c4596c782",
      name: "Bộ từ vựng TOEIC 450+ phần 1 ",
      description: "Bộ từ vựng TOEIC đạt mốc 450+ phần 1",
      image:
        "https://res.cloudinary.com/dbvrjuzo4/image/upload/v1726658206/collection-service/dic5q6gg3zdysswqmwk8.webp",
      createAt: "2024-09-18T11:16:47.633Z",
      updateAt: "2024-09-18T11:16:47.633Z",
      createBy: "133a645e-23f4-4201-b791-eec97ebc9653",
    },
    {
      id: "66eab69f588d1c6c4596c784",
      name: "Bộ từ vựng TOEIC 450+ phần 1 ",
      description: "Bộ từ vựng TOEIC đạt mốc 450+ phần 1",
      image:
        "https://res.cloudinary.com/dbvrjuzo4/image/upload/v1726658206/collection-service/dic5q6gg3zdysswqmwk8.webp",
      createAt: "2024-09-18T11:16:47.633Z",
      updateAt: "2024-09-18T11:16:47.633Z",
      createBy: "133a645e-23f4-4201-b791-eec97ebc9653",
    },
  ];

  return (
    <>
      <HeaderStack />
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <ReminderView />
          <FeatureGrid />
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <CollectionItem item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={false}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  content: {
    flex: 1,
    width: "100%",
  },
  listContainer: {
    padding: 16,
    width: "100%",
  },
});

export default CollectionHome;
