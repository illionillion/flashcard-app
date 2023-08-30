import type { NavigationProp, RouteProp } from '@react-navigation/native';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useSetRecoilState } from 'recoil';
import type StackParamList from '../../../StackParamList';
import { FlashCardsDataState, type WordDef } from '../../../atom/FlashCardsDataState';
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
  const [wordsData, setWordsData] = useState<WordDef[]>(words);
  const setData = useSetRecoilState(FlashCardsDataState);

  const handleNameChanged = (text: string) => {
    setFlashcardName(text);
  };

  const onPressToSlide = () => {
    navigation.navigate('Slide', {
      id: id,
      title: flashcardName,
    });
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      if (navigation.getState().routes[navigation.getState().index].name !== 'Slide') {
        navigation.goBack();
      }
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <FlashCardsViewPre
      {...{
        flashcardName,
        wordsData,
        handleNameChanged,
        setWordsData,
        onPressToSlide,
        handleSave,
      }}
    />
  );
};
