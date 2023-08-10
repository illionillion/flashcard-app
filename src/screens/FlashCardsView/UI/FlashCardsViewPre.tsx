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
  setWordsData: Dispatch<SetStateAction<WordDef[]>>;
  handleNameChanged: (text: string) => void;
  handleAdd: () => void;
  handleSave: () => void;
  onPressToSlide: () => void;
  OpenCreateExampleErrorMessage: (result: generateExampleReturn) => void;
}

export const FlashCardsViewPre: FC<FlashCardsListPreProps> = (props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
	const [activeId, setActiveId] = useState<number | null>(null);

	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	const handleEditOpen = () => {
		setIsEditOpen(true);
	};

	const handleEditClose = () => {
		setIsEditOpen(false);
	};
	
	const {
		flashcardName,
		buttonDisable,
		wordsData,
		handleNameChanged,
		handleAdd,
		handleSave,
		setWordsData,
		onPressToSlide,
		OpenCreateExampleErrorMessage,
	} = props;

	const handleAddNewWord = (newWord: WordDef) => {
		setWordsData((prev) => [...prev, newWord]);
	};

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
								setWordsData={setWordsData}
								OpenCreateExampleErrorMessage={OpenCreateExampleErrorMessage}
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
				isOpen={isOpen}
				handleClose={handleClose}
				handleAddNewWord={handleAddNewWord}
				OpenCreateExampleErrorMessage={OpenCreateExampleErrorMessage}
			/>
			{/* {activeId !== null && ( */}
				<EditWordModal
					isEditOpen={isEditOpen}
					handleEditClose={handleEditClose}
					item={wordsData.find((item) => item.id === activeId || {})}
					setWordsData={setWordsData}
				/>
			{/* )} */}
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
