/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigationProp, RouteProp } from '@react-navigation/native';
import * as Speech from 'expo-speech';
import { FC, useState } from 'react';
import StackParamList from '../../../StackParamList';
import { SlidePre } from './SlidePre';

type FlashCardsViewRouteProp = RouteProp<StackParamList, 'Slide'>;
interface SlideConProps {
  navigation: NavigationProp<any, any>;
  route: FlashCardsViewRouteProp;
}

export const SlideCon: FC<SlideConProps> = ({ navigation, route }) => {
  const { data } = route.params;
  const [page, setPage] = useState(0);
  const [isFront, setIsFront] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const pageTotal = data.length;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePageChange = (page: number) => {
    if (page >= 0 && page <= pageTotal - 1) {
      setPage(page);
    }
  };

  const handleFlip = () => {
    setIsFront(!isFront);
  };

  const handlePressSpeaker = (example: string) => {
    Speech.speak(example, {
      rate: 1.0,
      pitch: 1.0,
      onStart: () => setIsSpeaking(true),
      onDone: () => setIsSpeaking(false),
    });
  };

  return (
    <SlidePre
      handleGoBack={handleGoBack}
      word_list={data}
      page={page}
      handlePageChange={handlePageChange}
      isFront={isFront}
      handleFlip={handleFlip}
      isSpeaking={isSpeaking}
      handlePressSpeaker={handlePressSpeaker}
    />
  );
};
