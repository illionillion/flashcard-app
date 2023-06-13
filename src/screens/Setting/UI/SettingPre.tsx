import { FC } from "react";

import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface SettingPreProps {
  apiKey: string;
  inputValue: string;
  handleChangeText: (text: string) => void;
  handleLinkPress: (url: string) => void;
  isEditMode: boolean;
  handleClickToggleEditModeButton: () => void;
}
/**
 * 設定画面のUI
 */
export const SettingPre: FC<SettingPreProps> = ({
  apiKey,
  inputValue,
  handleChangeText,
  handleLinkPress,
  isEditMode,
  handleClickToggleEditModeButton,
}) => {
  return (
    <View style={styles.allView}>
      <View style={styles.row}>
        {isEditMode ? (
          <TextInput
            style={styles.input}
            placeholder="APIキーを設定する"
            value={inputValue}
            onChangeText={handleChangeText}
            keyboardType="visible-password"
            autoFocus={true}
          />
        ) : (
          <>
            <Text style={styles.label}>APIキー : </Text>
            <Text style={styles.apiKey}>
              {apiKey.length > 7
                ? `${apiKey.substring(0, 3)}...${apiKey.substring(apiKey.length - 4)}`
                : apiKey || "未設定"}
            </Text>
          </>
        )}
      </View>
      <TouchableOpacity onPress={handleClickToggleEditModeButton} style={styles.button}>
        <Text style={styles.buttonText}>{isEditMode ? "保存する" : "APIキーを編集する"}</Text>
      </TouchableOpacity>
      <View style={styles.textView}>
        <TouchableOpacity
          onPress={() => handleLinkPress("https://ray-boon-api.vercel.app/how-to-setting")}
        >
          <Text style={styles.link}>APIキーの取得方法</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleLinkPress("https://ray-boon-api.vercel.app/PrivacyPolicy")}
        >
          <Text style={styles.link}>プライバシーポリシー</Text>
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
    marginTop: 30,
  },
  row: {
    flexDirection: "row",
    width: "80%",
    alignItems: "center",
    height: 40,
  },
  input: {
    height: 40,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    flex: 1,
  },
  label: { fontSize: 16 },
  apiKey: { fontSize: 16, flex: 1, marginLeft: 4, color: "gray" },
  textView: {
    alignSelf: "flex-end",
    marginRight: 20,
  },
  button: {
    backgroundColor: "#5FA1DE",
    height: 40,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 30,
  },
  buttonText: {
    color: "white",
  },
  link: {
    padding: 10,
    color: "#06C3FF",
    textDecorationLine: "underline",
    textAlign: "right",
  },
});
