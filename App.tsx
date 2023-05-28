import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { BottomTabNavigate } from "./src/Navigate/BottomTabNavigate";
import { useEffect } from "react";
import { getData } from "./src/lib/DataSave";
import { FlashCardsDataState } from "./src/atom/FlashCardsDataState";
import { APIKeyState } from "./src/atom/APIKeyState";

export default function App() {
  // const setData = useSetRecoilState(FlashCardsDataState);
  // const setApiKey = useSetRecoilState(APIKeyState);
  // useEffect(() => {
  //   (async () => {
  //     const saveData = await getData("FlashCardsData");
  //     if (saveData !== "") {
  //       setData(() => JSON.parse(saveData));
  //     }
  //     const key = await getData("APIKey");
  //     if (key !== "") {
  //       setApiKey(() => key);
  //     }
  //   })();
  // }, []);
  return (
    <RecoilRoot>
      <BottomTabNavigate />
    </RecoilRoot>
  );
}
