import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LoadingView from "../../../components/lotties/LoadingView";
import WordTypeItem from "../../../components/screens/Blog/WordTypeItem"
import HeaderScreen from "../../../components/Header/HeaderScreen";
import APIs, { authApi, endpoints } from "../../../apis/APIs";
import { useAuth } from "../../../context/AuthContext";

const BlogDetail = ({ route }) => {
  const [data, setData] = useState({});
  const [analyzeData, setAnalyzeData] = useState({});
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const { id } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await authApi(token).get(
          endpoints["blog-service"]["get-by-id"](id)
        );

        const analyze_res = await APIs.post(
          endpoints["blog-analyze-service"]["analyze-text"],
          {
            text: res.data.data.content,
          }
        );
        setData(res.data.data);
        setAnalyzeData(analyze_res.data);
      } catch (ex) {
        console.log(ex);
      }
      setLoading(false);
    };

    fetchData();
  }, []);
  return (
    <>
      <HeaderScreen
        label="Nhật ký NLP"
        callback={() => navigation.goBack()}
      />
      {loading ? (
        <LoadingView />
      ) : (
        <>
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
            <View>
              <Text style={styles.author}>Author ID: {data.userId}</Text>
            </View>
            <View style={{paddingTop: 20}}>
              <View style={{alignItems: "center", height: 50}}>
                <Text style={{fontSize: 26, color: "#555", fontWeight: "bold", backgroundColor: "#ccc"}}>Các từ vựng bạn có thể học</Text>
              </View>
              <WordTypeItem label="Tính từ" data={analyzeData.adjectives} />
              <WordTypeItem label="Danh từ" data={analyzeData.nouns} />
              <WordTypeItem label="Động từ" data={analyzeData.verbs} />
            </View>
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
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  date: {
    fontSize: 16,
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
    fontSize: 18,
    lineHeight: 24,
    color: "#444",
  },
  author: {
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },
});

export default BlogDetail;
