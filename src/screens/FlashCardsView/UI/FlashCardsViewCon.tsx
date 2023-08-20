import type { FC } from 'react';
import type { WordDef } from '../../../atom/FlashCardsDataState';
import type StackParamList from '../../../StackParamList';
import type { NavigationProp, RouteProp } from '@react-navigation/native';
import type { generateExampleReturn } from '../../../lib/createExample';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { useRecoilState } from 'recoil';
import { FlashCardsDataState } from '../../../atom/FlashCardsDataState';
import { generateExample} from '../../../lib/createExample';

import { FlashCardsViewPre } from './FlashCardsViewPre';

type FlashCardsViewRouteProp = RouteProp<StackParamList, 'FlashCardsView'>;
export interface FlashCardsListConProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: NavigationProp<any, any>;
  route: FlashCardsViewRouteProp;
}

export const FlashCardsViewCon: FC<FlashCardsListConProps> = (props) => {
  const { route, navigation } = props;
  const { id, name, words } = route.params.data;
  const [flashcardName, setFlashcardName] = useState<string>(name);
  const [buttonDisable, setButtonDisable] = useState<boolean>(false);
  const [wordsData, setWordsData] = useState<WordDef[]>(words);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [wordExamplePreview, setWordExamplePreview] = useState<string>('');
  const [newExample, setNewExample] = useState<string>('');
  const [data, setData] = useRecoilState(FlashCardsDataState);

  const handleNameChanged = (text: string) => {
    setFlashcardName(text);
    setButtonDisable(text.trim() === '');
  };
  const handleOpen = () => {
    setIsAddOpen(true);
  };

  const handleClose = () => {
    setIsAddOpen(false);
  };

  const handleEditOpen = () => {
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };
  const handleSave = () => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            id: id,
            name: flashcardName,
            words: wordsData,
          }
          : item,
      ),
    );
    Toast.show({
      text1: '変更を保存しました',
      type: 'success',
      visibilityTime: 2000,
    });
  };
  const onPressToSlide = () => {
    navigation.navigate('Slide', {
      id: id,
      title: flashcardName,
      data: wordsData,
    });
  };
  const OpenCreateExampleErrorMessage = (result: generateExampleReturn) => {
    const message =
      result.status === 503 ? '時間をおいてもう一度試してください。' : result.errorMessage;
    Alert.alert('例文作成に失敗しました。', message, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => navigation.navigate('Setting'),
      },
    ]);
  };
  const handleAddNewWord = (newWord: WordDef) => {
    setWordsData((prev) => [...prev, newWord]);
  };
  const handleCreateExample = async (
    newWord: string,
    newMean: string,
    newLang: string,
    apiKey: string
  ) => {
    if ([newWord, newMean, newLang].includes('')) {
      const errorMessage =
        newWord === ''
          ? '単語名を入力してください'
          : newMean === ''
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
      wordLang: newLang,
      wordName: newWord,
      wordMean: newMean,
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
      setNewExample(() => result.content);
      for (let i = 0; i < result.content.length; i++) {
        await updateChar(i);
      }
    } else {
      OpenCreateExampleErrorMessage(result);
    }

    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      if (navigation.getState().routes[navigation.getState().index].name !== 'Slide') {
        navigation.goBack();
      }
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(()=>{
    setWordsData(() => data.find(item => item.id === id)?.words || []);
  },[data]);

  return (
    <FlashCardsViewPre
      flashcardName={flashcardName}
      buttonDisable={buttonDisable}
      wordsData={wordsData}
      isAddOpen={isAddOpen}
      isEditOpen={isEditOpen}
      activeId={activeId}
      loading={loading}
      wordExamplePreview={wordExamplePreview}
      newExample={newExample}
      handleNameChanged={handleNameChanged}
      handleSave={handleSave}
      setWordsData={setWordsData}
      handleOpen={handleOpen}
      handleClose={handleClose}
      handleEditOpen={handleEditOpen}
      handleEditClose={handleEditClose}
      handleAddNewWord={handleAddNewWord}
      setActiveId={setActiveId}
      handleCreateExample={handleCreateExample}
      setNewExample={setNewExample}
      setLoading={setLoading}
      onPressToSlide={onPressToSlide}
    />
  );
};
