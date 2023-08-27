import type { FC } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface EditWordModalProps {
    isEditOpen: boolean;
    loading: boolean;
    wordExamplePreview: string;
    wordName: string;
    wordMean: string;
    wordLang: string;
    wordExample: string;
    apiKey: string;
    handleEditClose: () => void;
    handleCreateExample: (newWord: string, newMean: string, newLang: string, apiKey: string, modalType: 'add' | 'edit') => Promise<void>;
    handleNameEditChanged: (text: string) => void;
    handleMeanChanged: (text: string) => void;
    handleLangChanged: (text: string) => void;
    handleExampleChanged: (text: string) => void;
    handleRemove: () => void;
    handleEdit: () => void;
}

export const EditWordModal: FC<EditWordModalProps> = ({
  isEditOpen, 
  loading,
  wordExamplePreview,
  wordName,
  wordMean,
  wordLang,
  wordExample,
  apiKey,
  handleEditClose,
  handleCreateExample,
  handleNameEditChanged,
  handleMeanChanged,
  handleLangChanged,
  handleExampleChanged,
  handleEdit,
  handleRemove
}) => {    
  return (
    <>
      {isEditOpen && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.row}>
              <TextInput
                style={styles.text}
                value={wordName}
                placeholder="単語名"
                onChangeText={handleNameEditChanged}
              />
              <TextInput
                style={styles.text}
                value={wordMean}
                placeholder="単語の意味"
                onChangeText={handleMeanChanged}
              />
            </View>
            <View style={styles.row}>
              <TextInput
                style={styles.text}
                value={wordLang}
                placeholder="単語の言語"
                onChangeText={handleLangChanged}
              />
              <TouchableOpacity
                style={{ ...styles.text, ...styles.createExample }}
                disabled={loading}
                onPress={() => handleCreateExample(wordName, wordMean, wordLang, apiKey, 'edit')}
              >
                <Text style={styles.createExampleText}>例文作成</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              multiline
              style={styles.textMulti}
              value={loading ? wordExamplePreview : wordExample} // ここの値をChatGPTでリアルタイムに更新
              placeholder="例文"
              editable={!loading}
              onChangeText={handleExampleChanged}
            />
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity 
              style={{...styles.button, ...styles.completeButton}}
              onPress={handleEdit}
            >
              <Text style={styles.buttonText}>編集完了</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{...styles.button, ...styles.closeButton}}
              onPress={handleEditClose}
            >
              <Text style={styles.buttonText}>閉じる</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{...styles.button, ...styles.deleteButton}}
              onPress={() => {
                handleRemove();
                handleEditClose();
              }}
            >
              <Text style={styles.buttonText}>削除</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
});
