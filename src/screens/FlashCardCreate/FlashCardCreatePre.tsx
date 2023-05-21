import { FC } from "react";
import { Text, View } from "react-native";

/**
 * 単語帳作成画面のUI
 */
export const FlashCardCreatePre: FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>単語帳作成</Text>
    </View>
  );
};
