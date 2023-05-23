import { RouteProp } from "@react-navigation/native";
import { FC } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import StackParamList from "../../../StackParamList";

export interface FlashCardsListPreProps {
  route: RouteProp<any, any>;
}
export const FlashCardsViewPre: FC<FlashCardsListPreProps> = (props) => {
  const { route } = props;
  return (
    <View>
      <View style={styles.FlashCardsTitleContainer}>
        <TextInput
          defaultValue={
            (route?.params as StackParamList["FlashCardsView"]).title
          }
          placeholder="単語帳名を入力"
          style={styles.FlashCardsTitleInput}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  FlashCardsTitleContainer: {
    paddingTop: 37,
    paddingBottom: 6,
    paddingHorizontal: 28,
  },
  FlashCardsTitleInput: {
    paddingHorizontal: 18,
    height: 38,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#000",
    borderRadius: 5,
    fontSize: 20,
  }
});
