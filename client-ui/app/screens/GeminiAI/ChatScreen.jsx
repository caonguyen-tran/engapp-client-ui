import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import HeaderStack from "../../../components/Header/HeaderStack";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  const sendMessage = async () => {
    if (inputText.trim().length === 0) return;

    const userMessage = { role: "user", text: inputText };
    setMessages([...messages, userMessage]);
    setInputText("");
    setShowBanner(false);
    setLoading(true);

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCkp-OVOfQkkdMSVMLgki1-uMCVbcg_-Dk",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: inputText,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;

      const botMessage = { role: "model", text: aiResponse };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.role === "user" ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <>
      <HeaderStack />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={60}
      >
        {showBanner && (
          <View style={styles.bannerContainer}>
            <Text style={styles.bannerText}>
              Welcome to Gemini AI chat! Ask me anything.
            </Text>
          </View>
        )}

        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.chatList}
          showsVerticalScrollIndicator={false}
        />

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#007AFF" />
            <Text style={styles.loadingText}>Gemini AI is typing...</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  chatList: {
    flex: 1,
    marginBottom: 10,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    paddingVertical: 10
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E2E2E2",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginLeft: 10,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#007AFF",
  },
  bannerContainer: {
    padding: 15,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  bannerText: {
    fontSize: 16,
    color: "#555",
  },
});

export default ChatScreen;
