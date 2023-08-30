import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { APIKeyState } from '../atom/APIKeyState';
import { SentenceDiffState } from '../atom/SentenceDiffState';

interface ApiSuccessResponse {
  example_sentence: string;
  example_sentence_language_code: string;
  example_sentence_translated: string;
}

interface ApiErrorResponse {
  message: string;
  status: string;
}

interface apiProps {
  wordName: string;
  wordLang: string;
  wordMean: string;
}

export interface generateExampleReturn {
  success: boolean;
  content: ApiSuccessResponse;
  errorMessage: string;
  status: number;
}

/**
 * Axiosエラーか判定
 * @param error
 * @returns
 */
export const isAxiosError = (error: unknown): error is AxiosError => {
  return (error as AxiosError)?.isAxiosError === true;
};
/**
 * README作成関数
 * @param content
 * @param model
 * @param role
 * @returns
 */
export const generateExample = async (props: apiProps): Promise<generateExampleReturn> => {
  const { wordName, wordMean, wordLang } = props;
  const apiKey = useRecoilValue(APIKeyState);
  const sentenceDiff = useRecoilValue(SentenceDiffState);
  try {
    const res = await axios.post<ApiSuccessResponse>('https://ray-boon-api.vercel.app/api/v2', {
      apiKey: apiKey,
      wordName: wordName,
      wordLang: wordLang,
      wordMean: wordMean,
      sentenceDiff: sentenceDiff,
    });

    return { success: true, content: res.data, errorMessage: '', status: res.status };
  } catch (error) {
    if (isAxiosError(error)) {
      const res = error.response as AxiosResponse<ApiErrorResponse, any>;
      return {
        success: false,
        content: {
          example_sentence: '',
          example_sentence_language_code: '',
          example_sentence_translated: '',
        },
        errorMessage: res.data.message,
        status: res.status,
      };
    }
    return {
      success: false,
      content: {
        example_sentence: '',
        example_sentence_language_code: '',
        example_sentence_translated: '',
      },
      errorMessage: 'エラー',
      status: 500,
    };
  }
};
