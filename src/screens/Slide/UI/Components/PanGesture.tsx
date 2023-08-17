/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC, ReactNode, RefObject } from 'react';
import { StyleSheet } from 'react-native';
import type {
  HandlerStateChangeEvent,
  ScrollView} from 'react-native-gesture-handler';
import {
  GestureHandlerRootView,
  PanGestureHandler
} from 'react-native-gesture-handler';

interface PanGestureProps {
  children: ReactNode;
  page: number;
  swipePagenation: RefObject<unknown>;
  scrollText: RefObject<ScrollView>;
  handlePageChange: (page: number) => void;
}

export const PanGesture: FC<PanGestureProps> = ({
  children,
  page,
  swipePagenation,
  scrollText,
  handlePageChange,
}) => {
  const velocityThreshold = 0.3;
  const directionalOffsetThreshold = 80;

  const isValidSwipe = (velocity: number, directionalOffset: number) => {
    return (
      Math.abs(velocity) > velocityThreshold &&
      Math.abs(directionalOffset) < directionalOffsetThreshold
    );
  };

  const onPanGestureEvent = (event: HandlerStateChangeEvent<any>) => {
    const { nativeEvent } = event;
    if (Math.abs(nativeEvent.velocityY) > 300) {
      return;
    }
    if (!isValidSwipe(nativeEvent.velocityX, nativeEvent.translationX)) {
      return;
    }

    if (nativeEvent.velocityX > 0) {
      handlePageChange(page - 1);
    } else {
      handlePageChange(page + 1);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler
        ref={swipePagenation}
        simultaneousHandlers={scrollText}
        onActivated={onPanGestureEvent}
      >
        {children}
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
