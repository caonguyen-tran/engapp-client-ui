import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { authApi, endpoints } from "../../../apis/APIs";
import LoadingView from "./../../lotties/LoadingView";
import HeaderScreen from "../../Header/HeaderScreen";
import NoActiveView from "../../lotties/NoActiveView";
import { useNavigation } from "@react-navigation/native";
import HeaderElement from "../../Header/HeaderElement";
import HeaderStack from "../../Header/HeaderStack";

const BlogHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const navigation = useNavigation();

  const fetchBlogs = async () => {
    try {
      const response = await authApi(token).get(
        endpoints["blog-service"]["get-all"]
      );

      setBlogs(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const renderBlogItem = ({ item }) => (
    <Pressable
      onPress={() => navigation.navigate("BlogDetail", { id: item.id })}
      style={styles.blogItem}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>{item.content.slice(0, 100)}... </Text>
        <View style={styles.infoContainer}>
          <Text style={styles.username}>By: {item.userId}</Text>
          <Text style={styles.date}>
            Posted on: {new Date(item.createdDate).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <>
      {loading ? (
        <LoadingView />
      ) : (
        <>
          <HeaderStack />
          {blogs.length <= 0 ? (
            <NoActiveView textAlert="Hiện chưa có blog nào" />
          ) : (
            <FlatList
              data={blogs}
              renderItem={renderBlogItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.container}
            />
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F9F9F9",
    flex: 1,
  },
  loading: {
    marginTop: 100,
  },
  blogItem: {
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  content: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 10,
  },
  username: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#777",
  },
  date: {
    fontSize: 12,
    color: "#777",
  },
});

export default BlogHome;
