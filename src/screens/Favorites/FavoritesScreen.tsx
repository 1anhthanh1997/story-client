import Header from "components/common/Header";
import FilterAndLayoutToggle from "components/library/FilterAndLayoutToggle";
import { SearchBar } from "components/library/SearchBar";
import StoryGridView from "components/library/StoryGridView";
import StoryListView from "components/library/StoryListView";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "../../constants/fonts";
import { STORY_LAYOUT_TYPE } from "../../constants/layout";

// Mock data for favorites
const mockFavorites = [
  {
    id: 1,
    title: "Võ Luyện Đỉnh Phon",
    author: "Thiên Tàm Thổ Đậu",
    rating: 4.8,
    coverColor: "#FF6B6B",
    coverImage: "https://via.placeholder.com/80x120/FF6B6B/FFFFFF?text=⚔️",
    lastRead: "Hôm qua",
    status: "reading" as const,
    progress: 45,
    currentChapter: 156,
    totalChapters: 2543,
  },
  {
    id: 2,
    title: "Đấu Phá Thương Kh",
    author: "Vong Ngữ",
    rating: 4.7,
    coverColor: "#4ECDC4",
    coverImage: "https://via.placeholder.com/80x120/4ECDC4/FFFFFF?text=🔥",
    lastRead: "23/4/2025",
    status: "reading" as const,
    progress: 78,
    currentChapter: 245,
    totalChapters: 1200,
  },
  {
    id: 3,
    title: "Vũ Động Càn Khôn",
    author: "Vũ Phong",
    rating: 4.6,
    coverColor: "#45B7D1",
    coverImage: "https://via.placeholder.com/80x120/45B7D1/FFFFFF?text=⚡",
    lastRead: "21/4/2025",
    status: "reading" as const,
    progress: 65,
    currentChapter: 876,
    totalChapters: 1352,
  },
  {
    id: 4,
    title: "Phàm Nhân Tu Tiên",
    author: "Vong Ngữ",
    rating: 4.9,
    coverColor: "#96CEB4",
    coverImage: "https://via.placeholder.com/80x120/96CEB4/FFFFFF?text=🧘",
    lastRead: "20/4/2025",
    status: "completed" as const,
    progress: 100,
    currentChapter: 1648,
    totalChapters: 1648,
  },
  {
    id: 5,
    title: "Linh Vũ Thiên Hạ",
    author: "Thiên Tàm Thổ Đậu",
    rating: 4.5,
    coverColor: "#FFEAA7",
    coverImage: "https://via.placeholder.com/80x120/FFEAA7/000000?text=🌸",
    lastRead: "18/4/2025",
    status: "reading" as const,
    progress: 32,
    currentChapter: 543,
    totalChapters: 1123,
  },
  {
    id: 6,
    title: "Đại Chúa Tể",
    author: "Vũ Phong",
    rating: 4.8,
    coverColor: "#DDA0DD",
    coverImage: "https://via.placeholder.com/80x120/DDA0DD/FFFFFF?text=👑",
    lastRead: "15/4/2025",
    status: "reading" as const,
    progress: 28,
    currentChapter: 420,
    totalChapters: 1500,
  },
];

const FavoritesScreen = () => {
  const [isGridLayout, setIsGridLayout] = useState(true);
  const [searchText, setSearchText] = useState("");

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <Header
        title="Yêu thích"
        onMenuPress={() => console.log("Menu pressed")}
        onSearchPress={() => console.log("Search pressed")}
      />

      {/* Search and Filter Section */}

      <View style={styles.searchSection}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Tìm kiếm trong thư viện"
        />
      </View>

      <FilterAndLayoutToggle
        isGridLayout={isGridLayout}
        onLayoutChange={setIsGridLayout}
        onFilterPress={() => console.log("Filter pressed")}
      />

      {/* Favorites Grid */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {isGridLayout ? (
          <View style={styles.storiesGrid}>
            <StoryGridView
              stories={mockFavorites}
              type={STORY_LAYOUT_TYPE.FAVORITES}
            />
          </View>
        ) : (
          <View style={styles.listContainer}>
            <StoryListView
              stories={mockFavorites}
              type={STORY_LAYOUT_TYPE.FAVORITES}
              onStoryPress={(story) =>
                console.log("Story pressed:", story.title)
              }
            />
          </View>
        )}
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
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: "#333",
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
  searchButtonText: {
    fontSize: 20,
    color: "#333",
  },
  searchSection: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  searchInput: {
    height: 44,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  filterButtonText: {
    fontSize: 16,
    color: "#333",
  },
  layoutToggle: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 4,
  },
  layoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  layoutButtonActive: {
    backgroundColor: "#3B82F6",
  },
  layoutButtonText: {
    fontSize: 16,
    color: "#333",
  },
  layoutButtonTextActive: {
    color: "#fff",
  },
  content: {
    flex: 1,
    padding: 8,
  },
  contentContainer: {
    paddingBottom: 80, // Add padding to prevent content from being hidden behind bottom tab bar
  },
  storiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  favoriteItem: {
    width: "48%",
    marginBottom: 20,
  },
  coverImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  removeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    fontSize: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
    lineHeight: 18,
  },
  itemAuthor: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    fontSize: 12,
    color: "#FFD700",
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
});

export default FavoritesScreen;
