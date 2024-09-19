import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import HeaderElement from "../../Header/HeaderElement";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    id: "66eabb173fbd6b138f80d806",
    word: "resolve",
    pofSpeech: {
      key: "V",
      engName: "Verb",
      viName: "Động từ",
    },
    pronunciation: "/prəˈvɪʒ.ən/",
    definition: "giải quyết, quyết định",
    example: "The dispute over the song rights proved impossible to resolve.",
    createdDate: "2024-09-18T11:35:51.273Z",
    updatedDate: "2024-09-18T11:35:51.273Z",
    wordLevel: {
      level: "C1",
      description: "Advanced",
    },
    createdBy: "133a645e-23f4-4201-b791-eec97ebc9653",
    collectionId: "66eab68a588d1c6c4596c787",
  },
  {
    id: "66eabace3fbd6b138f80d805",
    word: "provision",
    pofSpeech: {
      key: "N",
      engName: "Noun",
      viName: "Danh từ",
    },
    pronunciation: "/prəˈvɪʒ.ən/",
    definition: "sự cung cấp, chu cấp",
    example:
      "The provision of good public transport will be essential for developing the area.",
    createdDate: "2024-09-18T11:34:38.719Z",
    updatedDate: "2024-09-18T11:34:38.719Z",
    wordLevel: {
      level: "C1",
      description: "Advanced",
    },
    createdBy: "133a645e-23f4-4201-b791-eec97ebc9653",
    collectionId: "66eab68a588d1c6c4596c787",
  },
  {
    id: "66eaba843fbd6b138f80d804",
    word: "obligate",
    pofSpeech: {
      key: "V",
      engName: "Verb",
      viName: "Động từ",
    },
    pronunciation: "/ˈɑːblɪɡeɪt/",
    definition: "bắt buộc",
    example:
      "There are probably state laws that would obligate you to have a licence.",
    createdDate: "2024-09-18T11:33:24.837Z",
    updatedDate: "2024-09-18T11:33:24.837Z",
    wordLevel: {
      level: "A2",
      description: "Pre-intermediate",
    },
    createdBy: "133a645e-23f4-4201-b791-eec97ebc9653",
    collectionId: "66eab68a588d1c6c4596c787",
  },
  {
    id: "66eaba4d3fbd6b138f80d803",
    word: "establish",
    pofSpeech: {
      key: "V",
      engName: "Verb",
      viName: "Động từ",
    },
    pronunciation: "/ɪˈstæblɪʃ/",
    definition: "thành lập, thiết lập",
    example: "How long has the firm been established?",
    createdDate: "2024-09-18T11:32:29.562Z",
    updatedDate: "2024-09-18T11:32:29.562Z",
    wordLevel: {
      level: "B2",
      description: "Upper-intermediate",
    },
    createdBy: "133a645e-23f4-4201-b791-eec97ebc9653",
    collectionId: "66eab68a588d1c6c4596c787",
  },
  {
    id: "66eaba273fbd6b138f80d802",
    word: "engage",
    pofSpeech: {
      key: "V",
      engName: "Verb",
      viName: "Động từ",
    },
    pronunciation: "/ɪnˈɡeɪdʒ/",
    definition: "tham dự",
    example: "He has engaged the children’s party.",
    createdDate: "2024-09-18T11:31:51.236Z",
    updatedDate: "2024-09-18T11:31:51.236Z",
    wordLevel: {
      level: "B1",
      description: "Intermediate",
    },
    createdBy: "133a645e-23f4-4201-b791-eec97ebc9653",
    collectionId: "66eab68a588d1c6c4596c787",
  },
  {
    id: "66eab9ca3fbd6b138f80d801",
    word: "determine",
    pofSpeech: {
      key: "V",
      engName: "Verb",
      viName: "Động từ",
    },
    pronunciation: "/dɪˈtɜːrmɪn/",
    definition: "xác định",
    example: "He tried to determine what had gone wrong.",
    createdDate: "2024-09-18T11:30:18.364Z",
    updatedDate: "2024-09-18T11:30:18.364Z",
    wordLevel: {
      level: "B1",
      description: "Intermediate",
    },
    createdBy: "133a645e-23f4-4201-b791-eec97ebc9653",
    collectionId: "66eab68a588d1c6c4596c787",
  },
  {
    id: "66eab9a13fbd6b138f80d800",
    word: "cancellation",
    pofSpeech: {
      key: "N",
      engName: "Noun",
      viName: "Danh từ",
    },
    pronunciation: "/ˌkæn.səlˈeɪ.ʃən/",
    definition: "sự hủy bỏ, chấm dứt (n)",
    example: "A last-minute cancellation meant that the hotel had a room free.",
    createdDate: "2024-09-18T11:29:37.039Z",
    updatedDate: "2024-09-18T11:29:37.039Z",
    wordLevel: {
      level: "B2",
      description: "Upper-intermediate",
    },
    createdBy: "133a645e-23f4-4201-b791-eec97ebc9653",
    collectionId: "66eab68a588d1c6c4596c787",
  },
  {
    id: "66eab9673fbd6b138f80d7ff",
    word: "assurance",
    pofSpeech: {
      key: "N",
      engName: "Noun",
      viName: "Danh từ",
    },
    pronunciation: "/əˈʃʊr.əns/",
    definition: "sự đảm bảo (n) ",
    example: "He gave me his assurance that he would help.",
    createdDate: "2024-09-18T11:28:39.488Z",
    updatedDate: "2024-09-18T11:28:39.488Z",
    wordLevel: {
      level: "B2",
      description: "Upper-intermediate",
    },
    createdBy: "133a645e-23f4-4201-b791-eec97ebc9653",
    collectionId: "66eab68a588d1c6c4596c787",
  },
  {
    id: "66eab91e3fbd6b138f80d7fe",
    word: "agreement",
    pofSpeech: {
      key: "N",
      engName: "Noun",
      viName: "Danh từ",
    },
    pronunciation: "/əˈɡriː.mənt/",
    definition: "sự thỏa thuận hợp đồng (= contract)",
    example: "You have broken our agreement",
    createdDate: "2024-09-18T11:27:26.035Z",
    updatedDate: "2024-09-18T11:27:26.035Z",
    wordLevel: {
      level: "B2",
      description: "Upper-intermediate",
    },
    createdBy: "133a645e-23f4-4201-b791-eec97ebc9653",
    collectionId: "66eab68a588d1c6c4596c787",
  },
  {
    id: "66eab8bd3fbd6b138f80d7fd",
    word: "abide by",
    pofSpeech: {
      key: "Phrasal Verb",
      engName: "Phrasal verb",
      viName: "Cụm động từ",
    },
    pronunciation: "/əˈbaɪd baɪ/",
    definition: "tuân thủ, tuân theo",
    example: "The players must abide by the rules of the game",
    createdDate: "2024-09-18T11:25:49.656Z",
    updatedDate: "2024-09-18T11:25:49.656Z",
    wordLevel: {
      level: "B2",
      description: "Upper-intermediate",
    },
    createdBy: "133a645e-23f4-4201-b791-eec97ebc9653",
    collectionId: "66eab68a588d1c6c4596c787",
  },
];
const ChooseListNew = () => {
  const [index, setIndex] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [listNew, setListNew] = useState([])

  const navigation = useNavigation()

  const generateNumber = () => {
    const min = 1;
    const max = data.length;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setIndex(randomNumber)
  };

  const handleChoice = (choice) => {
    if(choice){
        listNew.push(data[index])
    }
    generateNumber()
  }

  useEffect(() => {
    if(index >= 5){
        navigation.navigate("LearnNewWordProcess")
    }
  }, [index])

  return (
    <>
      <HeaderElement textHeader={`Chọn từ để học ${wordCount}/5`} />
      <View style={styles.container}>
        <View style={styles.card}>
          <View>
            <Text style={styles.word}>Meteorologist</Text>
            <Text style={styles.pronunciation}>/ˌmiː.ti.əˈrɒl.ə.dʒɪst/</Text>
            <View style={styles.bottomText}>
              <View style={styles.wordLevelView}>
                <Text style={styles.wordLevel}>C1</Text>
              </View>
              <Text style={styles.typeWord}>Noun</Text>
            </View>
          </View>
          <View style={styles.contentView}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
              Nghĩa:
            </Text>
            <Text style={styles.definition}>
              A scientist
            </Text>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
              Ví dụ:
            </Text>
            <Text style={styles.definition}>
              A scientist who studies the earth's atmosphere and its changes
            </Text>
          </View>
          <View>
            <TouchableOpacity style={styles.skipButton}>
              <Text style={styles.buttonText}>Bỏ qua</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.learnButton}>
              <Text style={styles.buttonText}>Học từ này</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  card: {
    backgroundColor: "#1e1e1e",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    height: 500,
    justifyContent: "space-between",
  },
  word: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },
  pronunciation: {
    fontSize: 16,
    color: "#BBBBBB",
    textAlign: "center",
    marginBottom: 20,
  },
  definition: {
    fontSize: 18,
    color: "#DDDDDD",
    textAlign: "justify",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  learnButton: {
    backgroundColor: "#308AFF",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  skipButton: {
    backgroundColor: "gray",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  bottomText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  wordLevelView: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  wordLevel: {
    fontSize: 14,
    fontWeight: "500",
  },
  typeWord: {
    color: "gray",
    fontSize: 15,
    fontWeight: "500",
  },
  contentView: {
    justifyContent: "flex-start",
  },
});

export default ChooseListNew;
