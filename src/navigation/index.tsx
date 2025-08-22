import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { RootStackParamList, MainTabParamList } from "../types/navigation";

// Import screens
import HomeScreen from "../screens/Home/HomeScreen";
import SplashScreen from "../screens/Splash/SplashScreen";
import LibraryScreen from "../screens/Library/LibraryScreen";
import AllStoryScreen from "../screens/AllStory/AllStoryScreen";

// Import custom bottom tab bar
import BottomTabBar from "../components/common/BottomTabBar";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Import missing screens
import FavoritesScreen from "../screens/Favorites/FavoritesScreen";
import PersonalScreen from "../screens/Profile/PersonalScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <BottomTabBar {...props} />} // ✅ Pass props
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={PersonalScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen
        name="AllStory"
        component={AllStoryScreen}
        options={{
          tabBarButton: () => null, // Hide this tab from bottom bar
        }}
      />
    </Tab.Navigator>
  );
};

export const Navigation = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
