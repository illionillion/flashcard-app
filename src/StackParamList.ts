import { ParamListBase } from "@react-navigation/native";
import { FlashCardsDef } from "./atom/FlashCardsDataState";

export interface StackParamList extends ParamListBase {
  FlashCardsView: {
    data: FlashCardsDef;
  };
}

export default StackParamList;
