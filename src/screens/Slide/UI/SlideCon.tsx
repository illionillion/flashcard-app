import { FC, useState } from "react";
import { SlidePre } from "./SlidePre";
import { NavigationProp, RouteProp, useNavigation } from "@react-navigation/native";
import StackParamList from "../../../StackParamList";

type FlashCardsViewRouteProp = RouteProp<StackParamList, "Slide">;
interface SlideConProps {
  navigation: NavigationProp<any, any>;
  route: FlashCardsViewRouteProp;
 }

export const SlideCon: FC<SlideConProps> = ({navigation, route}) => {
  const { data } = route.params
  const handleGoBack = () => {
    navigation.goBack();
  }

  const [page, setPage] = useState(0);
  const pageTotal = data.length;
  const handlePageChange = (page: number) => {
    if (page >= 0 && page <= pageTotal - 1) {
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
      word_list={data}
      page={page}
      handlePageChange={handlePageChange}
      isFront={isFront}
      handleFlip={handleFlip}
    />
  );
};
