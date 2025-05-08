import HeaderScreen from "../../../components/Header/HeaderScreen";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Input from "../../../components/Input/Input";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../constants/Constant";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateCollection = () => {
  const [info, setInfo] = useState({
    name: "",
    description: "",
    file: null,
  });
  const [error, setError] = useState({});
  const navigation = useNavigation();

  const change = (field, value) => {
    setInfo((current) => {
      return { ...current, [field]: value };
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      change("file", result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <HeaderScreen
        label="Thêm bộ sưu tập"
        callback={() => navigation.goBack()}
      />
      <View style={styles.subContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>Tạo Bộ Sưu Tập Từ Vựng</Text>

          <Input
            label="Tên bộ sưu tập"
            value={info.name}
            onChangeHandle={(t) => {
              change("name", t);
            }}
            error={error.name}
            holderText="Nhập tên bộ sưu tập"
          />

          <Input
            label="Mô tả"
            value={info.description}
            onChangeHandle={(t) => {
              change("description", t);
            }}
            error={error.description}
            custom={{ height: 100, textAlignVertical: "top", textAlign: "top" }}
            holderText="Nhập mô tả..."
            multipleLine={true}
          />

          <TouchableOpacity
            style={styles.imagePickerButton}
            onPress={pickImage}
          >
            <Text style={styles.imagePickerButtonText}>Chọn ảnh</Text>
          </TouchableOpacity>

          {info.file && (
            <Image source={{ uri: info.file }} style={styles.imagePreview} />
          )}

          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Lưu Bộ Sưu Tập</Text>
          </TouchableOpacity>
        </View>
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
    padding: 20
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: COLORS.blackTextColor,
  },
  input: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  imagePickerButton: {
    backgroundColor: COLORS.btnColor,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  imagePickerButtonText: {
    color: COLORS.whiteTextColor,
    fontSize: 16,
    fontWeight: "bold",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: "cover",
  },
  saveButton: {
    backgroundColor: COLORS.btnColor,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: COLORS.whiteTextColor,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CreateCollection;
