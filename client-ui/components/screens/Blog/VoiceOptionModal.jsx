import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { COLORS } from "../../../constants/Constant";

const VOICE_OPTIONS = [
  {
    id: "en-US-Chirp3-HD-Achernar",
    name: "Giọng của Achernar - Nữ",
    icon: "woman",
  },
  {
    id: "en-US-Chirp3-HD-Fenrir",
    name: "Giọng của Fenrir - Nam",
    icon: "man",
  },
  {
    id: "en-US-Chirp3-HD-Pulcherrima",
    name: "Giọng của Pulcherrima - Nam",
    icon: "face",
  },
];

const VoiceOptionModal = ({
  showVoiceModal,
  setShowVoiceModal,
  selectedVoice,
  setSelectedVoice,
}) => {
  const renderVoiceOption = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.voiceOption,
        selectedVoice.id === item.id && styles.selectedVoiceOption,
      ]}
      onPress={() => {
        setSelectedVoice(item);
        setShowVoiceModal(false);
      }}
    >
      <MaterialIcons
        name={item.icon}
        size={24}
        color={
          selectedVoice.id === item.id ? COLORS.primary : COLORS.blackTextColor
        }
      />
      <Text
        style={[
          styles.voiceOptionText,
          selectedVoice.id === item.id && styles.selectedVoiceOptionText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
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
              <MaterialIcons
                name="close"
                size={24}
                color={COLORS.blackTextColor}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={VOICE_OPTIONS}
            renderItem={renderVoiceOption}
            keyExtractor={(item) => item.id}
            style={styles.voiceList}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    width: "80%",
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.blackTextColor,
  },
  voiceList: {
    maxHeight: 300,
  },
  voiceOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: COLORS.lightGrayColor + "20",
    gap: 12,
  },
  selectedVoiceOption: {
    backgroundColor: COLORS.primary + "15",
    borderColor: COLORS.primary + "30",
    borderWidth: 1,
  },
  voiceOptionText: {
    fontSize: 16,
    color: COLORS.blackTextColor,
  },
  selectedVoiceOptionText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});

export default VoiceOptionModal;
