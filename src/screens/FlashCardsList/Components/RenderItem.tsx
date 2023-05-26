import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Popover } from "./Popover";
import { useSetRecoilState } from "recoil";
import { PopoverState } from "../../../atom/PopoverState";
import { FlashCardsDataState } from "../../../atom/FlashCardsDataState";
interface RenderItemProps {
  id: number;
  name: string;
  onPressCard?: (id: number) => void;
}
export const RenderItem: FC<RenderItemProps> = ({ id, name, onPressCard }) => {
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const setPopover = useSetRecoilState(PopoverState);
  const setData = useSetRecoilState(FlashCardsDataState);
  const handleTogglePopover = () => setShowPopover((prev) => !prev);
  const checkPopoverShow = () => {
    if (showPopover) {
      // 表示された場合
      setPopover(() => ({ currentId: id, visible: true }));
    }
  };
  useEffect(checkPopoverShow, [showPopover]);
  const deleteFlashCards = () =>
    setData((prev) => prev.filter((item) => item.id !== id));
  return id > -1 && onPressCard ? (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onPressCard(id)}
    >
      <Text>{name}</Text>
      <TouchableOpacity
        style={styles.itemSettingButton}
        onPress={handleTogglePopover}
      >
        <SimpleLineIcons name="options" size={16} color="black" />
      </TouchableOpacity>
      <Popover
        id={id}
        showPopover={showPopover}
        setShowPopover={setShowPopover}
        deleteFlashCards={deleteFlashCards}
      />
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
