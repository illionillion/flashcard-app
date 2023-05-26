import { FC } from "react";
import { Text, View, StyleSheet } from "react-native";


interface Props {
  text: string;
}

export const SlideButton: FC<Props> = (props) => {
  return (
    <View style={styles.button}>
      <Text style={styles.buttonText}>
        {props.text}
      </Text>
    </View>
  );
};


const headerColor = "#79BC6E";
const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: headerColor,
    width: 300,
    height: 50,
    margin: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});