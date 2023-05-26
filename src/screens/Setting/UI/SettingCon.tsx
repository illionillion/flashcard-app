import { FC } from "react";
import { SettingPre } from "./SettingPre";
import { useRecoilState } from "recoil";
import { APIKeyState } from "../../../atom/APIKeyState";

/**
 * 設定画面のロジック
 */
export const SettingCon: FC = () => {
  const [apiKey, setApiKey] = useRecoilState(APIKeyState);
  return <SettingPre apiKey={apiKey} setApiKey={setApiKey} />;
};
