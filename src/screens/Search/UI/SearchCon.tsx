import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import { useRecoilValue } from "recoil";
import { FlashCardsDataState, FlashCardsDef } from "../../../atom/FlashCardsDataState";
import { SearchPre } from "./SearchPre";

export interface FilteredData {
  fileId: number;
  fileName: string;
  isOpen: boolean;
  id: number;
  name: string;
  lang: string;
  mean: string;
  example: string;
}

interface SearchConProps {
  navigation: NativeStackNavigationProp<ParamListBase, "Search">;
}

/**
 * 単語検索画面のロジック
 */
export const SearchCon: FC<SearchConProps> = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState("");
  const data = useRecoilValue<FlashCardsDef[]>(FlashCardsDataState);
  const convertedData = data.flatMap((cards) =>
    cards.words.map((word) => ({
      ...word,
      fileId: cards.id,
      fileName: cards.name,
      isOpen: false,
    })),
  );
  const [filteredData, setFilteredData] = useState<FilteredData[]>(convertedData);

  const handleToggle = (id: number) => {
    setFilteredData((prevData) =>
      prevData.map((card) => (card.id === id ? { ...card, isOpen: !card.isOpen } : card)),
    );
  };

  const handleSearch = (text: string) => {
    setSearchValue(text);
    if (searchValue === "") {
      setFilteredData(convertedData);
    } else {
      setFilteredData(convertedData.filter((card) => card.name.includes(searchValue)));
    }
  };

  const onPressFileName = (id: number) => {
    navigation.navigate("FlashCardsView", {
      data: data.find((item) => item.id === id),
    });
  };

  // TODO: 画面遷移するとsearchValueをリセット

  return (
    <SearchPre
      searchValue={searchValue}
      filteredData={filteredData}
      handleToggle={handleToggle}
      handleSearch={handleSearch}
      onPressFileName={onPressFileName}
    />
  );
};
