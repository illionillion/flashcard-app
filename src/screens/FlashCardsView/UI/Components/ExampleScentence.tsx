import React, { Dispatch, FC, SetStateAction } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface ExampleScentenceProps {
  loading: boolean;
  wordExample: string;
  wordExamplePreview: string;
  setWordExample: Dispatch<SetStateAction<string>>;
  setWordExamplePreview: Dispatch<SetStateAction<string>>;
  handleExampleChanged: (text: string) => void;
}

export const ExampleScentence: FC<ExampleScentenceProps> = ({
  loading,
  wordExample,
  wordExamplePreview,
  setWordExample,
  setWordExamplePreview,
  handleExampleChanged,
}) => {
  return (
    <View>
      <TextInput
        multiline
        value={loading ? wordExamplePreview : wordExample} // ここの値をChatGPTでリアルタイムに更新
        placeholder="例文"
        editable={!loading}
        onChangeText={handleExampleChanged} />
    </View>
  );
};

