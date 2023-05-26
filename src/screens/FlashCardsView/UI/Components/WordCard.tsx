import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WordDef } from "../../../../atom/FlashCardsDataState";
import { useRecoilValue } from "recoil";
import { APIKeyState } from "../../../../atom/APIKeyState";

interface WordCardProps {
  item: WordDef;
  setWordsData: Dispatch<SetStateAction<WordDef[]>>;
}
export const WordCard: FC<WordCardProps> = ({ item, setWordsData }) => {
  const { id, name, mean, lang, example } = item;
  const [wordName, setWordName] = useState<string>(name);
  const [wordMean, setWordMean] = useState<string>(mean);
  const [wordLang, setWordLang] = useState<string>(lang);
  const [wordExample, setWordExample] = useState<string>(example);
  const apiKey = useRecoilValue(APIKeyState);
  const handleNameChanged = (text: string) => {
    setWordName(text);
  };
  const handleMeanChanged = (text: string) => {
    setWordMean(text);
  };
  const handleLangChanged = (text: string) => {
    setWordLang(text);
  };
  const handleExampleChanged = (text: string) => {
    setWordExample(text);
  };

  const upDateWord = () => {
    setWordsData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              id: id,
              name: wordName,
              mean: wordMean,
              lang: wordLang,
              example: wordExample,
            }
          : item
      )
    );
  };

  const handleRemove = () => {
    setWordsData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCreateExample = async () => {
    // ここでChatGPTに送信したい
    try {
      // ChatGPTをラップしたサーバーが必要
      // const configuration = new Configuration({
      //   apiKey: apiKey,
      // });
      // const openai = new OpenAIApi(configuration);
      // console.log("作成中");
      // const generatedExample = await generateExample(
      //   `${wordLang}言語の${wordName}という${wordMean}という意味の単語を用いて簡単な例文を作成して`,
      //   "gpt-3.5-turbo",
      //   "user",
      //   openai
      // ); // ChatGPTから例文を生成
      // if (generatedExample.success) {
      //   handleExampleChanged(generatedExample.content ?? "");
      //   console.log("作成完了");
      // } else {
      //   console.log(generatedExample.content);
      // }
    } catch (error) {
      console.error("Failed to generate example:", error);
    }
  };

  useEffect(() => {
    upDateWord();
  }, [wordName, wordMean, wordLang, wordExample]);

  return (
    <View style={styles.WordCard}>
      <View style={styles.row}>
        <TextInput
          style={styles.text}
          value={wordName}
          placeholder="単語名"
          onChangeText={handleNameChanged}
        />
        <TextInput
          style={styles.text}
          value={wordMean}
          placeholder="単語の意味"
          onChangeText={handleMeanChanged}
        />
      </View>
      <View style={styles.row}>
        <TextInput
          style={styles.text}
          value={wordLang}
          placeholder="単語の言語"
          onChangeText={handleLangChanged}
        />
        <TouchableOpacity
          style={{ ...styles.text, ...styles.createExample }}
          onPress={handleCreateExample}
        >
          <Text style={styles.createExampleText}>例文作成</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.textMulti}
        multiline
        value={wordExample} // ここの値をChatGPTでリアルタイムに更新
        placeholder="例文"
        onChangeText={handleExampleChanged}
      />
      <TouchableOpacity style={styles.remove} onPress={handleRemove}>
        <Ionicons name="close" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  WordCard: {
    flex: 1,
    width: "80%",
    height: 225,
    backgroundColor: "#D9D9D9",
    marginVertical: 22,
    marginHorizontal: "10%",
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
