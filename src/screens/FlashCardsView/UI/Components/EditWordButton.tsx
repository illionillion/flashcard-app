import type { Dispatch, FC, SetStateAction } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { WordDef } from '../../../../atom/FlashCardsDataState';
import { useEditWordButton } from '../Hooks/useEditWordButton';

interface EditWordButtonProps {
  item: WordDef;
  setWordsData: Dispatch<SetStateAction<WordDef[]>>;
}

export const EditWordButton: FC<EditWordButtonProps> = ({ item, setWordsData }) => {
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
    handleEdit,
    handleRemove,
    handleCreateExample,
  } = useEditWordButton({ item, setWordsData });
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
                style={[styles.text, styles.createExample]}
                disabled={loading}
                onPress={handleCreateExample}
              >
                <Text style={styles.createExampleText}>例文作成</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              multiline
              style={styles.textMulti}
              value={loading ? 'Loading...' : wordExample} // ここの値をChatGPTでリアルタイムに更新
              placeholder="例文"
              editable={!loading}
              onChangeText={handleChangeExample}
            />
            <TextInput
              multiline
              style={styles.textMulti}
              value={loading ? '' : wordExTrans} // ここの値をChatGPTでリアルタイムに更新
              editable={!loading}
              onChangeText={handleChangeExTrans}
            />
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity style={[styles.button, styles.completeButton]} onPress={handleEdit}>
              <Text style={styles.buttonText}>編集完了</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={handleClose}>
              <Text style={styles.buttonText}>閉じる</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleRemove}>
              <Text style={styles.buttonText}>削除</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <TouchableOpacity style={[styles.container, styles.shadow]} onPress={handleOpen}>
        <Text style={styles.textW}>{item.name}</Text>
        <Text style={styles.textW}>{item.mean}</Text>
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
  buttons: {
    paddingBottom: 12,
    gap: 20,
    flexDirection: 'row',
  },
  button: {
    width: 80,
    height: 50,
    borderRadius: 5,
    textAlign: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    backgroundColor: '#FF9D9D',
  },
  deleteButton: {
    backgroundColor: '#EF4123',
  },
  completeButton: {
    backgroundColor: '#5FA1DE',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  createExampleText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  container: {
    flex: 1,
    width: '85%',
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  textW: {
    flex: 0.5,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontSize: 15,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
});
