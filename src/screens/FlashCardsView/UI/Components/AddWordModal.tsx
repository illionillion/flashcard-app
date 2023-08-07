import React, { FC, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

interface AddWordModalProps {
    isOpen: boolean;
    handleClose: () => void;
}

export const AddWordModal: FC<AddWordModalProps> = ({ isOpen, handleClose }) => {
    const [newWord, setNewWord] = useState('');

    return (
        <>
            {isOpen && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TextInput
                            value={newWord}
                            onChangeText={setNewWord}
                        />
                        <Button 
                        title="追加する"
                        onPress={() => {
                            setNewWord('');
                        }}
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
