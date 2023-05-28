import { FC, useState } from "react";
import { FlashCardsViewPre } from "./FlashCardsViewPre";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import StackParamList from "../../../StackParamList";
import {
  FlashCardsDataState,
  WordDef,
} from "../../../atom/FlashCardsDataState";
import { useSetRecoilState } from "recoil";

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
  const handleSave = () =>
    setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              id: id,
              name: flashcardName,
              words: wordsData,
            }
          : item
      )
    );
  const onPressTolide = () => {
    navigation.navigate("Slide", {
      title: flashcardName,
      data: wordsData,
    });
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
    />
  );
};
