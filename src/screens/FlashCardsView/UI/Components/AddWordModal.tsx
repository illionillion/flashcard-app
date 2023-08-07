import React, { FC, useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Proficiency, WordDef } from "../../../../atom/FlashCardsDataState";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { generateExample, generateExampleReturn } from "../../../../lib/createExample";
import { useRecoilValue } from "recoil";
import { APIKeyState } from "../../../../atom/APIKeyState";

interface AddWordModalProps {
    isOpen: boolean;
    handleClose: () => void;
    handleAddNewWord: (newWord: WordDef) => void;
    OpenCreateExampleErrorMessage: (result: generateExampleReturn) => void;
}

export const AddWordModal: FC<AddWordModalProps> = ({ 
    isOpen, 
    handleClose, 
    handleAddNewWord,
    OpenCreateExampleErrorMessage,
}) => {
    const [newWord, setNewWord] = useState('');
    const [newMean, setNewMean] = useState('');
    const [newLang, setNewLang] = useState('');
    const [newExample, setNewExample] = useState('');
    const [wordsData, setWordsData] = useState<WordDef[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [wordExamplePreview, setWordExamplePreview] = useState<string>('');
    const apiKey = useRecoilValue(APIKeyState);

    const handleAdd = () => {
        const newWordDef = {
            id: (() => {
              if (wordsData.length === 0) {
                return 0;
              }
      
              const maxId = wordsData.reduce((max, card) => {
                return Math.max(max, card.id);
              }, -1);
      
              return maxId + 1;
            })(),
            name: newWord,
            lang: newLang,
            mean: newMean,
            example: newExample,
            proficiency: 'learning' as Proficiency,
        };

        setWordsData((prev) => [...prev, newWordDef]);
        handleAddNewWord(newWordDef);

        setNewWord('');
        setNewMean('');
        setNewLang('');
        setNewExample('');
        handleClose();
    };
    
    const handleCreateExample = async () => {
        if ([newWord, newMean, newLang].includes('')) {
          const errorMessage =
            newWord === ''
              ? '単語名を入力してください'
              : newMean === ''
              ? '単語の意味を入力してください'
              : '単語の言語を入力してください';
          Toast.show({
            text1: errorMessage,
            type: 'error',
            visibilityTime: 2000,
          });
          return;
        }
    
        setLoading(true);
    
        // ここでChatGPTに送信したい
        const result = await generateExample({
          apiKey: apiKey,
          wordLang: newLang,
          wordName: newWord,
          wordMean: newMean,
        });
    
        const updateChar = async (i: number) => {
          return new Promise<void>((resolve) => {
            setTimeout(() => {
              const char = result.content[i];
              if (i === 0) {
                setWordExamplePreview(() => char);
              } else {
                setWordExamplePreview((prev) => prev + char);
              }
              resolve();
            }, 100);
          });
        };
    
        if (result.success) {
          setNewExample(() => result.content);
          for (let i = 0; i < result.content.length; i++) {
            await updateChar(i);
          }
        } else {
          OpenCreateExampleErrorMessage(result);
        }
    
        setLoading(false);
      };

    return (
        <>
            {isOpen && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.row}>
                            <TextInput
                                style={styles.text}
                                value={newWord}
                                onChangeText={setNewWord}
                                placeholder="単語名"
                            />
                            <TextInput
                                style={styles.text}
                                value={newMean}
                                onChangeText={setNewMean}
                                placeholder="単語の意味"  
                            />
                        </View>
                        <View style={styles.row}>
                            <TextInput
                                style={styles.text}
                                value={newLang}
                                onChangeText={setNewLang}
                                placeholder="単語の言語"
                            />
                            <TouchableOpacity
                                style={{ ...styles.text, ...styles.createExample }}
                                onPress={handleCreateExample}
                                disabled={loading}
                                >
                                <Text style={styles.createExampleText}>例文作成</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={styles.textMulti}
                            value={loading ? wordExamplePreview : newExample}
                            onChangeText={setNewExample}
                            placeholder="例文"
                        />
                    </View>
                    <View style={styles.buttons}>
                        <View style={styles.addButton}>
                            <Button 
                                title="追加する"
                                color={'#fff'}
                                onPress={handleAdd}
                            />
                        </View>
                        <View style={styles.closeButton}>
                            <Button 
                                title="閉じる"
                                color={'#fff'}
                                onPress={handleClose}
                            />
                        </View>
                    </View>
                </View>
            )}      
        </>
    );
    
}
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
    addButton: {
        width: 110,
        height: 50,
        backgroundColor: '#FF9D9D',
        borderRadius: 5,
        textAlign: 'center',
        justifyContent: 'center',
    },
    closeButton: {
        width: 110,
        height: 50,
        backgroundColor: '#5FA1DE',
        borderRadius: 5,
        textAlign: 'center',
        justifyContent: 'center',
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
});
