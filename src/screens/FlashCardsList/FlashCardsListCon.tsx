import { FC } from "react";
import { FlashCardsListPre } from "./FlashCardsListPre";
import { NavigationProp, RouteProp } from "@react-navigation/native";
export interface FlashCardListProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}
/**
 * 単語帳一覧のロジック
 */
export const FlashCardsListCon: FC<FlashCardListProps> = ({
  navigation,
  route,
}) => {
  const onPressCard = (title: string) => {
    navigation.navigate("FlashCardsView", {title: title})
  }
  return <FlashCardsListPre onPressCard={onPressCard} />;
};
