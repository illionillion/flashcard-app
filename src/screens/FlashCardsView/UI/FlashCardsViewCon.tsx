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
  const [data, setData] = useRecoilState(FlashCardsDataState);
  const handleNameChanged = (text: string) => {
    setFlashcardName(text);
    setButtonDisable(text.trim() === '');
  };
  const handleAdd = () => {
    setWordsData((prev) => [
      ...prev,
      {
        id: (() => {
          if (prev.length === 0) {
            return 0;
          }

          const maxId = prev.reduce((max, card) => {
            return Math.max(max, card.id);
          }, -1);

          return maxId + 1;
        })(),
        name: '',
        mean: '',
        lang: '',
        langCode: '',
        example: '',
        exTrans: '',
        proficiency: 'learning',
      },
    ]);
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
      },
    ]);
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
      handleNameChanged={handleNameChanged}
      handleAdd={handleAdd}
      handleSave={handleSave}
      setWordsData={setWordsData}
      OpenCreateExampleErrorMessage={OpenCreateExampleErrorMessage}
      onPressToSlide={onPressToSlide}
    />
  );
};
