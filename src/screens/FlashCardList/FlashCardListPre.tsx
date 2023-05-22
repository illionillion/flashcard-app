import { FC } from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
interface FlashCardDef {
  id: number;
  name: string;
}
/**
 * 単語帳一覧のUI
 */
export const FlashCardListPre: FC = () => {
  const data: FlashCardDef[] = [
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
  ];
  const renderItem: ListRenderItem<FlashCardDef> = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2} // 2列に設定
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingVertical: 16,
  },
  itemContainer: {
    flex: 0.5, // 2列なので幅を半分にする
    alignItems: "center",
    marginBottom: 16,
  },
});
