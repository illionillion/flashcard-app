import { FC, useState } from "react";
import { FlashCardsCreatePre } from "./FlashCardsCreatePre";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { FlashCardsDataState, NextAvailableIdSelector } from "../../../atom/FlashCardsDataState";

/**
 * 単語帳作成画面のロジック
 */
export const FlashCardsCreateCon: FC = () => {
  const [flashcardName, setFlashcardName] = useState<string>("");
  const [buttonDisable, setButtonDisable] = useState<boolean>(true);
  const setData = useSetRecoilState(FlashCardsDataState);
  const nextId = useRecoilValue(NextAvailableIdSelector);
  const handleNameChanged = (text: string) => {
    setFlashcardName(text);
    setButtonDisable(text.trim() === "");
  };
  const handleCreateFlashcard = () => {
    setData(oldstate => [
      ...oldstate,
      {
        id: nextId,
        name: flashcardName,
        words: []
      }
    ])
    handleNameChanged("");
  };

  return (
    <FlashCardsCreatePre
      flashcardName={flashcardName}
      handleCreateFlashcard={handleCreateFlashcard}
      handleNameChanged={handleNameChanged}
      buttonDisable={buttonDisable}
    />
  );
};
