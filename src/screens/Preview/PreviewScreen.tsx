import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../types/navigation";
import { getStoryById, type Story } from "../../api/story";
import Layout from "components/common/Layout";
import {
  BackIcon,
  ShareIcon,
  DownloadIcon,
  LibraryIcon,
  HeartIcon,
  ViewIcon,
  StarIcon,
} from "../../components/icons";
import SummaryContent from "../../components/preview/SummaryContent";
import ChaptersList from "../../components/preview/ChaptersList";
import ReviewsList from "../../components/preview/ReviewsList";
import type { Story as StoryType, Chapter, Review } from "../../types/story";

const { width } = Dimensions.get("window");

type PreviewScreenProps = NativeStackScreenProps<RootStackParamList, "Preview">;

const PreviewScreen: React.FC<PreviewScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { id } = route.params;

  const [story, setStory] = useState<StoryType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("summary");

  // Mock data for demonstration
  const mockStory = {
    id: id,
    title: "Linh Vũ Thiên Hạ",
    author: {
      _id: "author123",
      name: "Vũ Phong",
      createdAt: "2023-01-01",
      updatedAt: "2023-12-01",
      __v: 0,
    },
    image:
      "https://drive.google.com/uc?export=view&id=1tztWuVZi8DSeBDj-yIBqEf6u9JUlSt95",
    rating: 4.7,
    views: "1.9M",
    chapters: 1432,
    status: "Hoàn thành",
    updatedDate: "2023-12-10",
    publishedDate: "2018-05-15",
    genres: ["Kiếm Hiệp", "Tiên Hiệp", "Huyền Huyễn", "Võng Du", "Dị Giới"],
    tags: [
      "Tu Tiên",
      "Võ Đạo",
      "Hành Động",
      "Phiêu Lưu",
      "Huyền Bí",
      "Võ Hiệp",
    ],
    currentChapter: 156,
    progress: 75,
    description:
      "<p><strong>Linh Vũ Thiên Hạ</strong> là câu chuyện về <em>Tần Vũ</em>, một thiếu niên bình thường sống trong làng Thanh Thủy.</p><p>Sau khi phát hiện ra mình có khả năng điều khiển linh khí đặc biệt, anh bắt đầu hành trình tu luyện để trở thành một võ giả mạnh mẽ.</p><p>Trên con đường tìm kiếm sức mạnh, Tần Vũ phải đối mặt với nhiều thế lực hùng mạnh, những âm mưu đen tối và các bí ẩn về nguồn gốc của mình.</p><p><strong>Liệu anh có thể vượt qua mọi thử thách, bảo vệ người thân và đạt đến đỉnh cao của võ đạo?</strong></p>",
    // Mock chapters data
    chaptersData: [
      {
        _id: "ch1",
        title: "Chương 1: Khởi đầu",
        chapterNumber: 1,
        wordCount: 2500,
        readingTime: "8 phút",
        isRead: true,
        isLocked: false,
        publishedDate: "2018-05-15",
      },
      {
        _id: "ch2",
        title: "Chương 2: Gặp gỡ",
        chapterNumber: 2,
        wordCount: 2800,
        readingTime: "9 phút",
        isRead: true,
        isLocked: false,
        publishedDate: "2018-05-16",
      },
      {
        _id: "ch3",
        title: "Chương 3: Thử thách đầu tiên",
        chapterNumber: 3,
        wordCount: 3200,
        readingTime: "10 phút",
        isRead: false,
        isLocked: false,
        publishedDate: "2018-05-17",
      },
      {
        _id: "ch4",
        title: "Chương 4: Bí mật",
        chapterNumber: 4,
        wordCount: 2900,
        readingTime: "9 phút",
        isRead: false,
        isLocked: false,
        publishedDate: "2018-05-18",
      },
      {
        _id: "ch5",
        title: "Chương 5: Quyết định",
        chapterNumber: 5,
        wordCount: 3100,
        readingTime: "10 phút",
        isRead: false,
        isLocked: true,
        publishedDate: "2018-05-19",
      },
    ] as Chapter[],
    // Mock reviews data
    reviewsData: [
      {
        _id: "rev1",
        user: {
          name: "Nguyễn Văn A",
          avatar:
            "https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-1697898655.jpg",
        },
        rating: 5,
        comment:
          "Truyện rất hay! Cốt truyện hấp dẫn, nhân vật được xây dựng tốt. Rất đáng đọc!",
        date: "2023-12-01",
        likes: 24,
        isLiked: false,
      },
      {
        _id: "rev2",
        user: {
          name: "Trần Thị B",
          avatar:
            "https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-1697898655.jpg",
        },
        rating: 4,
        comment:
          "Cốt truyện ổn nhưng đôi khi hơi chậm. Nhân vật chính có tính cách thú vị.",
        date: "2023-11-28",
        likes: 12,
        isLiked: true,
      },
      {
        _id: "rev3",
        user: {
          name: "Lê Văn C",
          avatar:
            "https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-1697898655.jpg",
        },
        rating: 5,
        comment:
          "Một trong những truyện hay nhất tôi từng đọc. Tác giả viết rất chi tiết và logic.",
        date: "2023-11-25",
        likes: 36,
        isLiked: false,
      },
      {
        _id: "rev4",
        user: {
          name: "Phạm Thị D",
          avatar:
            "https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-1697898655.jpg",
        },
        rating: 3,
        comment:
          "Truyện có vẻ ổn nhưng cần cải thiện thêm về phần miêu tả cảnh vật.",
        date: "2023-11-20",
        likes: 8,
        isLiked: false,
      },
    ] as Review[],
  };

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        setError(null);
        // Use mock data for now
        const response: any = await getStoryById(id);
        setStory({
          ...mockStory,
          title: response.data.title,
          description: response.data.description,
          author: {
            ...mockStory.author,
            name: response.data.author.name,
          },
          chaptersData: response.data.chapters || mockStory.chaptersData,
        });
      } catch (err) {
        setError("Không thể tải thông tin truyện");
        console.error("Error fetching story:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStory();
    }
  }, [id]);

  const handleReadStory = () => {
    if (story && story.chaptersData && story.chaptersData.length > 0) {
      navigation.navigate("Reading", {
        chapterId: story.chaptersData[0]._id,
        chapterIds: story.chaptersData.map((chapter) => chapter._id),
      });
    }
  };

  const handleAddToLibrary = () => {
    if (story) {
      console.log("Add to library:", story.title);
    }
  };

  const handleDownload = () => {
    if (story) {
      console.log("Download story:", story.title);
    }
  };

  const handleFavorite = () => {
    if (story) {
      console.log("Favorite story:", story.title);
    }
  };

  const handleShare = () => {
    if (story) {
      console.log("Share story:", story.title);
    }
  };

  // Loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Đang tải thông tin truyện...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
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

  // No story data
  if (!story) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Không tìm thấy thông tin truyện</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Layout>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết truyện</Text>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <ShareIcon />
        </TouchableOpacity>
      </View>

      {/* Fixed Story Overview Section */}
      <View style={styles.storyOverview}>
        <Image source={{ uri: story.image }} style={styles.storyThumbnail} />
        <View style={styles.storyInfo}>
          <Text style={styles.storyTitle}>{story.title}</Text>
          <Text style={styles.storyAuthor}>
            {story.author?.name || "Chưa cập nhật"}
          </Text>

          {/* Ratings and Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <StarIcon />
              <Text style={styles.statText}>{story.rating}</Text>
            </View>
            <View style={styles.statSeparator} />
            <View style={styles.statItem}>
              <ViewIcon />
              <Text style={styles.statText}>{story.views}</Text>
            </View>
            <View style={styles.statSeparator} />
            <View style={styles.statItem}>
              <LibraryIcon />
              <Text style={styles.statText}>{story.chapters}</Text>
            </View>
          </View>

          {/* Genre Tags */}
          <View style={styles.genreTags}>
            {story.genres &&
              story.genres.map((genre: string, index: number) => (
                <View key={index} style={styles.genreTag}>
                  <Text style={styles.genreTagText}>{genre}</Text>
                </View>
              ))}
          </View>

          {/* Status and Update Date */}
          {/* <View style={styles.statusRow}>
            <Text style={styles.statusText}>{story.status}</Text>
            <Text style={styles.updateText}>Cập nhật: {story.updatedDate}</Text>
          </View> */}
        </View>
      </View>

      {/* Continue Reading Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleReadStory}>
        <Text style={styles.continueButtonText}>Tiếp tục đọc</Text>
        <Text style={styles.progressText}>
          Chương {story.currentChapter} ({story.progress}%)
        </Text>
      </TouchableOpacity>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        {/* <TouchableOpacity
          style={styles.actionButton}
          onPress={handleDownload}
        >
          <DownloadIcon />
          <Text style={styles.actionText}>Tải xuống</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleAddToLibrary}
        >
          <LibraryIcon />
          <Text style={styles.actionText}>Thêm vào thư viện</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleFavorite}>
          <HeartIcon />
          <Text style={styles.actionText}>Yêu thích</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabNavigation}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "summary" && styles.activeTab]}
          onPress={() => setActiveTab("summary")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "summary" && styles.activeTabText,
            ]}
          >
            Tóm tắt
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "chapters" && styles.activeTab]}
          onPress={() => setActiveTab("chapters")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "chapters" && styles.activeTabText,
            ]}
          >
            Danh sách chương
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "reviews" && styles.activeTab]}
          onPress={() => setActiveTab("reviews")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "reviews" && styles.activeTabText,
            ]}
          >
            Đánh giá
          </Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Tab Content */}
      <View style={styles.tabContentContainer}>
        <ScrollView
          style={styles.tabScrollView}
          showsVerticalScrollIndicator={false}
        >
          {activeTab === "summary" && <SummaryContent story={story} />}

          {activeTab === "chapters" && story.chaptersData && (
            <ChaptersList chapters={story.chaptersData} storyId={story.id} />
          )}

          {activeTab === "reviews" && story.reviewsData && (
            <ReviewsList reviews={story.reviewsData} />
          )}
        </ScrollView>
      </View>
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
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  timeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: "#000",
    fontWeight: "300",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    flex: 1,
    textAlign: "center",
  },
  shareButton: {
    padding: 8,
  },
  shareIcon: {
    fontSize: 20,
    color: "#000",
    fontWeight: "600",
  },
  // Tab content container
  tabContentContainer: {
    flex: 1,
  },
  tabScrollView: {
    flex: 1,
  },
  // Story overview section
  storyOverview: {
    flexDirection: "row",
    padding: 16,
    gap: 16,
  },
  storyThumbnail: {
    width: 100,
    height: 140,
    borderRadius: 8,
  },
  storyInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  storyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  storyAuthor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  // Stats row
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statSeparator: {
    width: 1,
    height: 16,
    backgroundColor: "#ccc",
    marginHorizontal: 8,
  },
  starIcon: {
    fontSize: 14,
    color: "#FFD700",
  },
  eyeIcon: {
    fontSize: 14,
    color: "#666",
  },
  bookIcon: {
    fontSize: 14,
    color: "#666",
  },
  statText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  // Genre tags
  genreTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  genreTag: {
    backgroundColor: "#E3F2FD",
    borderWidth: 1,
    borderColor: "#2196F3",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  genreTagText: {
    fontSize: 12,
    color: "#1976D2",
    fontWeight: "500",
  },
  // Status row
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusText: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "500",
  },
  updateText: {
    fontSize: 12,
    color: "#999",
  },
  // Continue reading button
  continueButton: {
    backgroundColor: "#007AFF",
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  progressText: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.8,
  },
  // Action buttons
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    gap: 4,
  },
  actionIcon: {
    fontSize: 20,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  // Tab navigation
  tabNavigation: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#007AFF",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  // Introduction section
  introductionSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  introductionText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  // Details section
  detailsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  detailsList: {
    gap: 8,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
  },
  detailValue: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  // Tags section
  tagsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: "#666",
  },
  // Author section
  authorSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  authorInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  authorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  authorDetails: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  authorWorks: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  seeMoreButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  seeMoreText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  authorDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  // Loading and error states
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
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
  // Bottom navigation
  bottomNavigation: {
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
  bottomNavItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  bottomNavIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  activeBottomNavIcon: {
    color: "#007AFF",
  },
  bottomNavLabel: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
  },
  activeBottomNavLabel: {
    color: "#007AFF",
    fontWeight: "500",
  },
});

export default PreviewScreen;
