import { FC } from "react";

import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface SettingPreProps {
  isEditMode: boolean;
  apiKey: string;
  inputValue: string;
  handleClickToggleEditModeButton: () => void;
  handleChangeText: (text: string) => void;
  handleSave: () => void;
  handleLinkPress: (url: string) => void;
}
/**
 * 設定画面のUI
 */
export const SettingPre: FC<SettingPreProps> = ({
  isEditMode,
  apiKey,
  inputValue,
  handleClickToggleEditModeButton,
  handleChangeText,
  handleSave,
  handleLinkPress,
}) => {
  return (
    <View style={styles.allView}>
      {isEditMode ? (
        <>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="APIキーを設定する"
              value={inputValue}
              onChangeText={handleChangeText}
              keyboardType="visible-password"
              autoFocus={true}
            />
          </View>
          <View style={{ flexDirection: "row", width: "80%", alignItems: "center" }}>
            <TouchableOpacity onPress={handleClickToggleEditModeButton} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>キャンセル</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.buttonText}>保存する</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.row}>
            <Text style={styles.label}>APIキー : </Text>
            <Text style={styles.apiKey}>
              {apiKey.length > 7
                ? `${apiKey.substring(0, 3)}...${apiKey.substring(apiKey.length - 4)}`
                : apiKey || "未設定"}
            </Text>
          </View>
          <TouchableOpacity onPress={handleClickToggleEditModeButton} style={styles.button}>
            <Text style={styles.buttonText}>APIキーを編集する</Text>
          </TouchableOpacity>
        </>
      )}
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
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 30,
  },
  row: {
    width: "80%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
  },
  apiKey: {
    fontSize: 16,
    flex: 1,
    marginLeft: 4,
    color: "gray",
  },
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
  saveButton: {
    backgroundColor: "#5FA1DE",
    height: 40,
    width: "49%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 30,
    marginLeft: "2%",
  },
  cancelButton: {
    backgroundColor: "white",
    height: 40,
    width: "49%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
  cancelButtonText: {
    color: "#5FA1DE",
  },
  link: {
    padding: 10,
    color: "#06C3FF",
    textDecorationLine: "underline",
    textAlign: "right",
  },
});
