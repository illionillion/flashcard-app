import { FC } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
interface FlashCardsDef {
  id: number;
  name: string;
}

interface FlashCardsListPreProps {
  onPressCard: (title: string) => void
}

/**
 * 単語帳一覧のUI
 */
export const FlashCardsListPre: FC<FlashCardsListPreProps> = ({onPressCard}) => {
  const data: FlashCardsDef[] = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
    { id: 5, name: "Item 5" },
    { id: 6, name: "Item 6" },
    { id: 7, name: "Item 7" },
    { id: 8, name: "Item 8" },
    { id: 9, name: "Item 9" },
    { id: 10, name: "Item 10" },
    { id: 11, name: "Item 11" },
    { id: 12, name: "Item 12" },
    { id: 13, name: "Item 13" },
    { id: 14, name: "Item 14" },
    { id: 15, name: "Item 15" },
    { id: 16, name: "Item 16" },
    { id: 17, name: "Item 17" },
    { id: 18, name: "Item 18" },
    { id: 19, name: "Item 19" },
    { id: 20, name: "Item 20" },
    { id: 21, name: "Item 21" },
    { id: 22, name: "Item 22" },
    { id: 23, name: "Item 23" },
    { id: 24, name: "Item 24" },
    { id: 25, name: "Item 25" },
    { id: 26, name: "Item 26" },
    { id: 27, name: "Item 27" },
    { id: 28, name: "Item 28" },
    { id: 29, name: "Item 29" },
    // { id: 30, name: "Item 30" },
  ];

  const rows: FlashCardsDef[][] = Array.from(
    { length: Math.ceil(data.length / 2) },
    (_, index) => data.slice(index * 2, index * 2 + 2)
  );

  const RenderItem: FC<FlashCardsDef> = ({ id, name }) => {
    return id > -1 ? (
      <TouchableOpacity style={styles.itemContainer} onPress={()=>onPressCard(name)}>
        <Text>{name}</Text>
      </TouchableOpacity>
    ) : (
      <View style={{ ...styles.itemContainer, opacity: 0 }}></View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {rows.map((row, index) => (
        <View key={index} style={styles.row}>
          {row.map((item) => (
            <RenderItem key={item.id} {...item} />
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
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    marginHorizontal: 8, // アイテム間のマージンを追加
    flex: 0.5,
    height: 90,
    backgroundColor: "#B8BFFF",
  },
});
