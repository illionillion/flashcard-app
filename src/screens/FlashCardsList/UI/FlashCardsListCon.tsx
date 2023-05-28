import { FC, useEffect, useState } from "react";
import { FlashCardsListPre } from "./FlashCardsListPre";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import {
  FlashCardsDataState,
  FlashCardsDef,
} from "../../../atom/FlashCardsDataState";
import { useRecoilValue } from "recoil";
export interface FlashCardListProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}
/**
 * 単語帳一覧のロジック
 */
export const FlashCardsListCon: FC<FlashCardListProps> = ({ navigation }) => {
  const data = useRecoilValue<FlashCardsDef[]>(FlashCardsDataState);

  const rows: FlashCardsDef[][] = Array.from(
    { length: Math.ceil(data.length / 2) },
    (_, index) => data.slice(index * 2, index * 2 + 2)
  );

  const onPressCard = (id: number) => {
    navigation.navigate("FlashCardsView", {
      data: data.find((item) => item.id === id),
    });
  };
  const onPressButton = () => {
    navigation.navigate("Create");
  };
  return (
    <FlashCardsListPre
      rows={rows}
      onPressCard={onPressCard}
      onPressButton={onPressButton}
    />
  );
};
