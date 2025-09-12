import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface Chapter {
  _id: string;
  title: string;
  chapterNumber: number;
  wordCount: number;
  readingTime: string;
  isRead: boolean;
  isLocked: boolean;
  publishedDate: string;
}

interface ChaptersListProps {
  chapters: Chapter[];
  storyId: string;
}

const ChaptersList: React.FC<ChaptersListProps> = ({ chapters, storyId }) => {
  const navigation = useNavigation();

  const handleChapterPress = (chapterId: string) => {
    navigation.navigate("Reading", {
      chapterId,
      storyId,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Danh sách chương</Text>
      <View style={styles.chaptersList}>
        {chapters.map((chapter) => (
          <TouchableOpacity
            key={chapter._id}
            style={[
              styles.chapterItem,
              chapter.isRead && styles.chapterItemRead,
              chapter.isLocked && styles.chapterItemLocked,
            ]}
            onPress={() => {
              if (!chapter.isLocked) {
                handleChapterPress(chapter._id);
              }
            }}
            disabled={chapter.isLocked}
          >
            <View style={styles.chapterInfo}>
              <Text
                style={[
                  styles.chapterTitle,
                  chapter.isRead && styles.chapterTitleRead,
                  chapter.isLocked && styles.chapterTitleLocked,
                ]}
              >
                {chapter.title}
              </Text>
              <View style={styles.chapterMeta}>
                <Text style={styles.chapterMetaText}>
                  {chapter.wordCount} từ • {chapter.readingTime}
                </Text>
                <Text style={styles.chapterMetaText}>
                  {chapter.publishedDate}
                </Text>
              </View>
            </View>
            <View style={styles.chapterStatus}>
              {chapter.isRead && (
                <View style={styles.readIndicator}>
                  <Text style={styles.readIndicatorText}>✓</Text>
                </View>
              )}
              {chapter.isLocked && <Text style={styles.lockedText}>🔒</Text>}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  chaptersList: {
    gap: 12,
  },
  chapterItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  chapterItemRead: {
    backgroundColor: "#f8f9fa",
    borderColor: "#28a745",
  },
  chapterItemLocked: {
    backgroundColor: "#f5f5f5",
    borderColor: "#ccc",
    opacity: 0.6,
  },
  chapterInfo: {
    flex: 1,
  },
  chapterTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  chapterTitleRead: {
    color: "#28a745",
  },
  chapterTitleLocked: {
    color: "#999",
  },
  chapterMeta: {
    flexDirection: "row",
    gap: 12,
  },
  chapterMetaText: {
    fontSize: 12,
    color: "#666",
  },
  chapterStatus: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 40,
  },
  readIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#28a745",
    alignItems: "center",
    justifyContent: "center",
  },
  readIndicatorText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  lockedText: {
    fontSize: 16,
    color: "#999",
  },
});

export default ChaptersList;
