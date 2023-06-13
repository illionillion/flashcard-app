import { FC, useState } from "react";
import { Linking } from "react-native";
import { useRecoilState } from "recoil";
import { APIKeyState } from "../../../atom/APIKeyState";
import { SettingPre } from "./SettingPre";

/**
 * 設定画面のロジック
 */
export const SettingCon: FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [apiKey, setApiKey] = useRecoilState(APIKeyState);
  const [inputValue, setInputValue] = useState(apiKey);
  const handleChangeText = (text: string) => {
    setInputValue(text);
  };
  const handleSave = () => {
    setApiKey(inputValue);
  };
  const handleClickToggleEditModeButton = () => {
    setIsEditMode((prev) => !prev);
    if (isEditMode) handleSave();
  };
  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };
  return (
    <SettingPre
      apiKey={apiKey}
      handleChangeText={handleChangeText}
      handleLinkPress={handleLinkPress}
      isEditMode={isEditMode}
      handleClickToggleEditModeButton={handleClickToggleEditModeButton}
      inputValue={inputValue}
    />
  );
};
