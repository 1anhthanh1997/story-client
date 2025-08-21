import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
  FavoriteIcon,
  HomeIcon,
  LibraryIcon,
  PersonalIcon,
  SettingIcon,
} from "components/icons/BottomBarIcons";

interface TabItem {
  name: string;
  label: string;
  icon: React.ComponentType<{ color?: string }>;
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const tabs: TabItem[] = [
    { name: "Home", label: "Trang chủ", icon: HomeIcon },
    { name: "Library", label: "Thư viện", icon: LibraryIcon },
    { name: "Favorites", label: "Yêu thích", icon: FavoriteIcon },
    { name: "Profile", label: "Cá nhân", icon: PersonalIcon },
    { name: "Settings", label: "Cài đặt", icon: SettingIcon },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = state.index === index;
        const IconComponent = tab.icon;

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => navigation.navigate(tab.name)}
          >
            <View style={[styles.icon, isActive && styles.activeIcon]}>
              <IconComponent color={isActive ? "#3B82F6" : "#6B7280"} />
            </View>
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingBottom: 20,
    paddingTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  icon: { marginBottom: 4 },
  activeIcon: {},
  label: { fontSize: 12, color: "#999", textAlign: "center" },
  activeLabel: { color: "#007AFF", fontWeight: "500" },
});

export default BottomTabBar;
