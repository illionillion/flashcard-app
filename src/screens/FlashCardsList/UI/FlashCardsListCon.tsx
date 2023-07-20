/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { FC, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { FlashCardsDataState, FlashCardsDef } from '../../../atom/FlashCardsDataState';
import { PopoverState } from '../../../atom/PopoverState';
import { FlashCardsListPre } from './FlashCardsListPre';
export interface FlashCardListProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}
/**
 * 単語帳一覧のロジック
 */
export const FlashCardsListCon: FC<FlashCardListProps> = ({ navigation }) => {
  const data = useRecoilValue<FlashCardsDef[]>(FlashCardsDataState);
  const setPopover = useSetRecoilState(PopoverState);

  const onPressCard = (id: number) => {
    navigation.navigate('FlashCardsView', {
      data: data.find((item) => item.id === id),
    });
  };
  const onPressButton = () => {
    navigation.navigate('Create');
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setPopover((prev) => ({ currentId: prev.currentId, visible: false }));
    });
    return unsubscribe;
  }, [navigation]);
  return <FlashCardsListPre rows={data} onPressCard={onPressCard} onPressButton={onPressButton} />;
};
