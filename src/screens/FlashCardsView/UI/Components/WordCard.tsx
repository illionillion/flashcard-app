import { Ionicons } from '@expo/vector-icons';
import type { Dispatch, FC, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useRecoilValue } from 'recoil';
import { APIKeyState } from '../../../../atom/APIKeyState';
import { SentenceDiffState } from '../../../../atom/SentenceDiffState';
import type { WordDef } from '../../../../atom/FlashCardsDataState';

interface WordCardProps {
  item: WordDef;
}
export const WordCard: FC<WordCardProps> = ({
  item,
}) => {

  const { id, name, mean, lang, example, proficiency } = item;
  const [wordName, setWordName] = useState<string>(name);
  const [wordMean, setWordMean] = useState<string>(mean);
  const [wordLang, setWordLang] = useState<string>(lang);
  const [wordExample, setWordExample] = useState<string>(example);
  const [wordExamplePreview, setWordExamplePreview] = useState<string>(example);
  const [loading, setLoading] = useState<boolean>(false);
  const apiKey = useRecoilValue(APIKeyState);
  const sentenceDiff = useRecoilValue(SentenceDiffState);
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
            proficiency: proficiency,
          }
          : item,
      ),
    );
  };

  const handleRemove = () => {
    setWordsData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCreateExample = async () => {
    if ([wordName, wordMean, wordLang].includes('')) {
      const errorMessage =
        wordName === ''
          ? '単語名を入力してください'
          : wordMean === ''
            ? '単語の意味を入力してください'
            : '単語の言語を入力してください';
      Toast.show({
        text1: errorMessage,
        type: 'error',
        visibilityTime: 2000,
      });
      return;
    }

    setLoading(true);

    // ここでChatGPTに送信したい
    const result = await generateExample({
      apiKey: apiKey,
      wordLang: wordLang,
      wordName: wordName,
      wordMean: wordMean,
      sentenceDiff: sentenceDiff,
    });

    const updateChar = async (i: number) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          const char = result.content[i];
          if (i === 0) {
            setWordExamplePreview(() => char);
          } else {
            setWordExamplePreview((prev) => prev + char);
          }
          resolve();
        }, 100);
      });
    };

    if (result.success) {
      setWordExample(() => result.content);
      for (let i = 0; i < result.content.length; i++) {
        await updateChar(i);
      }
    } else {
      OpenCreateExampleErrorMessage(result);
    }

    setLoading(false);
  };

  useEffect(() => {
    upDateWord();
  }, [wordName, wordMean, wordLang, wordExample]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.WordCard}>
          <View style={styles.row}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.mean}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  WordCard: {
    flex: 1,
    width: '80%',
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
    marginVertical: 5,
    marginHorizontal: '10%',
    paddingHorizontal: 20,
    paddingTop: 11,
    position: 'relative',
  },
  row: {
    paddingBottom: 12,
    gap: 8,
  },
  text: {
    flex: 0.5,
    paddingHorizontal: 8,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 15,
  }
});
