import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";

const LearnNewWordProcess = ({ route }) => {
  const { listWord } = route.params;
  const [word, setWord] = useState(null);
  const [clone, setClone] = useState([...listWord]);

  useEffect(() => {
    console.log(clone)
  }, [])
  const learnProcess = () => {
    const ran = Math.floor(Math.random() * clone.length);
    const element = clone[ran];

    if (element.enToVi == 0) {
      setWord(element);
      element.enToVi = 1;
      clone[ran] = element;
      setClone(clone);
    } else if (element.viToEn == 0) {
      setWord(element);
      element.viToEn = 1;
      clone[ran] = element;
      setClone(clone);
    } else if (element.matchEng == 0) {
      setWord(element);
      element.matchEng = 1;
      clone[ran] = element;
      setClone(clone);
      const index = clone.indexOf(element);
      clone.splice(index, 1);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={{ height: 50, width: 80, backgroundColor: "red" }}
        onPress={() => learnProcess()}
      >
        <Text>try touch</Text>
      </TouchableOpacity>

      <View style={{ flex: 1, width: "100%", backgroundColor: "pink" }}>
        <Text>
          {word
            ? `${word.id} ${word.enToVi} ${word.viToEn} ${word.matchEng}`
            : `None`}
        </Text>
      </View>
    </>
  );
};

export default LearnNewWordProcess;
