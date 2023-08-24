/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NavigationProp, RouteProp } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import type { FC } from 'react';
import { createRef, useEffect, useState } from 'react';
import type { ScrollView } from 'react-native-gesture-handler';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useRecoilState } from 'recoil';
import type StackParamList from '../../../StackParamList';
import type { FlashCardsDef, WordDef } from '../../../atom/FlashCardsDataState';
import { FlashCardsDataState } from '../../../atom/FlashCardsDataState';
import { SlidePre } from './SlidePre';

type FlashCardsViewRouteProp = RouteProp<StackParamList, 'Slide'>;
interface SlideConProps {
  navigation: NavigationProp<any, any>;
  route: FlashCardsViewRouteProp;
}

export const SlideCon: FC<SlideConProps> = ({ navigation, route }) => {

  const [cardsData, setCardsData] = useRecoilState<FlashCardsDef[]>(FlashCardsDataState);
  const [data, setData] = useState<WordDef[]>(
    cardsData.find((item) => item.id === route.params.id)?.words || [],
  );
  const [page, setPage] = useState(0);
  const [isFront, setIsFront] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const pageTotal = data.length;
  const swipePagination = createRef();
  const scrollText = createRef<ScrollView>();

  const handlePageChange = (page: number) => {
    if (page >= 0 && page <= pageTotal - 1) {
      if (isSpeaking) handleSpeechStop();
      setPage(page);
      setIsFront(true);
    }
  };

  const handleFlip = () => {
    if (isSpeaking) handleSpeechStop();
    setIsFront(!isFront);
  };

  // 暗記チェック機能
  const handlePressSadIcon = (word_list: WordDef) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === word_list.id
          ? {
            ...item,
            proficiency: item.proficiency === 'unfamiliar' ? 'learning' : 'unfamiliar',
          }
          : item,
      ),
    );
  };

  const handlePressHappyIcon = (word_list: WordDef) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === word_list.id
          ? {
            ...item,
            proficiency: item.proficiency === 'mastered' ? 'learning' : 'mastered',
          }
          : item,
      ),
    );
  };

  const openIconDescription = (desc: string) => {
    Toast.show({
      text1: desc,
      type: desc === 'おぼえた！' ? 'success' : 'error',
      visibilityTime: 1000,
    });
  };

  // 音声読み上げ機能
  const handlePressSpeaker = (text: string, langCode: string) => {
    console.log(text);
    if (isSpeaking) {
      handleSpeechStop();
    } else {
      Speech.speak(text, {
        language: langCode ? langCode : 'en',
        rate: 1.0,
        pitch: 1.0,
        onStart: () => setIsSpeaking(true),
        onDone: () => setIsSpeaking(false),
      });
    }
  };

  const handleSpeechStop = () => {
    Speech.stop();
    setIsSpeaking(false);
  };

  // 画面遷移時の処理
  useEffect(() => {
    const blurUnsubscribe = navigation.addListener('blur', handleSpeechStop);
    const beforeRemoveUnsubscribe = navigation.addListener('beforeRemove', handleSpeechStop);
    return () => {
      blurUnsubscribe();
      beforeRemoveUnsubscribe();
    };
  }, [navigation]);

  useEffect(() => {
    setCardsData((prev) =>
      prev.map((item) => (item.id === route.params.id ? { ...item, words: data } : item)),
    );
  }, [data]);

  return (
    <SlidePre
      word_list={data}
      page={page}
      isFront={isFront}
      isSpeaking={isSpeaking}
      swipePagination={swipePagination}
      scrollText={scrollText}
      handleFlip={handleFlip}
      handlePageChange={handlePageChange}
      handlePressSadIcon={handlePressSadIcon}
      handlePressHappyIcon={handlePressHappyIcon}
      openIconDescription={openIconDescription}
      handlePressSpeaker={handlePressSpeaker}
    />
  );
};
