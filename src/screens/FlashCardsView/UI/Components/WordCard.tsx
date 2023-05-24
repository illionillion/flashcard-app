import { FC, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WordDef } from "../../../../atom/FlashCardsDataState";

export const WordCard: FC<WordDef> = ({name, mean, lang, example}) => {
    const [wordName, setWordName] = useState<string>(name);
    const [wordMean, setWordMean] = useState<string>(mean);
    const [wordLang, setWordLang] = useState<string>(lang);
    const [wordExample, setWordExample] = useState<string>(example);
  return (
    <View style={styles.WordCard}>
      <View style={styles.row}>
        <TextInput style={styles.text} value={wordName} placeholder="単語名" />
        <TextInput style={styles.text} value={wordMean} placeholder="単語の意味" />
      </View>
      <View style={styles.row}>
        <TextInput style={styles.text} value={wordLang} placeholder="単語の言語" />
        <TouchableOpacity style={{ ...styles.text, ...styles.createExample }}>
          <Text style={styles.createExampleText}>例文作成</Text>
        </TouchableOpacity>
      </View>
      <TextInput style={styles.textMulti} multiline value={wordExample} placeholder="例文" />
      <TouchableOpacity style={styles.remove}>
        <Ionicons name="close" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  WordCard: {
    flex: 1,
    height: 225,
    backgroundColor: "#D9D9D9",
    marginVertical: 22,
    paddingHorizontal: 20,
    paddingTop: 11,
    paddingBottom: 16,
    position: "relative",
  },
  row: {
    paddingBottom: 12,
    gap: 8,
    flexDirection: "row",
  },
  text: {
    flex: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 20,
  },
  textMulti: {
    flex: 1,
    paddingVertical: 3,
    backgroundColor: "#fff",
    fontSize: 20,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  createExample: {
    backgroundColor: "#5C98B9",
  },
  createExampleText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
  remove: {
    width: 44,
    height: 44,
    backgroundColor: "#FF9D9D",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    top: -22,
    right: -22,
    position: "absolute",
  },
});
