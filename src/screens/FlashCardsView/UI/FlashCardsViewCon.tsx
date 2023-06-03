import { NavigationProp, RouteProp } from "@react-navigation/native";
import { FC, useState } from "react";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { useSetRecoilState } from "recoil";
import StackParamList from "../../../StackParamList";
import { FlashCardsDataState, WordDef } from "../../../atom/FlashCardsDataState";
import { FlashCardsViewPre } from "./FlashCardsViewPre";

type FlashCardsViewRouteProp = RouteProp<StackParamList, "FlashCardsView">;
export interface FlashCardsListConProps {
  navigation: NavigationProp<any, any>;
  route: FlashCardsViewRouteProp;
}

export const FlashCardsViewCon: FC<FlashCardsListConProps> = (props) => {
  const { route, navigation } = props;
  const { id, name, words } = route.params.data;
  const [flashcardName, setFlashcardName] = useState<string>(name);
  const [buttonDisable, setButtonDisable] = useState<boolean>(false);
  const [wordsData, setWordsData] = useState<WordDef[]>(words);
  const setData = useSetRecoilState(FlashCardsDataState);
  const handleNameChanged = (text: string) => {
    setFlashcardName(text);
    setButtonDisable(text.trim() === "");
  };
  const handleAdd = () => {
    setWordsData((prev) => [
      ...prev,
      {
        id: (() => {
          if (prev.length === 0) {
            return 0;
          }

          const maxId = prev.reduce((max, card) => {
            return Math.max(max, card.id);
          }, -1);

          return maxId + 1;
        })(),
        name: "",
        lang: "",
        mean: "",
        example: "",
      },
    ]);
  };
  const handleSave = () => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              id: id,
              name: flashcardName,
              words: wordsData,
            }
          : item,
      ),
    );
    Toast.show({
      text1: "変更を保存しました",
      type: "success",
      visibilityTime: 2000,
    });
  };
  const onPressTolide = () => {
    navigation.navigate("Slide", {
      title: flashcardName,
      data: wordsData,
    });
  };
  const handleExampleCreateError = () => {
    Alert.alert("例文作成に失敗しました。", "正しいAPIキーが設定されているか確認してください。", [
      {
        text: "OK",
        onPress: () => navigation.navigate("Setting"),
      },
    ]);
  };

  return (
    <FlashCardsViewPre
      flashcardName={flashcardName}
      buttonDisable={buttonDisable}
      wordsData={wordsData}
      handleNameChanged={handleNameChanged}
      handleAdd={handleAdd}
      handleSave={handleSave}
      setWordsData={setWordsData}
      onPressToSlide={onPressTolide}
      handleExampleCreateError={handleExampleCreateError}
    />
  );
};
