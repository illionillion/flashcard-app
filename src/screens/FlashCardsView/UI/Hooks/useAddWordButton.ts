import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { Alert } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import type { WordDef } from '../../../../atom/FlashCardsDataState';
import { type Proficiency } from '../../../../atom/FlashCardsDataState';
import type { generateExampleReturn } from '../../../../lib/createExample';
import { generateExample } from '../../../../lib/createExample';

export const useAddWordButton = ({
  wordsData,
  setWordsData,
}: {
  wordsData: WordDef[];
  setWordsData: Dispatch<SetStateAction<WordDef[]>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wordName, setWordName] = useState('');
  const [wordMean, setWordMean] = useState('');
  const [wordLang, setWordLang] = useState('');
  const [wordExample, setWordExample] = useState('');
  const [wordExTrans, setWordExTrans] = useState('');
  const [wordLangCode, setWordLangCode] = useState('');

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setWordName('');
    setWordMean('');
    setWordLang('');
    setWordLangCode('');
    setWordExample('');
    setWordExTrans('');
    setIsOpen(false);
  };
  const handleChangeName = (text: string) => {
    setWordName(text);
  };
  const handleChangeMean = (text: string) => {
    setWordMean(text);
  };
  const handleChangeLang = (text: string) => {
    setWordLang(text);
  };
  const handleChangeExample = (text: string) => {
    setWordExample(text);
  };
  const handleChangeExTrans = (text: string) => {
    setWordExTrans(text);
  };

  const handleAdd = () => {
    if ([wordName, wordMean].includes('')) {
      const errorMessage =
        wordName === '' ? '単語名は入力必須項目です。' : '単語の意味は入力必須項目です。';
      Toast.show({
        text1: errorMessage,
        type: 'error',
        visibilityTime: 2000,
      });
      return;
    }
    setLoading(true);

    const newWord = {
      id: (() => {
        if (wordsData.length === 0) {
          return 0;
        }

        const maxId = wordsData.reduce((max, card) => {
          return Math.max(max, card.id);
        }, -1);

        return maxId + 1;
      })(),
      name: wordName,
      mean: wordMean,
      lang: wordLang,
      langCode: wordLangCode,
      example: wordExample,
      exTrans: wordExTrans,
      proficiency: 'learning' as Proficiency,
    };

    setWordsData((prev) => [...prev, newWord]);
    setWordName('');
    setWordMean('');
    setWordLang('');
    setWordExample('');
    setLoading(false);
    handleClose();
  };

  const OpenCreateExampleErrorMessage = (result: generateExampleReturn) => {
    const message =
      result.status === 503 ? '時間をおいてもう一度試してください。' : result.errorMessage;
    Alert.alert('例文作成に失敗しました。', message, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
      },
    ]);
  };
  const handleCreateExample = async () => {
    if ([wordName, wordMean, wordLang].includes('')) {
      const errorMessage =
        wordName === ''
          ? '単語名を入力してください'
          : wordMean === ''
            ? '単語の意味を入力してください'
            : '単語の言語を入力してください';
      Toast.show({
        text1: errorMessage,
        type: 'error',
        visibilityTime: 2000,
      });
      return;
    }

    setLoading(true);

    // ここでChatGPTに送信したい
    const result = await generateExample({
      wordLang,
      wordName,
      wordMean,
    });

    if (result.success) {
      setWordExample(result.content.example_sentence);
      setWordExTrans(result.content.example_sentence_translated);
      setWordLangCode(result.content.example_sentence_language_code);
    } else {
      OpenCreateExampleErrorMessage(result);
    }

    setLoading(false);
  };

  return {
    isOpen,
    loading,
    wordName,
    wordMean,
    wordLang,
    wordExample,
    wordExTrans,
    handleOpen,
    handleClose,
    handleChangeName,
    handleChangeMean,
    handleChangeLang,
    handleChangeExample,
    handleChangeExTrans,
    handleAdd,
    handleCreateExample,
  };
};
