import { RouteProp } from "@react-navigation/native";
import { FC } from "react";
import { Text, View } from "react-native";
import StackParamList from "../../../StackParamList";

export interface FlashCardsListPreProps {
  route: RouteProp<any, any>;
}
export const FlashCardsViewPre: FC<FlashCardsListPreProps> = (props) => {
  const { route } = props;
  return (
    <View>
      <Text>{(route?.params as StackParamList["FlashCardsView"]).title}</Text>
    </View>
  );
};
