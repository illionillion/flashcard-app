import { FC } from "react";
import { FlashCardsListPreProps, FlashCardsViewPre } from "./FlashCardsViewPre";

export const FlashCardsViewCon:FC<FlashCardsListPreProps> = (props) => {
  return <FlashCardsViewPre {...props} />;
};
