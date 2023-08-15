import { Ionicons } from '@expo/vector-icons';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { WordDef } from '../../../atom/FlashCardsDataState';
import { WordCard } from './Components/WordCard';
import { generateExampleReturn } from '../../../lib/createExample';
import { AddWordModal } from './Components/AddWordModal';
import { EditWordModal } from './Components/EditWordModal';

export interface FlashCardsListPreProps {
  flashcardName: string;
  buttonDisable: boolean;
  wordsData: WordDef[];
  isAddOpen: boolean;
  isEditOpen: boolean;
  activeId: number | null;
  loading: boolean;
  wordExamplePreview: string;
  newExample: string;
  setWordsData: Dispatch<SetStateAction<WordDef[]>>;
  handleNameChanged: (text: string) => void;
  handleSave: () => void;
  onPressToSlide: () => void;
  handleOpen: () => void;
  handleClose: () => void;
  handleEditOpen: () => void;
  handleEditClose: () => void;
  handleAddNewWord:(newWord: WordDef) => void;
  setActiveId: Dispatch<SetStateAction<number | null>>;
  handleCreateExample: (newWord: string, newMean: string, newLang: string, apiKey: string) => Promise<void>;
  setNewExample: Dispatch<SetStateAction<string>>;
}

export const FlashCardsViewPre: FC<FlashCardsListPreProps> = (props) => {
	const {
		flashcardName,
		buttonDisable,
		wordsData,
		isAddOpen,
		isEditOpen,
		activeId,
		loading,
		wordExamplePreview,
		newExample,
		handleNameChanged,
		handleSave,
		setWordsData,
		onPressToSlide,
		handleOpen,
		handleClose,
		handleEditOpen,
		handleEditClose,
		handleAddNewWord,
		setActiveId,
		handleCreateExample,
		setNewExample
	} = props;

	return (
		<>
			<View style={styles.FlashCardsContainer}>
				<View style={styles.FlashCardsTitleContainer}>
					<TextInput
						value={flashcardName}
						onChangeText={handleNameChanged}
						placeholder="単語帳名を入力"
						style={styles.FlashCardsTitleInput}
					/>
				</View>
				<ScrollView style={styles.FlashScrollContainer} showsVerticalScrollIndicator={false} scrollEnabled={false}>
					{wordsData.map((item) => (
						<TouchableOpacity 
							key={item.id}
							onPress={() => {
								setActiveId(item.id);
								handleEditOpen();
							}}>
							<WordCard
								item={item}
							/>
						</TouchableOpacity>
					))}
				</ScrollView>
				<View style={styles.FlashCardsBottom}>
					<TouchableOpacity
						style={{ ...styles.SaveButton, ...styles.ButtonCommon }}
						disabled={buttonDisable}
						onPress={handleSave}
					>
						<Text style={styles.SaveButtonText}>保存する</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{ ...styles.SlideButton, ...styles.ButtonCommon }}
						onPress={onPressToSlide}
						disabled={wordsData.length === 0 ? true : false}
					>
						<Text style={styles.SlideButtonText}>スライドショー</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.PlusButton} onPress={handleOpen}>
						<Ionicons name="add" size={20} color="#fff" />
					</TouchableOpacity>
				</View>
			</View>
			<AddWordModal
				isAddOpen={isAddOpen}
				loading={loading}
				wordExamplePreview={wordExamplePreview}
				newExample={newExample}
				setNewExample={setNewExample}
				handleClose={handleClose}
				handleAddNewWord={handleAddNewWord}
				handleCreateExample={handleCreateExample}
			/>
			{activeId !== null && (
				<EditWordModal
					isEditOpen={isEditOpen}
					loading={loading}
					wordExamplePreview={wordExamplePreview}
					handleEditClose={handleEditClose}
					item={wordsData.find((item) => item.id === activeId || null)}
					setWordsData={setWordsData}
					handleCreateExample={handleCreateExample}
				/>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	FlashCardsContainer: {
		position: 'relative',
		flex: 1,
	},
	FlashCardsTitleContainer: {
		paddingTop: 37,
		paddingBottom: 28,
		paddingHorizontal: 28,
	},
	FlashCardsTitleInput: {
		paddingHorizontal: 18,
		height: 38,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: '#000',
		borderRadius: 5,
		fontSize: 20,
	},
	FlashScrollContainer: {
		flexGrow: 1,
	},

	FlashCardsBottom: {
		flexDirection: 'row',
		gap: 10,
		paddingVertical: 15,
		paddingHorizontal: 30,
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	ButtonCommon: {
		width: 130,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
	},
	SaveButton: {
		backgroundColor: '#5FA1DE',
	},
	SaveButtonText: {
		color: '#fff',
		fontSize: 15,
	},
	SlideButton: {
		backgroundColor: '#fff',
		borderWidth: 1,
	},
	SlideButtonText: {
		fontSize: 15,
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
