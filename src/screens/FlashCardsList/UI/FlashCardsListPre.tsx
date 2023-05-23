import { FC } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { RenderItem } from "../Components/RenderItem";
export interface FlashCardsDef {
  id: number;
  name: string;
}

interface FlashCardsListPreProps {
  onPressCard: (title: string) => void;
  rows: FlashCardsDef[][];
}

/**
 * 単語帳一覧のUI
 */
export const FlashCardsListPre: FC<FlashCardsListPreProps> = ({
  onPressCard,
  rows,
}) => {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {rows.map((row, index) => (
        <View key={index} style={styles.row}>
          {row.map((item) => (
            <RenderItem key={item.id} id={item.id} name={item.name} onPressCard={onPressCard} />
          ))}
          {
            // 1の場合は空のやつを表示
            row.length === 1 && <RenderItem id={-1} name="" />
          }
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
});
