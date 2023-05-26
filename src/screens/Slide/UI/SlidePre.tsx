import { FC } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { SlideButton } from "./Components/SlideButton";

interface Props {
  content: string;
}

export const SlidePre: FC<Props> = (props) => {
  return (
    <View style={styles.container}>

      <View style={styles.headline}>
        <Text>見出し</Text>
      </View>

      <View style={styles.slide}>
        <Image source={require("./images/triangle_button_left.png")} />
        <View style={styles.content}>
          <Text style={styles.content_text}>
            {props.content}
          </Text>
        </View>
        <Image source={require("./images/triangle_button_right.png")} />
      </View>

      <View style={styles.pagenation}>
        <Text>2/8</Text>
      </View>

      <SlideButton text="切り替え" />
      <SlideButton text="終了" />
    </View>
  );
};

const headerColor = "#79BC6E";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  headline: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  slide: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
  },
  pagenation: {
    justifyContent: "center",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "80%",
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: headerColor,
  },
  content_text: {
    fontSize: 20,
  },
});    
