import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { Alert } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import type { WordDef } from '../../../../atom/FlashCardsDataState';
import type { generateExampleReturn } from '../../../../lib/createExample';
import { generateExample } from '../../../../lib/createExample';

export const useEditWordButton = ({
  item,
  setWordsData,
}: {
  item: WordDef;
  setWordsData: Dispatch<SetStateAction<WordDef[]>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wordName, setWordName] = useState(item.name);
  const [wordMean, setWordMean] = useState(item.mean);
  const [wordLang, setWordLang] = useState(item.lang);
  const [wordExample, setWordExample] = useState(item.example);
  const [wordExTrans, setWordExTrans] = useState(item.exTrans);
  const [wordLangCode, setWordLangCode] = useState(item.langCode);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setWordName(item.name);
    setWordMean(item.mean);
    setWordLang(item.lang);
    setWordLangCode(item.langCode);
    setWordExample(item.example);
    setWordExTrans(item.exTrans);
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

  const handleEdit = () => {
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

    setWordsData((prev) =>
      prev.map((word) =>
        word.id === item.id
          ? {
            ...word,
            name: wordName,
            mean: wordMean,
            lang: wordLang,
            langCode: wordLangCode,
            example: wordExample,
            exTrans: wordExTrans,
          }
          : word,
      ),
    );
    handleClose();
    setLoading(false);
  };

  const handleRemove = () => {
    setWordsData((prev) => prev.filter((word) => word.id !== item.id));
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
      wordLang: wordLang,
      wordName: wordName,
      wordMean: wordMean,
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
    handleEdit,
    handleRemove,
    handleCreateExample,
  };
};
