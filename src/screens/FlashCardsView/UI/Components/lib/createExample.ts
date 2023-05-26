import { AxiosError } from "axios";
import { ChatCompletionRequestMessageRoleEnum, OpenAIApi } from "openai";
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
export const generateExample = async (
  content: string,
  model = "gpt-3.5-turbo",
  role: ChatCompletionRequestMessageRoleEnum = "user",
  openai: OpenAIApi | undefined
) => {
  try {
    const response = await openai?.createChatCompletion({
      model: model,
      messages: [{ role: role, content: content }],
    });

    const answer = response?.data.choices[0].message?.content;
    return { success: true, content: answer };
  } catch (error) {
    if (isAxiosError(error) && error?.response?.status === 403) {
      // 通信失敗時
      return {
        success: false,
        content: "An error occurred during the request. Please try again.",
      };
    } else if (
      isAxiosError(error) &&
      error.response?.data.error.code === "context_length_exceeded"
    ) {
      // トークン不足時
      return {
        success: false,
        content:
          "An error occurred during the request. The file size is too large. Please choose another file or format the code in the file.",
      };
    } else {
      console.log(error);

      // APIキーが違うなど
      return {
        success: false,
        content:
          "An error occurred during the request. Please check your API key and model",
      };
    }
  }
};
