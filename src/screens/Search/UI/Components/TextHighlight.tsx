import { FC } from "react";
import { StyleSheet, Text } from "react-native";

interface TextHighlightProps {
  cardName: string;
  searchValue: string;
}

export const TextHighlight: FC<TextHighlightProps> = ({ cardName, searchValue }) => {
  return (
    <Text style={styles.itemText}>
      {(() => {
        const str = cardName;
        if (str.toLocaleLowerCase() === searchValue.toLowerCase()) {
          return <Text style={styles.highlight}>{str}</Text>;
        }

        const patternStr = searchValue; // 動的なパターンを表す文字列
        const pattern = new RegExp(`(${patternStr})`, "gi");
        const resultArr = str.split(pattern).filter(Boolean);

        const resultEle = resultArr.map((item, index) => {
          if (item.toLocaleLowerCase() === searchValue.toLocaleLowerCase()) {
            // itemがsearchValueとマッチするか
            return (
              <Text key={index} style={styles.highlight}>
                {item}
              </Text>
            );
          } else {
            return <Text key={index}>{item}</Text>;
          }
        });

        return resultEle;
      })()}
    </Text>
  );
};

const styles = StyleSheet.create({
  itemText: {
    paddingLeft: 8,
    width: "40%",
    fontSize: 16,
  },
  highlight: {
    color: "red",
  },
});
