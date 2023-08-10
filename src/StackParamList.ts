import { ParamListBase } from '@react-navigation/native';
import { FlashCardsDef, WordDef } from './atom/FlashCardsDataState';

export interface StackParamList extends ParamListBase {
  FlashCardsView: {
    data: FlashCardsDef;
  };
  Slide: {
    id: number;
    title: string;
    data: WordDef[];
  };
}

export default StackParamList;
