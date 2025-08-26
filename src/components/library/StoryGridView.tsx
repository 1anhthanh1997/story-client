import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const StoryGridView = ({ stories }: { stories: any }) => {
  return (
    <View style={styles.storiesGrid}>
      {stories.map((story: any) => (
        <View key={story.id} style={styles.storyItem}>
          {/* Cover Image */}
          <View
            style={[styles.coverImage, { backgroundColor: story.coverColor }]}
          >
            <Text style={styles.coverPlaceholder}>📚</Text>

            {/* Progress Bar */}
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
          </View>

          {/* Story Info */}
          <View style={styles.storyInfoContainer}>
            <Text style={styles.storyTitle} numberOfLines={2}>
              {story.title}
            </Text>
            <Text style={styles.storyAuthor} numberOfLines={1}>
              {story.author}
            </Text>
          </View>

          {/* Status Button */}
          {/* <View style={styles.statusButtonContainer}>
            <View
              style={[
                styles.statusButton,
                { borderColor: getStatusColor(story.status) },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: getStatusColor(story.status) },
                ]}
              >
                {getStatusText(story.status)}
              </Text>
            </View>          
          </View> */}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  storiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 4,
    gap: 8,
    rowGap: 12,
  },
  storyItem: {
    width: "31.8%",
    // width: "48.2%",
    // marginBottom: 10,
    // backgroundColor: "red",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    // padding: 8,
  },
  coverImage: {
    width: "100%",
    height: 145,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  coverPlaceholder: {
    fontSize: 24,
  },
  progressContainer: {
    position: "absolute",
    bottom: 4,
    left: 8,
    right: 8,
    zIndex: 1,
  },
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
  storyTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
    lineHeight: 18,
    height: 36,
    textAlign: "center",
  },
  storyAuthor: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
    textAlign: "center",
  },
  statusButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
  },
  lastReadText: {
    fontSize: 10,
    // color: "#fff",
    marginTop: 2,
    opacity: 0.9,
  },
  statusButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  storyInfoContainer: {
    paddingHorizontal: 4,
  },
});

export default StoryGridView;
