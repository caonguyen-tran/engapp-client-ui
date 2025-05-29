import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert, Modal, View, FlatList } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants/Constant";
import { endpoints, authApi } from "../../apis/APIs";
import { useAuth } from "../../context/AuthContext";
import { Audio } from 'expo-av';

const VOICE_OPTIONS = [
  { id: 'en-US-Chirp3-HD-Achernar', name: 'Giọng của Achernar - Nữ', icon: 'woman' },
  { id: 'en-US-Chirp3-HD-Fenrir', name: 'Giọng của Fenrir - Nam', icon: 'man' },
  { id: 'en-US-Chirp3-HD-Pulcherrima', name: 'Giọng của Pulcherrima - Nam', icon: 'face' },
];

const PronunciationButton = ({ text, style, label = "Nghe phát âm" }) => {
  const { token } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(VOICE_OPTIONS[0]);

  const handlePronunciation = async (voiceId = selectedVoice.id) => {
    try {
      setLoading(true);
      const response = await authApi(token).post(
        endpoints["blog-analyze-service"]["text-to-speech"],
        { 
          text: text,
          name: voiceId
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
      setShowVoiceModal(false);
    }
  };

  const renderVoiceOption = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.voiceOption,
        selectedVoice.id === item.id && styles.selectedVoiceOption
      ]}
      onPress={() => {
        setSelectedVoice(item);
        handlePronunciation(item.id);
      }}
    >
      <MaterialIcons 
        name={item.icon}
        size={24} 
        color={selectedVoice.id === item.id ? COLORS.primary : COLORS.blackTextColor} 
      />
      <Text style={[
        styles.voiceOptionText,
        selectedVoice.id === item.id && styles.selectedVoiceOptionText
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity
        style={[
          styles.button,
          isPlaying && styles.buttonActive,
          loading && styles.buttonLoading,
          style
        ]}
        onPress={() => {
          if (!isPlaying) {
            setShowVoiceModal(true);
          } else {
            handlePronunciation();
          }
        }}
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

      <Modal
        visible={showVoiceModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowVoiceModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chọn giọng đọc</Text>
              <TouchableOpacity onPress={() => setShowVoiceModal(false)}>
                <MaterialIcons name="close" size={24} color={COLORS.blackTextColor} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={VOICE_OPTIONS}
              renderItem={renderVoiceOption}
              keyExtractor={item => item.id}
              style={styles.voiceList}
            />
          </View>
        </View>
      </Modal>
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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.blackTextColor,
  },
  voiceList: {
    maxHeight: 300,
  },
  voiceOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: COLORS.lightGrayColor + '20',
    gap: 12,
  },
  selectedVoiceOption: {
    backgroundColor: COLORS.primary + '15',
    borderColor: COLORS.primary + '30',
    borderWidth: 1,
  },
  voiceOptionText: {
    fontSize: 16,
    color: COLORS.blackTextColor,
  },
  selectedVoiceOptionText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default PronunciationButton; 