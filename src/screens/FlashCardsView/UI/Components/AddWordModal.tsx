import React, { FC, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { Proficiency, WordDef } from "../../../../atom/FlashCardsDataState";

interface AddWordModalProps {
    isOpen: boolean;
    handleClose: () => void;
    handleAddNewWord: (newWord: WordDef) => void;
}

export const AddWordModal: FC<AddWordModalProps> = ({ isOpen, handleClose, handleAddNewWord}) => {
    const [newWord, setNewWord] = useState('');
    const [newMean, setNewMean] = useState('');
    const [newLang, setNewLang] = useState('');
    const [newExample, setNewExample] = useState('');
    const [wordsData, setWordsData] = useState<WordDef[]>([]);

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
            {isOpen && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TextInput
                            value={newWord}
                            onChangeText={setNewWord}
                            placeholder="単語名"
                        />
                        <TextInput
                            value={newMean}
                            onChangeText={setNewMean}
                            placeholder="意味"  
                        />
                        <TextInput
                            value={newLang}
                            onChangeText={setNewLang}
                            placeholder="言語"
                        />
                        <TextInput
                            value={newExample}
                            onChangeText={setNewExample}
                            placeholder="例文"
                        />
                        <Button 
                            title="追加する"
                            onPress={handleAdd}
                        />
                        <Button 
                            title="閉じる"
                            onPress={handleClose}
                        />
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
      backgroundColor: 'white', 
      padding: 20, 
      borderRadius: 10,
      justifyContent: 'center', 
      alignItems: 'center',
      zIndex: 1001,
    }
});
