import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert, Modal, View, FlatList } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants/Constant";
import { endpoints, authApi } from "../../apis/APIs";
import { useAuth } from "../../context/AuthContext";
import { Audio } from 'expo-av';

const PronunciationButton = ({ text, voice, style, label = "Nghe phát âm" }) => {
  const { token } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [loading, setLoading] = useState(false);

  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  const handlePronunciation = async () => {
    // If audio is playing, stop it
    if (isPlaying) {
      await stopAudio();
      return;
    }

    try {
      setLoading(true);
      const response = await authApi(token).post(
        endpoints["blog-analyze-service"]["text-to-speech"],
        { 
          text: text,
          name: voice.id
        },
        { responseType: 'arraybuffer' }
      );

      // Convert array buffer to base64 using btoa
      const uint8Array = new Uint8Array(response.data);
      const binaryString = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '');
      const base64Audio = btoa(binaryString);
      const audioUri = `data:audio/mpeg;base64,${base64Audio}`;

      // Load and play the audio
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true }
      );

      // Clean up previous sound if it exists
      if (sound) {
        await sound.unloadAsync();
      }

      setSound(newSound);
      setIsPlaying(true);

      // Set up playback status listener
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });

    } catch (error) {
      console.error("Pronunciation error:", error);
      Alert.alert("Lỗi", "Không thể phát âm từ này");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.button,
          isPlaying && styles.buttonActive,
          loading && styles.buttonLoading,
          style
        ]}
        onPress={() => handlePronunciation()}
        disabled={loading}
        activeOpacity={0.8}
      >
        <MaterialIcons 
          name={loading ? "hourglass-empty" : isPlaying ? "pause-circle-filled" : "play-circle-filled"} 
          size={32} 
          color={loading ? COLORS.grayColor : isPlaying ? COLORS.primary : COLORS.active} 
        />
        <Text style={[styles.text, loading && styles.textLoading]}>
          {loading ? "Đang tải..." : isPlaying ? "Tạm dừng" : label}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.lightGrayColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonActive: {
    backgroundColor: COLORS.primary + '15',
    borderColor: COLORS.primary + '30',
  },
  buttonLoading: {
    opacity: 0.7,
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.blackTextColor,
    letterSpacing: 0.3,
  },
  textLoading: {
    color: COLORS.grayColor,
  }
});

export default PronunciationButton; 