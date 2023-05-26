import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
interface RenderItemProps {
  id: number;
  name: string;
  onPressCard?: (id: number) => void;
}
export const RenderItem: FC<RenderItemProps> = ({ id, name, onPressCard }) => {
  return id > -1 && onPressCard ? (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onPressCard(id)}
    >
      <Text>{name}</Text>
      <TouchableOpacity style={styles.itemSettingButton}>
        <SimpleLineIcons name="options" size={16} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  ) : (
    <View style={{ ...styles.itemContainer, opacity: 0 }}></View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    marginHorizontal: 8, // アイテム間のマージンを追加
    flex: 0.5,
    height: 90,
    backgroundColor: "#B8BFFF",
    position: "relative",
  },
  itemSettingButton: {
    position: "absolute",
    top: 5,
    right: 10,
  },
});
