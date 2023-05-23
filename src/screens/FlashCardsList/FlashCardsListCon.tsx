import { FC } from "react";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { FlashCardsListPre } from "./FlashCardsListPre";

interface FlashCardListProps {
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
  return <FlashCardsListPre />;
};
