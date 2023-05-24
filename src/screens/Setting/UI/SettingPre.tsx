import { FC, useState } from "react";
import { 
  Text, 
  View, 
  TextInput, 
  Linking, 
  TouchableOpacity,
  StyleSheet,
 } from "react-native";

/**
 * 設定画面のUI
 */
export const SettingPre:FC = () => {
  const [searchText, setSearchText] = useState("");

  const handleButtonPress = () => {
    const url = '';
    Linking.openURL(url);
  }
  const styles = StyleSheet.create({
    allView: {
      flex: 1,
      flexDirection:'column',
      justifyContent: 'flex-start', 
      alignItems: 'center', 
      marginTop: 15
    },
    input:{
      height: 40, 
      width: 250, 
      borderWidth: 1, 
      borderColor:"grey", 
      marginBottom: 10, 
      borderRadius:5
    },
    textView: {
      alignSelf: "flex-end", 
      marginRight: 20
    },
    text: {
      color: "#a9ceec", 
      textDecorationLine: "underline", 
      textAlign: "right"
    }
  })
  
  return (
    <View style={styles.allView}>
      {/* <Text>設定画面</Text> */}
      <TextInput
        style={styles.input}
        placeholder="APIキー設定を入力"
      />
      <View style={styles.textView}>
        <TouchableOpacity onPress={handleButtonPress} style={{ padding: 10}}>
          <Text style={styles.text}>APIキーの取得方法</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

};
