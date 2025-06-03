import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  RefreshControl,
  Platform,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../../context/AuthContext";
import { authApi, endpoints } from "../../../apis/APIs";
import { useNavigation } from "@react-navigation/native";
import HeaderStack from "../../../components/Header/HeaderStack";
import NoActiveView from "../../../components/lotties/NoActiveView";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, HEADER_CONFIG } from "../../../constants/Constant";
import { SafeAreaView } from "react-native-safe-area-context";
import SkeletonLoading from "../../../components/lotties/SkeletonLoading";

const BlogHome = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { token } = useAuth();
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fetchBlogs = async (isRefreshing = false) => {
    if (isRefreshing) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const response = await authApi(token).get(
        endpoints["blog-service"]["get-all"]
      );
      setBlogs(response.data.data);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const onRefresh = () => {
    fadeAnim.setValue(0);
    fetchBlogs(true);
  };

  const renderBlogItem = ({ item, index }) => (
    <Animated.View
      style={[
        styles.blogItemContainer,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      ]}
    >
      <Pressable
        onPress={() => navigation.navigate("BlogDetail", { id: item.id })}
        style={({ pressed }) => [
          styles.blogItem,
          pressed && styles.blogItemPressed,
        ]}
      >
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="article" size={24} color="black" />
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
          </View>
          <Text style={styles.content} numberOfLines={3}>
            {item.content}
          </Text>
          <View style={styles.divider} />
          <View style={styles.infoContainer}>
            <View style={styles.authorContainer}>
              <MaterialIcons
                name="person"
                size={16}
                color={COLORS.personalIcon}
              />
              <Text style={styles.username}>{item.userId}</Text>
            </View>
            <View style={styles.dateContainer}>
              <MaterialIcons
                name="schedule"
                size={16}
                color={COLORS.personalIcon}
              />
              <Text style={styles.date}>
                {new Date(item.createdDate).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.subContainer}>
        <HeaderStack
          headerText={HEADER_CONFIG.blog.headerText}
          rightIcons={HEADER_CONFIG.blog.rightIcons}
          onRightIconPress={(index) =>
            HEADER_CONFIG.blog.onRightIconPress(navigation, index)
          }
          backgroundColor={COLORS.primary}
          textColor={COLORS.blackTextColor}
          iconColor={COLORS.blackTextColor}
        />
        {loading && !refreshing ? (
          <SkeletonLoading />
        ) : blogs.length <= 0 ? (
          <NoActiveView textAlert="Hiện chưa có blog nào" />
        ) : (
          <Animated.FlatList
            data={blogs}
            renderItem={renderBlogItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContainer}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={COLORS.primary}
                colors={[COLORS.primary]}
              />
            }
            showsVerticalScrollIndicator={false}
          />
        )}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate("BlogCreate")}
        >
          <MaterialIcons name="add" size={24} color={COLORS.blackTextColor} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  subContainer: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  flatListContainer: {
    padding: 16,
    paddingTop: 8,
  },
  blogItemContainer: {
    marginBottom: 16,
  },
  blogItem: {
    borderRadius: 12,
    backgroundColor: COLORS.backgroundColor,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  blogItemPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  card: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.blackTextColor,
    marginLeft: 12,
    lineHeight: 24,
  },
  content: {
    fontSize: 14,
    color: COLORS.contentColor,
    lineHeight: 20,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.line,
    marginVertical: 12,
  },
  infoContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontSize: 13,
    color: COLORS.grayColor,
    marginLeft: 4,
  },
  date: {
    fontSize: 13,
    color: COLORS.grayColor,
    marginLeft: 4,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
});

export default BlogHome;
