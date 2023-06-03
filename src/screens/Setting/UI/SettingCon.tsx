import { FC } from "react";
import { SettingPre } from "./SettingPre";
import { useRecoilState } from "recoil";
import { APIKeyState } from "../../../atom/APIKeyState";
import { Linking } from "react-native";

/**
 * 設定画面のロジック
 */
export const SettingCon: FC = () => {
  const [apiKey, setApiKey] = useRecoilState(APIKeyState);
  const handleChangeText = (text: string) => {
    setApiKey(text);
  };
  const handlePrivacyPolicyButtonPress = () => {
    const url = "https://ray-boon-api.vercel.app/PrivacyPolicy";
    Linking.openURL(url);
  };
  const handleExplanationSettingButtonPress = () => {
    const url = "https://ray-boon-api.vercel.app/how-to-setting";
    Linking.openURL(url);
  };
  return (
    <SettingPre
      apiKey={apiKey}
      handleChangeText={handleChangeText}
      handleExplanationSettingButtonPress={handleExplanationSettingButtonPress}
      handlePrivacyPolicyButtonPress={handlePrivacyPolicyButtonPress}
    />
  );
};
