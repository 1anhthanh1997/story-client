import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "../../constants/fonts";

const SettingsScreen = () => {
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [selectedThemeColor, setSelectedThemeColor] = useState("#3B82F6");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const themeColors = [
    "#3B82F6", // Blue (selected)
    "#EF4444", // Red
    "#10B981", // Green
    "#8B5CF6", // Purple
    "#F59E0B", // Orange
    "#EC4899", // Pink
  ];

  const renderSlider = (
    value: number,
    onValueChange: (value: number) => void,
    min: number,
    max: number,
    step: number,
    unit: string
  ) => (
    <View style={styles.sliderContainer}>
      <View style={styles.sliderTrack}>
        <View
          style={[
            styles.sliderFill,
            {
              width: `${((value - min) / (max - min)) * 100}%`,
            },
          ]}
        />
        <View
          style={[
            styles.sliderThumb,
            {
              left: `${((value - min) / (max - min)) * 100}%`,
            },
          ]}
        />
      </View>
      <Text style={styles.sliderValue}>
        {value}
        {unit}
      </Text>
    </View>
  );

  const renderColorSwatch = (color: string, isSelected: boolean) => (
    <TouchableOpacity
      key={color}
      style={[
        styles.colorSwatch,
        { backgroundColor: color },
        isSelected && styles.selectedColorSwatch,
      ]}
      onPress={() => setSelectedThemeColor(color)}
    >
      {isSelected && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <View style={styles.hamburgerIcon}>
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
          </View>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Vũ trụ truyện</Text>

        <TouchableOpacity style={styles.searchButton}>
          <View style={styles.searchIcon}>
            <View style={styles.searchCircle} />
            <View style={styles.searchHandle} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Display Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display Settings</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Text style={styles.iconText}>Tt</Text>
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Font Size</Text>
              {renderSlider(fontSize, setFontSize, 12, 24, 1, "px")}
            </View>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Text style={styles.iconText}>T↑↓</Text>
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Line Height</Text>
              {renderSlider(lineHeight, setLineHeight, 1.0, 2.5, 0.1, "")}
            </View>
          </View>
        </View>

        {/* Color Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color Settings</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Text style={styles.iconText}>🎨</Text>
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Theme Color</Text>
              <View style={styles.colorSwatches}>
                {themeColors.map((color) =>
                  renderColorSwatch(color, color === selectedThemeColor)
                )}
              </View>
            </View>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Text style={styles.iconText}>A</Text>
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Text Color</Text>
              <View style={styles.colorPreview}>
                <View
                  style={[styles.colorBar, { backgroundColor: "#000000" }]}
                />
              </View>
            </View>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Text style={styles.iconText}>🎨</Text>
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Background Color</Text>
              <View style={styles.colorPreview}>
                <View
                  style={[
                    styles.colorBar,
                    {
                      backgroundColor: "#FFFFFF",
                      borderWidth: 1,
                      borderColor: "#E0E0E0",
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Dark Mode Section */}
        <View style={styles.section}>
          <View style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <Text style={styles.iconText}>🌙</Text>
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
            </View>
            <TouchableOpacity
              style={[styles.toggle, isDarkMode && styles.toggleActive]}
              onPress={() => setIsDarkMode(!isDarkMode)}
            >
              <View
                style={[
                  styles.toggleThumb,
                  isDarkMode && styles.toggleThumbActive,
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  menuButton: {
    padding: 8,
  },
  hamburgerIcon: {
    width: 24,
    height: 18,
    justifyContent: "space-between",
  },
  hamburgerLine: {
    width: "100%",
    height: 2,
    backgroundColor: "#333",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: fonts.styleScriptRegular,
    textAlign: "center",
    flex: 1,
  },
  searchButton: {
    padding: 8,
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
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  iconText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sliderTrack: {
    flex: 1,
    height: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 2,
    marginRight: 16,
    position: "relative",
  },
  sliderFill: {
    height: "100%",
    backgroundColor: "#3B82F6",
    borderRadius: 2,
  },
  sliderThumb: {
    position: "absolute",
    width: 20,
    height: 20,
    backgroundColor: "#3B82F6",
    borderRadius: 10,
    top: -8,
    marginLeft: -10,
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sliderValue: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
    minWidth: 40,
    textAlign: "right",
  },
  colorSwatches: {
    flexDirection: "row",
    gap: 12,
  },
  colorSwatch: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedColorSwatch: {
    borderColor: "#3B82F6",
    borderWidth: 3,
  },
  checkmark: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  colorPreview: {
    marginTop: 4,
  },
  colorBar: {
    width: 60,
    height: 24,
    borderRadius: 4,
  },
  toggle: {
    width: 50,
    height: 28,
    backgroundColor: "#e0e0e0",
    borderRadius: 14,
    padding: 2,
    justifyContent: "center",
  },
  toggleActive: {
    backgroundColor: "#3B82F6",
  },
  toggleThumb: {
    width: 24,
    height: 24,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleThumbActive: {
    transform: [{ translateX: 22 }],
  },
});

export default SettingsScreen;
