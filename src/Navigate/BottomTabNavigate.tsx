import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { FlashCardListCon } from "../screens/FlashCardList/UI/FlashCardListCon";
import { FlashCardCreateCon } from "../screens/FlashCardCreate/UI/FlashCardCreateCon";
import { SearchCon } from "../screens/Search/UI/SearchCon";
import { SettingCon } from "../screens/Setting/UI/SettingCon";


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
          component={FlashCardListCon}
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
          component={FlashCardCreateCon}
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
