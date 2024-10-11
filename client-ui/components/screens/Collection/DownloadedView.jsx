import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { authApi, endpoints } from "../../../apis/APIs";
import { useAuth } from "../../../context/AuthContext";
import DownloadedItem from "./DownloadedItem";
import LoadingView from "../../lotties/LoadingView";
import { useDownload } from "../../../context/DownloadContext";

const DownloadedView = ({ navigation }) => {
  const { download } = useDownload();
  
  return (
    <View style={styles.collectionView}>
      <View style={styles.collectionHeaderView}>
        <Text style={{ fontSize: 20, fontWeight: "600", color: "gray" }}>
          Bộ sưu tập bạn đã tải
        </Text>
      </View>

      <FlatList
        data={download}
        renderItem={({ item }) => (
          <DownloadedItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        scrollEnabled={false}
      />
    </View>
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
  collectionView: {
    flex: 1,
    marginTop: 30,
    marginHorizontal: 10,
  },
  collectionHeaderView: {
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});

export default DownloadedView;
