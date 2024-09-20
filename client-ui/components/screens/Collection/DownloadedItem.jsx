import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";

const DownloadedItem = ({item, navigation}) => {
  const timeAgo = moment(item.downloadAt).fromNow();
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate("DownloadDetail", {collectionId: item.collection.id})}>
      <Image source={{ uri: item.collection.image }} style={styles.image} resizeMode="contain"/>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.collection.name}</Text>
        <Text style={styles.description}>{item.collection.description}</Text>
        <Text style={styles.time}>Download at {timeAgo}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 20, 
    marginBottom: 16,
    borderRadius: 10, 
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
    width: "100%"
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  time: {
    fontSize: 14, 
    color: '#888',
    marginTop: 10,
  },
});

export default DownloadedItem;
