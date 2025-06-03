import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import HeaderScreen from "../../../components/Header/HeaderScreen";
import { authApi, endpoints } from "../../../apis/APIs";
import { useAuth } from "../../../context/AuthContext";
import { COLORS } from "../../../constants/Constant";
import { SafeAreaView } from "react-native-safe-area-context";

const BlogCreate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const navigation = useNavigation();

  const handleCreateBlog = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ các trường.");
      return;
    }

    setLoading(true);
    try {
      await authApi(token).post(endpoints["blog-service"]["create-blog"], {
        title: title.trim(),
        content: content.trim(),
      });
      
      Alert.alert(
        "Thành công",
        "Bài viết đã được tạo thành công",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Không thể tạo bài viết. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.subContainer}>
        <HeaderScreen
          label="Tạo bài viết"
          callback={() => navigation.goBack()}
        />
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            <View style={styles.headerContainer}>
              <MaterialIcons name="edit-note" size={32} color={COLORS.primary} />
              <Text style={styles.headerTitle}>Tạo bài viết mới</Text>
              <Text style={styles.headerSubtitle}>
                Chia sẻ suy nghĩ, kinh nghiệm và kiến thức với cộng đồng
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <MaterialIcons name="title" size={20} color={COLORS.primary} />
                <Text style={styles.label}>Title</Text>
              </View>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Title của bài viết..."
                placeholderTextColor={COLORS.grayColor}
                maxLength={100}
              />
              <Text style={styles.characterCount}>{title.length}/100</Text>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.labelContainer}>
                <MaterialIcons name="article" size={20} color={COLORS.primary} />
                <Text style={styles.label}>Content</Text>
              </View>
              <TextInput
                style={[styles.input, styles.contentInput]}
                value={content}
                onChangeText={setContent}
                placeholder="Viết nội dung của bạn..."
                placeholderTextColor={COLORS.grayColor}
                multiline
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity
              style={[styles.submitButton, loading && styles.submitButtonDisabled]}
              onPress={handleCreateBlog}
              disabled={loading}
            >
              <MaterialIcons
                name="add-circle"
                size={24}
                color={COLORS.blackTextColor}
              />
              <Text style={styles.submitButtonText}>
                {loading ? "Đang tạo..." : "Đăng bài viết"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  scrollContainer: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 24,
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.blackTextColor,
    marginTop: 12,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.grayColor,
    textAlign: "center",
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.blackTextColor,
  },
  input: {
    backgroundColor: COLORS.sectionBackground,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.blackTextColor,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  contentInput: {
    height: 200,
    textAlignVertical: "top",
  },
  characterCount: {
    fontSize: 12,
    color: COLORS.grayColor,
    textAlign: "right",
    marginTop: 4,
  },
  tipsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary + "15",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    gap: 8,
  },
  tipsText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.primary,
    lineHeight: 20,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: COLORS.blackTextColor,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default BlogCreate; 