import type { Dispatch, FC, SetStateAction } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import type { WordDef } from '../../../atom/FlashCardsDataState';
import { AddWordButton } from './Components/AddWordButton';
import { EditWordButton } from './Components/EditWordButton';

export interface FlashCardsListPreProps {
  flashcardName: string;
  wordsData: WordDef[];
  handleNameChanged: (text: string) => void;
  setWordsData: Dispatch<SetStateAction<WordDef[]>>;
  onPressToSlide: () => void;
  handleSave: () => void;
}

export const FlashCardsViewPre: FC<FlashCardsListPreProps> = (props) => {
  const { flashcardName, wordsData, handleNameChanged, setWordsData, onPressToSlide, handleSave } =
    props;
  return (
    <>
      <View style={styles.FlashCardsContainer}>
        <View style={styles.FlashCardsTitleContainer}>
          <TextInput
            value={flashcardName}
            placeholder="単語帳名を入力"
            style={styles.FlashCardsTitleInput}
            onChangeText={handleNameChanged}
          />
        </View>
        <ScrollView
          contentContainerStyle={styles.FlashScrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {wordsData.map((item) => (
            <EditWordButton key={item.id} item={item} setWordsData={setWordsData} />
          ))}
        </ScrollView>
        <View style={styles.FlashCardsBottom}>
          <TouchableOpacity
            style={{ ...styles.SaveButton, ...styles.ButtonCommon }}
            disabled={flashcardName.trim() === ''}
            onPress={handleSave}
          >
            <Text style={styles.SaveButtonText}>保存する</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.SlideButton, ...styles.ButtonCommon }}
            disabled={wordsData.length === 0 ? true : false}
            onPress={onPressToSlide}
          >
            <Text style={styles.SlideButtonText}>スライドショー</Text>
          </TouchableOpacity>
          <AddWordButton wordsData={wordsData} setWordsData={setWordsData} />
        </View>
      </View>
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
    alignItems: 'center',
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
});
