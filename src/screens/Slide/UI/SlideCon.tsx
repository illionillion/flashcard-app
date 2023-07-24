/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigationProp, RouteProp } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import { FC, useEffect, useState } from 'react';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useSetRecoilState } from 'recoil';
import StackParamList from '../../../StackParamList';
import { FlashCardsDataState, FlashCardsDef, WordDef } from '../../../atom/FlashCardsDataState';
import { SlidePre } from './SlidePre';

type FlashCardsViewRouteProp = RouteProp<StackParamList, 'Slide'>;
interface SlideConProps {
  navigation: NavigationProp<any, any>;
  route: FlashCardsViewRouteProp;
}

export const SlideCon: FC<SlideConProps> = ({ navigation, route }) => {
  const setCardsData = useSetRecoilState<FlashCardsDef[]>(FlashCardsDataState);
  const [data, setData] = useState(route.params.data);
  const [page, setPage] = useState(0);
  const [isFront, setIsFront] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const pageTotal = data.length;

  const handleGoBack = () => {
    navigation.goBack();
  };

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
          ? { ...item, proficiency: item.proficiency === 'unfamiliar' ? 'learning' : 'unfamiliar' }
          : item,
      ),
    );
  };

  const handlePressHappyIcon = (word_list: WordDef) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === word_list.id
          ? { ...item, proficiency: item.proficiency === 'mastered' ? 'learning' : 'mastered' }
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
  const handlePressSpeaker = (text: string) => {
    if (isSpeaking) {
      handleSpeechStop();
    } else {
      Speech.speak(text, {
        // language: 'en',
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
  const handleUnsubscribe = () => {
    handleSpeechStop();
    setCardsData((prev) =>
      // 変更が上手く保存されない
      prev.map((item) => (item.id === route.params.id ? { ...item, words: data } : item)),
    );
  };

  useEffect(() => {
    const blurUnsubscribe = navigation.addListener('blur', handleUnsubscribe);
    const beforeRemoveUnsubscribe = navigation.addListener('beforeRemove', handleUnsubscribe);
    return () => {
      blurUnsubscribe();
      beforeRemoveUnsubscribe();
    };
  }, [navigation]);

  return (
    <SlidePre
      word_list={data}
      page={page}
      isFront={isFront}
      isSpeaking={isSpeaking}
      handleGoBack={handleGoBack}
      handleFlip={handleFlip}
      handlePageChange={handlePageChange}
      handlePressSadIcon={handlePressSadIcon}
      handlePressHappyIcon={handlePressHappyIcon}
      openIconDescription={openIconDescription}
      handlePressSpeaker={handlePressSpeaker}
    />
  );
};
