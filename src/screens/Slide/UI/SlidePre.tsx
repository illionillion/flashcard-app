import { FC } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SlideButton } from "./Components/SlideButton";

interface SlidePreProps {
  handleGoBack: () => void;
  word_list: {
    id: number;
    word: string;
    meaning: string;
    example: string;
  }[];
  page: number;
  handlePageChange: (page: number) => void;
  isFront: boolean;
  handleFlip: () => void;
}

export const SlidePre: FC<SlidePreProps> = (props) => {
  const {
    handleGoBack,
    word_list,
    page,
    handlePageChange,
    isFront,
    handleFlip,
  } = props;

  return (
    <View style={styles.container}>

      <View style={styles.headline}>
        {
          isFront ?
            <Text style={styles.headline_text}>単語</Text> :
            <Text style={styles.headline_text}>意味・例文</Text>
        }
      </View>

      <View style={styles.slide}>
        <TouchableOpacity onPress={() => handlePageChange(page - 1)}>
          <Image source={require("./images/triangle_button_left.png")} />
        </TouchableOpacity>
        <View style={styles.content}>
          {/* 表なら単語、裏なら意味・例文 */}
          {
            isFront ?
              <Text style={styles.content_text}>
                {word_list[page - 1].word}
              </Text> :
              <Text style={styles.content_text}>
                意味: {word_list[page - 1].meaning + "\n"}
                例文: {word_list[page - 1].example + "\n"}
              </Text>
          }
        </View>
        <TouchableOpacity onPress={() => handlePageChange(page + 1)}>
          <Image source={require("./images/triangle_button_right.png")} />
        </TouchableOpacity>
      </View>

      <View style={styles.pagenation}>
        <Text>{page}/{word_list.length}</Text>
      </View>

      <TouchableOpacity onPress={() => handleFlip()}>
        <SlideButton text="切り替え" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleGoBack()}>
        <SlideButton text="終了" />
      </TouchableOpacity>
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
  headline_text: {
    fontSize: 30,
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
    width: 300,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: headerColor,
  },
  content_text: {
    fontSize: 20,
  },
});    
