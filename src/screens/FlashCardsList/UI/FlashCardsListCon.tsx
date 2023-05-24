import { FC } from "react";
import { FlashCardsListPre } from "./FlashCardsListPre";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { FlashCardsDataState, FlashCardsDef } from "../../../atom/FlashCardsDataState";
import { useRecoilState, useRecoilValue } from "recoil";
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
  // const [data, setData] =  useRecoilState<FlashCardsDef[]>(FlashCardsDataState);
  const data =  useRecoilValue<FlashCardsDef[]>(FlashCardsDataState);

  const rows: FlashCardsDef[][] = Array.from(
    { length: Math.ceil(data.length / 2) },
    (_, index) => data.slice(index * 2, index * 2 + 2)
  );

  const onPressCard = (title: string) => {
    navigation.navigate("FlashCardsView", { title: title });
  };
  return <FlashCardsListPre onPressCard={onPressCard} rows={rows} />;
};
