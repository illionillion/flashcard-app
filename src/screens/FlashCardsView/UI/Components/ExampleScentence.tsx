import React, { Dispatch, FC, SetStateAction } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface ExampleScentenceProps {
  index: number;
  loading: boolean;
  wordExample: string;
  wordExamplePreview: string;
  handleExampleChanged: (text: string, index: number) => void;
}

export const ExampleScentence: FC<ExampleScentenceProps> = ({
  index,
  loading,
  wordExample,
  wordExamplePreview,
  handleExampleChanged,
}) => {
  return (
    <View>
      <TextInput
        multiline
        value={loading ? wordExamplePreview : wordExample} // ここの値をChatGPTでリアルタイムに更新
        placeholder="例文"
        editable={!loading}
      // onChangeText={handleExampleChanged(text, index)}
      />
    </View >
  );
};

