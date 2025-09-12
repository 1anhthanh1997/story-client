import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { GeneralSettingsIcon } from "components/icons";
interface ChapterNavigationBarProps {
  chapterNumber?: number;
  onPrevChapter: () => void;
  onNextChapter: () => void;
  onSettings: () => void;
}

const ChapterNavigationBar: React.FC<ChapterNavigationBarProps> = ({
  chapterNumber,
  onPrevChapter,
  onNextChapter,
  onSettings,
}) => {
  return (
    <View style={styles.chapterNavBar}>
      <TouchableOpacity style={styles.navButton} onPress={onPrevChapter}>
        <Text style={styles.navArrow}>←</Text>
        <Text style={styles.navText} numberOfLines={1}>
          {chapterNumber
            ? `Chương ${Math.max(1, chapterNumber - 1)}`
            : "Chương trước"}
        </Text>
      </TouchableOpacity>

      <View style={styles.middleActions}>
        <TouchableOpacity style={styles.actionIconButton} onPress={onSettings}>
          <GeneralSettingsIcon />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.navButton} onPress={onNextChapter}>
        <Text style={styles.navText} numberOfLines={1}>
          {chapterNumber ? `Chương ${chapterNumber + 1}` : "Chương tiếp"}
        </Text>
        <Text style={styles.navArrow}>→</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  chapterNavBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 12,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexShrink: 1,
  },
  navArrow: {
    fontSize: 16,
    color: "#333",
  },
  navText: {
    fontSize: 14,
    color: "#333",
  },
  middleActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  actionIconButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "#f7f7f7",
  },
  actionIconText: {
    fontSize: 16,
    color: "#333",
  },
});

export default ChapterNavigationBar;
