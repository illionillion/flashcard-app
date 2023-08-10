import { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface SlideButtonProps {
  text: string;
  onPress: () => void;
}

export const SlideButton: FC<SlideButtonProps> = (props) => {
  const { text, onPress } = props;

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#79BC6E',
    width: 300,
    height: 48,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});
