import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { FlashCardsListCon } from "./FlashCardsList/FlashCardsListCon";
import { FlashCardsCreateCon } from "./FlashCardsCreate/FlashCardsCreateCon";
import { SearchCon } from "./Search/SearchCon";
import { SettingCon } from "./Setting/SettingCon";

export const BottomTabNavigate = () => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "gray",
          headerStyle: {
            backgroundColor: "#79BC6E", // ヘッダーの背景色を指定
          },
          headerTintColor: "white", // ヘッダーのテキスト色を指定
        })}
      >
        <Tab.Screen
          name="Home"
          component={FlashCardsListCon}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-home" size={size} color={color} />
            ),
            title: "単語帳一覧",
            // headerShown: false,
          }}
        />
        <Tab.Screen
          name="Create"
          component={FlashCardsCreateCon}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-outline" size={size} color={color} />
            ),
            title: "単語帳作成",
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchCon}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search-outline" size={size} color={color} />
            ),
            title: "単語検索",
          }}
        />
        <Tab.Screen
          name="Setting"
          component={SettingCon}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="md-settings-outline" size={size} color={color} />
            ),
            title: "設定",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
