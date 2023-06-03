import Toast, { BaseToast, BaseToastProps } from "react-native-toast-message";
import { RecoilRoot } from "recoil";
import { BottomTabNavigate } from "./src/Navigate/BottomTabNavigate";

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

  const toastConfig = {
    success: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "#69C779" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: "400",
        }}
      />
    ),
  };

  return (
    <RecoilRoot>
      <BottomTabNavigate />
      <Toast config={toastConfig} />
    </RecoilRoot>
  );
}
