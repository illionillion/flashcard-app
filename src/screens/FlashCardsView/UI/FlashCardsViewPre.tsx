import { RouteProp } from "@react-navigation/native";
import { FC } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import StackParamList from "../../../StackParamList";
import { Ionicons } from "@expo/vector-icons";

export interface FlashCardsListPreProps {
  route: RouteProp<any, any>;
}
export const FlashCardsViewPre: FC<FlashCardsListPreProps> = (props) => {
  const { route } = props;
  return (
    <View style={styles.FlashCardsContainer}>
      <View style={styles.FlashCardsTitleContainer}>
        <TextInput
          defaultValue={
            (route?.params as StackParamList["FlashCardsView"]).title
          }
          placeholder="単語帳名を入力"
          style={styles.FlashCardsTitleInput}
        />
      </View>
      {/* ここにスクロールビュー */}
      <View style={styles.FlashCardsBottom}>
        <TouchableOpacity style={{...styles.SaveButton, ...styles.ButtonCommon}}>
          <Text style={styles.SaveButtonText}>保存する</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.SlideButton, ...styles.ButtonCommon}}>
          <Text style={styles.SlideButtonText}>スライドショー</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.PlusButton}>
          <Ionicons name="add" size={20} color="#fff"/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  FlashCardsContainer: {
    position: "relative",
    flex: 1,
  },
  FlashCardsTitleContainer: {
    paddingTop: 37,
    paddingBottom: 6,
    paddingHorizontal: 28,
  },
  FlashCardsTitleInput: {
    paddingHorizontal: 18,
    height: 38,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#000",
    borderRadius: 5,
    fontSize: 20,
  },
  FlashCardsBottom: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    gap: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  ButtonCommon: {
    width: 130,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  SaveButton: {
    backgroundColor: "#5FA1DE",
  },
  SaveButtonText: {
    color: "#fff",
    fontSize: 15,
  },
  SlideButton: {
    backgroundColor: "#D9D9D9",
  },
  SlideButtonText: {
    fontSize: 15,
  },
  PlusButton: {
    backgroundColor: "#599D4D",
    justifyContent: "center",
    alignItems: "center",
    width: 53,
    height: 53,
    borderRadius: 50,
  }

});
