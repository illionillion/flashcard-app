import { AntDesign, Ionicons } from '@expo/vector-icons';
import { FC, RefObject } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView as GhScrollView, ScrollView } from 'react-native-gesture-handler';
import { WordDef } from '../../../atom/FlashCardsDataState';
import { PanGesture } from './Components/PanGesture';
import { SlideButton } from './Components/SlideButton';

interface SlidePreProps {
  page: number;
  word_list: WordDef[];
  isFront: boolean;
  isSpeaking: boolean;
  swipePagination: RefObject<unknown>;
  scrollText: RefObject<ScrollView>;
  handleFlip: () => void;
  handlePageChange: (page: number) => void;
  handlePressSadIcon: (word: WordDef) => void;
  handlePressHappyIcon: (word: WordDef) => void;
  openIconDescription: (desc: string) => void;
  handlePressSpeaker: (text: string, langCode: string) => void;
}

const headerColor = '#79BC6E';
export const SlidePre: FC<SlidePreProps> = (props) => {
  const {
    page,
    word_list,
    isFront,
    isSpeaking,
    swipePagination,
    scrollText,
    handleFlip,
    handlePageChange,
    handlePressSadIcon,
    handlePressHappyIcon,
    openIconDescription,
    handlePressSpeaker,
  } = props;
  const { name, mean, example, exTrans, langCode, proficiency } = word_list[page];

  return (
    <View style={styles.container}>
      <PanGesture
        page={page}
        handlePageChange={handlePageChange}
        swipePagination={swipePagination}
        scrollText={scrollText}
      >
        <View style={styles.slideContainer}>
          <TouchableOpacity onPress={() => handlePageChange(page - 1)}>
            <AntDesign name="caretleft" size={32} color={headerColor} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleFlip} style={[styles.slide, styles.shadow]}>
            {/* 表なら単語、裏なら意味・例文 */}
            {isFront ? (
              <View style={styles.frontContent}>
                <Text style={[styles.headline, styles.lightGray]}>単語</Text>
                <Text style={styles.word_text}>{name}</Text>
              </View>
            ) : (
              <View style={styles.backContent}>
                <View style={styles.mArea}>
                  <Text style={[styles.headline, styles.lightGray]}>意味</Text>
                  <Text style={styles.mean_text}>{mean}</Text>
                </View>
                <View style={styles.eArea}>
                  <Text style={[styles.headline, styles.lightGray]}>例文</Text>
                  <GhScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    ref={scrollText}
                    simultaneousHandlers={swipePagination}
                  >
                    <View onStartShouldSetResponder={() => true}>
                      <Text style={styles.example_text}>{example}</Text>
                      <Text style={styles.example_text}>{exTrans}</Text>
                    </View>
                  </GhScrollView>
                </View>
              </View>
            )}

            {/* 音声読み上げアイコン */}
            <TouchableOpacity
              onPress={() => handlePressSpeaker(isFront ? name : example, langCode)}
              style={styles.speakerContainer}
            >
              <Ionicons
                name="volume-medium-outline"
                size={32}
                style={isSpeaking ? styles.green : styles.lightGray}
              />
            </TouchableOpacity>

            {/* 暗記チェックアイコン */}
            <View style={styles.faceIconContainer}>
              <TouchableOpacity
                onPress={() => handlePressSadIcon(word_list[page])}
                onLongPress={() => openIconDescription('にがて')}
              >
                <Ionicons
                  name="sad-outline"
                  size={28}
                  style={proficiency === 'unfamiliar' ? styles.blue : styles.lightGray}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handlePressHappyIcon(word_list[page])}
                onLongPress={() => openIconDescription('おぼえた！')}
                style={styles.marginLeft}
              >
                <Ionicons
                  name="happy-outline"
                  size={28}
                  style={proficiency === 'mastered' ? styles.orange : styles.lightGray}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handlePageChange(page + 1)}>
            <AntDesign name="caretright" size={32} color={headerColor} />
          </TouchableOpacity>
        </View>
      </PanGesture>

      <Text style={styles.page_text}>
        {page + 1}/{word_list.length}
      </Text>

      <SlideButton text="切り替え" onPress={handleFlip} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideContainer: {
    marginTop: 12,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  slide: {
    width: '70%',
    height: 360,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: headerColor,
    borderRadius: 10,
  },
  frontContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backContent: {
    height: '100%',
    width: '100%',
  },
  headline: {
    fontSize: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 8,
  },
  mArea: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 24,
  },
  eArea: {
    height: 220,
    paddingVertical: 36,
    paddingHorizontal: 8,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  word_text: {
    fontSize: 32,
  },
  mean_text: {
    fontSize: 24,
  },
  example_text: {
    fontSize: 20,
  },
  speakerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 8,
  },
  faceIconContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 8,
  },
  page_text: {
    fontSize: 16,
    lineHeight: 32, // 上下を均等にする
  },
  lightGray: {
    color: 'lightgray',
  },
  green: {
    color: headerColor,
  },
  blue: {
    color: '#659AD2',
  },
  orange: {
    color: '#ED9E31',
  },
  marginLeft: {
    marginLeft: 6,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
});
