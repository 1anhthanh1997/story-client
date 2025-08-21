import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { fonts } from "../../constants/fonts";
import { MenuIcon } from "../icons";
import SideDrawer from "./SideDrawer";

interface HeaderProps {
  title: string;
  onMenuPress?: () => void;
  onSearchPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  onMenuPress,
  onSearchPress,
}) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const handleMenuPress = () => {
    setIsDrawerVisible(true);
    if (onMenuPress) {
      onMenuPress();
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerVisible(false);
  };

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleMenuPress}>
          <MenuIcon />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{title}</Text>

        <TouchableOpacity style={styles.headerButton} onPress={onSearchPress}>
          <View style={styles.searchIcon}>
            <View style={styles.searchCircle} />
            <View style={styles.searchHandle} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Bottom border line */}
      <View style={styles.headerBorder} />

      {/* Side Drawer */}
      <SideDrawer isVisible={isDrawerVisible} onClose={handleCloseDrawer} />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#fff",
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: fonts.styleScriptRegular,
    textAlign: "center",
    flex: 1,
  },
  searchIcon: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  searchCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#333",
    position: "absolute",
  },
  searchHandle: {
    width: 8,
    height: 2,
    backgroundColor: "#333",
    position: "absolute",
    right: 2,
    top: 18,
    transform: [{ rotate: "45deg" }],
  },
  headerBorder: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 0,
  },
});

export default Header;
