import moment from "moment";
import { TouchableOpacity, Image, StyleSheet, Text, View, Platform } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from "../../../constants/Constant";

const CollectionItem = ({item, navigation}) => {
  const timeAgo = moment(item.createAt).fromNow();
  
  return (
    <View style={styles.shadowContainer}>
      <TouchableOpacity 
        style={styles.itemContainer} 
        onPress={() => navigation.navigate("CollectionDetail", {collectionId: item.id})} 
        activeOpacity={0.7}
      >
        <Image 
          source={{ uri: item.image }} 
          style={styles.image} 
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            <MaterialIcons name="chevron-right" size={24} color={COLORS.primary} />
          </View>
          <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
          <View style={styles.footer}>
            <View style={styles.statsContainer}>
              <MaterialIcons name="folder" size={16} color="#6B7280" />
              <Text style={styles.statsText}>20 từ</Text>
            </View>
            <View style={styles.timeContainer}>
              <MaterialIcons name="access-time" size={16} color="#6B7280" />
              <Text style={styles.time}>{timeAgo}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
      },
    }),
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: '#F3F4F6',
  },
  infoContainer: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    flex: 1,
    fontSize: Platform.OS === 'ios' ? 17 : 18,
    fontWeight: '600',
    color: '#1F2937',
    marginRight: 8,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#6B7280',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    marginLeft: 6,
    fontSize: 14,
    color: '#6B7280',
  },
});

export default CollectionItem;
