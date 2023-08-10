import { Ionicons } from '@expo/vector-icons';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useRecoilValue } from 'recoil';
import { APIKeyState } from '../../../../atom/APIKeyState';
import { WordDef } from '../../../../atom/FlashCardsDataState';
import { generateExample, generateExampleReturn } from '../../../../lib/createExample';
import { EditWordModal } from './EditWordModal';

interface WordCardProps {
  item: WordDef;
  setWordsData: Dispatch<SetStateAction<WordDef[]>>;
  OpenCreateExampleErrorMessage: (result: generateExampleReturn) => void;
}
export const WordCard: FC<WordCardProps> = ({
  item,
  setWordsData,
  OpenCreateExampleErrorMessage,
}) => {
  const { id, name, mean, lang, example, proficiency } = item;
  const [wordName, setWordName] = useState<string>(name);
  const [wordMean, setWordMean] = useState<string>(mean);
  const [wordLang, setWordLang] = useState<string>(lang);
  const [wordExample, setWordExample] = useState<string>(example);
  const [wordExamplePreview, setWordExamplePreview] = useState<string>(example);
  const [loading, setLoading] = useState<boolean>(false);
  const apiKey = useRecoilValue(APIKeyState);

  useEffect(() => {
    setWordName(item.name);
    setWordMean(item.mean);
    setWordLang(item.lang);
    setWordExample(item.example);
}, [item]);

  return (
    <>
      <View style={styles.container}>
          <View style={styles.WordCard}>
            <View style={styles.row}>
              <Text style={styles.text}>{wordName}</Text>
              <Text style={styles.text}>{wordMean}</Text>
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
