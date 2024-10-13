import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { authApi, endpoints } from "../../../apis/APIs";
import { useAuth } from "../../../context/AuthContext";
import LoadingView from "./../../lotties/LoadingView";
import HeaderScreen from "../../Header/HeaderScreen";
import { useNavigation } from "@react-navigation/native";

const BlogDetail = ({ route }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const { id } = route.params;
  const navigation = useNavigation()

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const res = await authApi(token).get(
          endpoints["blog-service"]["get-by-id"](id)
        );
        console.log(id);
        setData(res.data.data);
      } catch (ex) {
        console.log(ex);
      }
    };

    fetchData();
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <LoadingView />
      ) : (
        <>
          <HeaderScreen label="Nhật ký NLP" />
          <ScrollView style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>{data.title}</Text>
              <Text style={styles.date}>
                {new Date(data.createdDate).toLocaleDateString()}
              </Text>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.content}>{data.content}</Text>
            </View>
            <Text style={styles.author}>Author ID: {data.userId}</Text>
          </ScrollView>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  date: {
    fontSize: 14,
    color: "#777",
    marginVertical: 5,
  },
  contentContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    elevation: 2,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },
  author: {
    marginTop: 20,
    fontSize: 14,
    color: "#555",
  },
});

export default BlogDetail;
