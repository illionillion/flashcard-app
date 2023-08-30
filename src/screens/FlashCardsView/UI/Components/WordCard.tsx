import type { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import type { WordDef } from '../../../../atom/FlashCardsDataState';

interface WordCardProps {
  item: WordDef;
  onPress: () => void;
}
export const WordCard: FC<WordCardProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={[styles.container, styles.shadow]} onPress={onPress}>
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.text}>{item.mean}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  text: {
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
