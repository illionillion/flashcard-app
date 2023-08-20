import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Proficiency, WordDef } from "../../../../atom/FlashCardsDataState";
import { useRecoilValue } from "recoil";
import { APIKeyState } from "../../../../atom/APIKeyState";

interface AddWordModalProps {
    isAddOpen: boolean;
    loading: boolean;
    wordExamplePreview: string;
    newExample: string;
    handleClose: () => void;
    handleAddNewWord: (newWord: WordDef) => void;
    handleCreateExample: (newWord: string, newMean: string, newLang: string, apiKey: string) => Promise<void>;
    setNewExample: Dispatch<SetStateAction<string>>;
}

export const AddWordModal: FC<AddWordModalProps> = ({ 
    isAddOpen, 
    loading,
		wordExamplePreview,
		newExample,
    setNewExample,
    handleClose, 
    handleAddNewWord,
    handleCreateExample
}) => {
    const [newWord, setNewWord] = useState<string>('');
    const [newMean, setNewMean] = useState<string>('');
    const [newLang, setNewLang] = useState<string>('');
    const [wordsData, setWordsData] = useState<WordDef[]>([]);
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

    return (
        <>
            {isAddOpen && (
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
                                onPress={() => handleCreateExample(newWord, newMean, newLang, apiKey)}
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
                        <View style={{...styles.button, ...styles.addButton}}>
                            <Button 
                                title="追加する"
                                color={'#fff'}
                                onPress={handleAdd}
                            />
                        </View>
                        <View style={{...styles.button, ...styles.closeButton}}>
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
