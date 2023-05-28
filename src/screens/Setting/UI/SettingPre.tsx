import { FC } from "react";
import {
  Text,
  View,
  TextInput,
  Linking,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SetterOrUpdater } from "recoil";

interface SettingPreProps {
  apiKey: string;
  setApiKey: SetterOrUpdater<string>;
}
/**
 * 設定画面のUI
 */
export const SettingPre: FC<SettingPreProps> = ({ apiKey, setApiKey }) => {
  const handleChangeText = (text: string) => {
    setApiKey(text);
  };
  const handleButtonPress = () => {
    const url = "https://platform.openai.com/account/api-keys";
    Linking.openURL(url);
  };

  return (
    <View style={styles.allView}>
      <TextInput
        style={styles.input}
        placeholder="APIキー設定を入力"
        value={apiKey}
        onChangeText={handleChangeText}
      />
      <View style={styles.textView}>
        <TouchableOpacity onPress={handleButtonPress} style={{ padding: 10 }}>
          <Text style={styles.text}>APIキーの取得方法</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  allView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 15,
  },
  input:{
    height: 40, 
    width: 336, 
    paddingHorizontal: 22,
    borderWidth: 1, 
    borderColor:"grey", 
    marginBottom: 10, 
    borderRadius:5,
  },
  textView: {
    alignSelf: "flex-end",
    marginRight: 20,
  },
  text: {
    color: "#a9ceec",
    textDecorationLine: "underline",
    textAlign: "right",
  },
});
