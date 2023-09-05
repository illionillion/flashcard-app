import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { FC } from 'react';
import type StackParamList from '../StackParamList';
import { FlashCardsListCon } from '../screens/FlashCardsList/UI/FlashCardsListCon';
import { FlashCardsViewCon } from '../screens/FlashCardsView/UI/FlashCardsViewCon';
import { SlideCon } from '../screens/Slide/UI/SlideCon';
import { Button } from 'react-native';
import type { FlashCardsDef } from '../atom/FlashCardsDataState';
import { FlashCardsDataState } from '../atom/FlashCardsDataState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Platform } from 'react-native';

export const FlashCardsListNavigate: FC = () => {
  let data = useRecoilValue<FlashCardsDef[]>(FlashCardsDataState);
  const setData = useSetRecoilState(FlashCardsDataState);
  // useStateで昇順か降順かを管理して
  // この関数を降順のソートをできるようにする
  const handleSort = () => {
    data = [...data].sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else {
        return 1;
      }
    });
    setData(data);
  };

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#79BC6E', // ヘッダーの背景色を指定
          elevation: 0, // ヘッダーの上部の余白を除去
        },
        headerTintColor: 'white', // ヘッダーのテキスト色を指定
        headerTitleAlign: 'center',
        headerStatusBarHeight: 0, // ヘッダーの上部の余白を除去
      })}
    >
      <Stack.Screen
        name="FlashCardsList"
        component={FlashCardsListCon}
        options={{
          title: '単語帳一覧',
          headerRight: () => (
            <Button title='名前順' color={Platform.OS === 'ios' ? 'white' : '#79BC6E'
            }
            onPress={() => handleSort()} />
          )
        }}
      />
      <Stack.Screen
        name="FlashCardsView"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error 後で型を合わせる
        component={FlashCardsViewCon}
        options={({ route }) => ({
          title: (route.params as StackParamList['FlashCardsView']).data.name || '',
        })}
      />
      <Stack.Screen
        name="Slide"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error 後で型を合わせる
        component={SlideCon}
        options={({ route }) => ({
          title: (route.params as StackParamList['Slide']).title
            ? `${(route.params as StackParamList['Slide']).title} - スライド`
            : 'スライド',
        })}
      />
    </Stack.Navigator>
  );
};
