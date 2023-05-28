import { FC, useState } from "react";
import { SlidePre } from "./SlidePre";
import { useNavigation } from "@react-navigation/native";

interface SlideConProps { }

export const SlideCon: FC<SlideConProps> = (props) => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  }

  const word_list = [
    {
      id: 1,
      word: "你好",
      meaning: "こんにちは",
      example: "你好，我叫小明。",
    },
    {
      id: 2,
      word: "是",
      meaning: "肯定",
      example: "我是日本人。",
    },
    {
      id: 3,
      word: "不",
      meaning: "否定",
      example: "我不是日本人。",
    },
    {
      id: 4,
      word: "我",
      meaning: "私",
      example: "我是日本人。",
    },
    {
      id: 5,
      word: "你",
      meaning: "あなた",
      example: "你是日本人。",
    },
    {
      id: 6,
      word: "他",
      meaning: "彼",
      example: "他是日本人。",
    },
  ];

  const [page, setPage] = useState(1);
  const pageTotal = word_list.length;
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pageTotal) {
      setPage(page);
    }
  };

  const [isFront, setIsFront] = useState(true);
  const handleFlip = () => {
    setIsFront(!isFront);
  };

  return (
    <SlidePre
      handleGoBack={handleGoBack}
      word_list={word_list}
      page={page}
      handlePageChange={handlePageChange}
      isFront={isFront}
      handleFlip={handleFlip}
    />
  );
};
