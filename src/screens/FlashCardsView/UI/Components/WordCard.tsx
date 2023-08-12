import { StyleSheet, Text, View } from 'react-native';
import { WordDef } from '../../../../atom/FlashCardsDataState';
import { FC } from 'react';

interface WordCardProps {
  item: WordDef;
}
export const WordCard: FC<WordCardProps> = ({
  item,
}) => {
  return (
    <>
      <View style={styles.container}>
          <View style={styles.WordCard}>
            <View style={styles.row}>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.text}>{item.mean}</Text>
            </View>
          </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  WordCard: {
    flex: 1,
    width: '80%',
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
    marginVertical: 5,
    marginHorizontal: '10%',
    paddingHorizontal: 20,
    paddingTop: 11,
    position: 'relative',
  },
  row: {
    paddingBottom: 12,
    gap: 8,
  },
  text: {
    flex: 0.5,
    paddingHorizontal: 8,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 15,
  }
});
