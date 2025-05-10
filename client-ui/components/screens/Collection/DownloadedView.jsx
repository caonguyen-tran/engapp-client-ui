import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DownloadedItem from "./DownloadedItem";
import { useDownload } from "../../../context/DownloadContext";
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from "../../../constants/Constant";

const DownloadedView = ({ navigation }) => {
  const { download } = useDownload();
  
  if (!download || download.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIcon}>
          <MaterialIcons name="cloud-download" size={48} color="#ccc" />
        </View>
        <Text style={styles.emptyTitle}>Chưa có bộ sưu tập nào</Text>
        <Text style={styles.emptyDescription}>
          Tải xuống các bộ sưu tập để học offline
        </Text>
        <TouchableOpacity 
          style={styles.exploreButton}
          onPress={() => navigation.navigate("Collection")}
        >
          <Text style={styles.exploreButtonText}>Khám phá bộ sưu tập</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={download}
        renderItem={({ item }) => (
          <DownloadedItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        nestedScrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  exploreButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DownloadedView;
