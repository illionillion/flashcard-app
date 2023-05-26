import { FC, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SlideButton } from "./Components/SlideButton";

interface Props {
}

export const SlidePre: FC<Props> = (props) => {
  const [page, setPage] = useState(1);
  const pageTotal = 8;

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
        <Text style={styles.headline_text}>見出し</Text>
      </View>

      <View style={styles.slide}>
        <TouchableOpacity onPress={() => handlePageChange(page - 1)}>
          <Image source={require("./images/triangle_button_left.png")} />
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.content_text}>
            コンテンツ
          </Text>
        </View>
        <TouchableOpacity onPress={() => handlePageChange(page + 1)}>
          <Image source={require("./images/triangle_button_right.png")} />
        </TouchableOpacity>
      </View>

      <View style={styles.pagenation}>
        <Text>{page}/8</Text>
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
