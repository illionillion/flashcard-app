import { FC, useState } from "react";
import { Text, View, TextInput, Linking, TouchableOpacity } from "react-native";

/**
 * 設定画面のUI
 */
export const SettingPre:FC = () => {
  const [searchText, setSearchText] = useState("");

  const handleButtonPress = () => {
    const url = '';
    Linking.openURL(url);
  }

  return (
    <View style={{ flex: 1, flexDirection:'column', justifyContent: 'flex-start', alignItems: 'center', marginTop: 15 }}>
      {/* <Text>設定画面</Text> */}
      <TextInput
        style={{textAlign: "center",height: 40, width: 250, borderWidth: 1, borderColor:"grey", marginBottom: 10, borderRadius:5 }}
        placeholder="APIキー設定を入力"
      />
      <View style={{alignSelf: "flex-end", marginRight: 20}}>
        <TouchableOpacity onPress={handleButtonPress} style={{ padding: 10}}>
          <Text style={{color: "#a9ceec", textDecorationLine: "underline", textAlign: "right" }}>APIキーの取得方法</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
