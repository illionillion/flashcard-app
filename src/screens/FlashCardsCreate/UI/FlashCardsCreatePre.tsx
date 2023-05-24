import { FC, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


/**
 * 単語帳作成画面のUI
 */
export const FlashCardsCreatePre: FC = () => {
  const [flashcardName, setFlashcardName] = useState("");
  const handleCreateFlashcard = () => {};

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 80 }}>
      <TextInput
        placeholder="単語帳名を入力"
        value={flashcardName}
        onChangeText={(text) => setFlashcardName(text)}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateFlashcard}>
        <Text style={styles.buttonText}>単語帳作成</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 100,
    paddingLeft: 15,
    height: 40,
    width: "80%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#5FA1DE",
    height: 40,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
});
