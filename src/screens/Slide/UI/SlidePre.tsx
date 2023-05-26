import { FC, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SlideButton } from "./Components/SlideButton";

interface Props {
}

export const SlidePre: FC<Props> = (props) => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };

  const word_list = [
    {
      id: 1,
      word: "你好",
      meaning: "こんにちは",
      example: "你好，我叫小明。",
    },
    {
      id: 2,
      word: "是",
      meaning: "肯定",
      example: "我是日本人。",
    },
    {
      id: 3,
      word: "不",
      meaning: "否定",
      example: "我不是日本人。",
    },
    {
      id: 4,
      word: "我",
      meaning: "私",
      example: "我是日本人。",
    },
    {
      id: 5,
      word: "你",
      meaning: "あなた",
      example: "你是日本人。",
    },
    {
      id: 6,
      word: "他",
      meaning: "彼",
      example: "他是日本人。",
    },
  ];

  const [page, setPage] = useState(1);
  const pageTotal = word_list.length;


  // 表裏
  const [isFront, setIsFront] = useState(true);

  const handlePageChange = (page: number) => {
    if (page < 1) {
      setPage(1);
    } else if (page > pageTotal) {
      setPage(pageTotal);
    } else {
      setPage(page);
    }
  };



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
                {word_list[page - 1].word + "\n"}
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
        <Text>{page}/{pageTotal}</Text>
      </View>

      <TouchableOpacity onPress={() => setIsFront(!isFront)}>
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
