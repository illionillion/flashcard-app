import { FC, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SlideButton } from "./Components/SlideButton";

interface Props {
}

export const SlidePre: FC<Props> = (props) => {
  const [page, setPage] = useState(1);
  const pageTotal = 8;

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
              <Text style={styles.content_text}>你好</Text> :
              <Text style={styles.content_text}>
                意味: こんにちは {"\n"}
                例文: 你好，我叫小明。{"\n"}
              </Text>
          }
        </View>
        <TouchableOpacity onPress={() => handlePageChange(page + 1)}>
          <Image source={require("./images/triangle_button_right.png")} />
        </TouchableOpacity>
      </View>

      <View style={styles.pagenation}>
        <Text>{page}/8</Text>
      </View>

      <TouchableOpacity onPress={() => setIsFront(!isFront)}>
        <SlideButton text="切り替え" />
      </TouchableOpacity>
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
