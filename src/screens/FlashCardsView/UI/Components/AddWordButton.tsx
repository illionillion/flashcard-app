import { Ionicons } from '@expo/vector-icons';
import type { Dispatch, FC, SetStateAction } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { WordDef } from '../../../../atom/FlashCardsDataState';
import { useAddWordButton } from '../Hooks/useAddWordButton';

interface AddWordButtonProps {
  wordsData: WordDef[];
  setWordsData: Dispatch<SetStateAction<WordDef[]>>;
}

export const AddWordButton: FC<AddWordButtonProps> = ({ wordsData, setWordsData }) => {
  const {
    isOpen,
    loading,
    wordName,
    wordMean,
    wordLang,
    wordExample,
    wordExTrans,
    handleOpen,
    handleClose,
    handleChangeName,
    handleChangeMean,
    handleChangeLang,
    handleChangeExample,
    handleChangeExTrans,
    handleAdd,
    handleCreateExample,
  } = useAddWordButton({ wordsData, setWordsData });
  return (
    <>
      {isOpen && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.row}>
              <TextInput
                style={styles.text}
                value={wordName}
                placeholder="単語名"
                onChangeText={handleChangeName}
              />
              <TextInput
                style={styles.text}
                value={wordMean}
                placeholder="単語の意味"
                onChangeText={handleChangeMean}
              />
            </View>
            <View style={styles.row}>
              <TextInput
                style={styles.text}
                value={wordLang}
                placeholder="単語の言語"
                onChangeText={handleChangeLang}
              />
              <TouchableOpacity
                style={{ ...styles.text, ...styles.createExample }}
                disabled={loading}
                onPress={handleCreateExample}
              >
                <Text style={styles.createExampleText}>例文作成</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              multiline
              style={styles.textMulti}
              value={loading ? 'Loading... ' : wordExample}
              placeholder="例文"
              onChangeText={handleChangeExample}
            />
            <TextInput
              multiline
              style={styles.textMulti}
              value={loading ? '' : wordExTrans}
              onChangeText={handleChangeExTrans}
            />
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={{ ...styles.button, ...styles.addButton }}
              disabled={loading}
              onPress={() => {
                handleAdd();
              }}
            >
              <Text style={styles.buttonText}>追加する</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.button, ...styles.closeButton }}
              onPress={handleClose}
            >
              <Text style={styles.buttonText}>閉じる</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <TouchableOpacity style={styles.PlusButton} onPress={handleOpen}>
        <Ionicons name="add" size={20} color="#fff" />
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    width: '80%',
    height: 225,
    backgroundColor: '#D9D9D9',
    marginVertical: 22,
    marginHorizontal: '10%',
    paddingHorizontal: 20,
    paddingTop: 11,
    paddingBottom: 16,
    position: 'relative',
    borderRadius: 10,
    zIndex: 1001,
  },
  row: {
    paddingBottom: 12,
    gap: 8,
    flexDirection: 'row',
  },
  text: {
    flex: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
  },
  buttons: {
    paddingBottom: 12,
    gap: 20,
    flexDirection: 'row',
  },
  button: {
    width: 110,
    height: 50,
    borderRadius: 5,
    textAlign: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#5FA1DE',
  },
  closeButton: {
    backgroundColor: '#FF9D9D',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  textMulti: {
    flex: 1,
    paddingVertical: 3,
    backgroundColor: '#fff',
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createExample: {
    backgroundColor: '#5C98B9',
  },
  createExampleText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  PlusButton: {
    backgroundColor: '#599D4D',
    justifyContent: 'center',
    alignItems: 'center',
    width: 53,
    height: 53,
    borderRadius: 50,
  },
});
