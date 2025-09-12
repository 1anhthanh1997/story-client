import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../types/navigation";
import Layout from "components/common/Layout";
import {
  BackIcon,
  ShareIcon,
  //   SettingsIcon,
  //   BookmarkIcon,
  //   FontSizeIcon,
} from "../../components/icons";
import { getChapterById } from "../../api/chapter";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import ChapterNavigationBar from "../../components/reading/ChapterNavigationBar";

const { width, height } = Dimensions.get("window");

type ReadingScreenProps = NativeStackScreenProps<RootStackParamList, "Reading">;

const ReadingScreen: React.FC<ReadingScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { chapterId, chapterIds } = route.params;
  const { width } = useWindowDimensions();

  const [chapter, setChapter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState(20);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Mock chapter data

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        setLoading(true);
        setError(null);
        // Use mock data for now
        const response: any = await getChapterById(chapterId);
        setChapter(response.data);
      } catch (err) {
        setError("Không thể tải nội dung chương");
        console.error("Error fetching chapter:", err);
      } finally {
        setLoading(false);
      }
    };

    if (chapterId) {
      fetchChapter();
    }
  }, [chapterId]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleShare = () => {
    Alert.alert("Chia sẻ", "Tính năng chia sẻ sẽ được cập nhật sớm");
  };

  const handleSettings = () => {
    Alert.alert("Cài đặt", "Tính năng cài đặt sẽ được cập nhật sớm");
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
  };

  const handleToggleControls = () => {
    setShowControls(!showControls);
  };

  const handlePrevChapter = () => {
    let prevChapterId = chapterIds.indexOf(chapterId) - 1;
    if (prevChapterId >= 0) {
      // Navigate to previous chapter if backend provides the id
      (navigation as any).navigate("Reading", {
        chapterId: chapterIds[prevChapterId],
        chapterIds,
      });
    } else {
      Alert.alert("Thông báo", "Đây là chương đầu tiên");
    }
  };

  const handleNextChapter = () => {
    let nextChapterId = chapterIds.indexOf(chapterId) + 1;
    if (nextChapterId < chapterIds.length) {
      // Navigate to next chapter if backend provides the id
      (navigation as any).navigate("Reading", {
        chapterId: chapterIds[nextChapterId],
        chapterIds,
      });
    } else {
      Alert.alert("Thông báo", "Đây là chương cuối cùng");
    }
  };

  // HTML rendering configuration
  const htmlConfig = {
    contentWidth: width - 40, // Account for padding
    tagsStyles: {
      p: {
        fontSize: fontSize + 4, // Further increase paragraph font size
        lineHeight: (fontSize + 4) * 1.8,
        color: "#333",
        textAlign: "justify" as const,
        marginBottom: 20,
      },
      h1: {
        fontSize: fontSize + 10, // Increase heading font sizes
        fontWeight: "bold" as const,
        color: "#333",
        marginBottom: 20,
        marginTop: 12,
      },
      h2: {
        fontSize: fontSize + 8,
        fontWeight: "bold" as const,
        color: "#333",
        marginBottom: 16,
        marginTop: 10,
      },
      h3: {
        fontSize: fontSize + 6,
        fontWeight: "bold" as const,
        color: "#333",
        marginBottom: 12,
        marginTop: 8,
      },
      strong: {
        fontWeight: "bold" as const,
        fontSize: fontSize + 4, // Make bold text larger
      },
      em: {
        fontStyle: "italic" as const,
        fontSize: fontSize + 3, // Make italic text larger
      },
      br: {
        marginBottom: 12, // Increase spacing for line breaks
      },
      // Add styling for text content without specific tags
      body: {
        fontSize: fontSize + 4,
        lineHeight: (fontSize + 4) * 1.8,
        color: "#333",
        textAlign: "justify" as const,
      },
    },
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Đang tải nội dung...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => setError(null)}
          >
            <Text style={styles.retryButtonText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!chapter) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Không tìm thấy nội dung chương</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Layout>
      {/* Header */}
      {showControls && (
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
            <BackIcon />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.chapterTitle} numberOfLines={1}>
              {chapter.title}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleBookmark}
            >
              {/* <BookmarkIcon color={isBookmarked ? "#FF6B6B" : "#666"} /> */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
              <ShareIcon />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleSettings}
            >
              {/* <SettingsIcon /> */}
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Reading Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onTouchStart={handleToggleControls}
      >
        <View style={styles.contentContainer}>
          <RenderHtml
            contentWidth={htmlConfig.contentWidth}
            tagsStyles={htmlConfig.tagsStyles}
            source={{ html: chapter.content }}
          />
        </View>
      </ScrollView>

      {/* Bottom Controls */}
      {showControls && (
        <View style={styles.bottomControls}>
          <ChapterNavigationBar
            chapterNumber={chapter?.chapterNumber}
            onPrevChapter={handlePrevChapter}
            onNextChapter={handleNextChapter}
            onSettings={handleSettings}
          />
        </View>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // Header styles
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerButton: {
    padding: 8,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  chapterTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  // Content styles
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 28,
    color: "#333",
    textAlign: "justify",
  },
  // Bottom controls
  bottomControls: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 2,
    marginRight: 12,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  controlsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  controlButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    minWidth: 40,
    alignItems: "center",
  },
  controlButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  // Loading and error states
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#FF3B30",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ReadingScreen;
