import { FC } from "react";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { FlashCardListPre } from "./FlashCardListPre";

interface FlashCardListProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}
/**
 * 単語帳一覧のロジック
 */
export const FlashCardListCon: FC<FlashCardListProps> = ({
  navigation,
  route,
}) => {
  return <FlashCardListPre />;
};
