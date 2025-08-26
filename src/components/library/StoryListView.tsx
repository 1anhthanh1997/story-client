import { STORY_LAYOUT_TYPE } from "constants/layout";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

interface Story {
  id: number;
  title: string;
  author: string;
  coverImage: string;
  lastRead: string;
  status: "reading" | "completed" | "unread";
  progress: number;
  currentChapter: number;
  totalChapters: number;
  rating?: number;
}

interface StoryListViewProps {
  stories: Story[];
  onStoryPress?: (story: Story) => void;
  type: string;
}

const StoryListView: React.FC<StoryListViewProps> = ({
  stories,
  type,
  onStoryPress,
}) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {stories.map((story) => (
        <TouchableOpacity
          key={story.id}
          style={styles.storyItem}
          onPress={() => onStoryPress?.(story)}
          activeOpacity={0.7}
        >
          {/* Cover Image/Illustration */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: story.coverImage }}
              style={styles.storyImage}
              resizeMode="cover"
            />
          </View>

          {/* Story Information */}
          <View style={styles.storyInfo}>
            <Text style={styles.storyTitle} numberOfLines={2}>
              {story.title}
            </Text>
            <Text style={styles.storyAuthor} numberOfLines={1}>
              {story.author}
            </Text>
            {/* Progress indicator for reading status */}
            {type === STORY_LAYOUT_TYPE.LIBRARY && (
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${story.progress}%`,
                        backgroundColor:
                          story.status === "completed" ? "#10B981" : "#007AFF",
                      },
                    ]}
                  />
                </View>
                <View style={styles.progressText}>
                  <Text style={styles.progressNumbers}>
                    {`${story.currentChapter}/${story.totalChapters}`}
                  </Text>
                  <Text style={styles.progressPercent}>{story.progress}%</Text>
                </View>
              </View>
            )}
            <Text style={styles.lastReadText}>
              Đọc lần cuối: {story.lastRead || "Chưa đọc"}
            </Text>
            {type === STORY_LAYOUT_TYPE.FAVORITES && (
              <View style={styles.ratingContainer}>
                <Text style={styles.starIcon}>★</Text>
                <Text style={styles.ratingText}>{story.rating || 0}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  storyItem: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  imageContainer: {
    position: "relative",
    marginRight: 16,
  },
  storyImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
    backgroundColor: "#2A2A2A",
  },
  storyInfo: {
    flex: 1,
    paddingVertical: 4,
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
    lineHeight: 20,
  },
  storyAuthor: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
    lineHeight: 18,
  },
  lastReadText: {
    fontSize: 13,
    color: "#8E8E93",
    marginTop: 8,
    lineHeight: 16,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusBadge: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  progressContainer: {},
  progressBar: {
    height: 6,
    backgroundColor: "#e5e7eb",
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressNumbers: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  progressPercent: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  starIcon: {
    fontSize: 16,
    color: "#FFD700",
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
});

export default StoryListView;
