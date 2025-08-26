import Header from "components/common/Header";
import FilterAndLayoutToggle from "components/library/FilterAndLayoutToggle";
import { SearchBar } from "components/library/SearchBar";
import StoryGridView from "components/library/StoryGridView";
import StoryListView from "components/library/StoryListView";
import { STORY_LAYOUT_TYPE } from "constants/layout";
import React, { useState } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock data for library stories with reading progress
const mockLibraryStories = [
  {
    id: 1,
    title: "Võ Luyện Đỉnh Phong",
    author: "Thiên Tâm Thổ Đậu",
    currentChapter: 156,
    totalChapters: 2543,
    progress: 6,
    status: "reading" as const,
    lastRead: "Hôm qua",
    coverColor: "#FF6B6B",
    coverImage: "https://via.placeholder.com/80x120/FF6B6B/FFFFFF?text=⚔️",
  },
  {
    id: 2,
    title: "Nguyên T...",
    author: "Vũ Phong",
    currentChapter: 245,
    totalChapters: 1200,
    progress: 20,
    status: "reading" as const,
    lastRead: "23/4/2025",
    coverColor: "#4ECDC4",
    coverImage: "https://via.placeholder.com/80x120/4ECDC4/FFFFFF?text=🌊",
  },
  {
    id: 3,
    title: "Phàm Nhân Tu Tiên",
    author: "Vong Ngữ",
    currentChapter: 543,
    totalChapters: 1123,
    progress: 48,
    status: "reading" as const,
    lastRead: "21/4/2025",
    coverColor: "#45B7D1",
    coverImage: "https://via.placeholder.com/80x120/45B7D1/FFFFFF?text=🧘",
  },
  {
    id: 4,
    title: "Đấu Phá Thương Khung",
    author: "Vong Ngữ",
    currentChapter: 1648,
    totalChapters: 1648,
    progress: 100,
    status: "completed" as const,
    lastRead: "20/4/2025",
    coverColor: "#96CEB4",
    coverImage: "https://via.placeholder.com/80x120/96CEB4/FFFFFF?text=🔥",
  },
  {
    id: 5,
    title: "Vũ Động Càn Khôn",
    author: "Vũ Phong",
    currentChapter: 876,
    totalChapters: 1352,
    progress: 65,
    status: "reading" as const,
    lastRead: "18/4/2025",
    coverColor: "#FFEAA7",
    coverImage: "https://via.placeholder.com/80x120/FFEAA7/000000?text=⚡",
  },
  {
    id: 6,
    title: "Tiên Nghịch",
    author: "Thiên Tàm Thổ Đậu",
    currentChapter: 0,
    totalChapters: 1800,
    progress: 0,
    status: "unread" as const,
    lastRead: "",
    coverColor: "#DDA0DD",
    coverImage: "https://via.placeholder.com/80x120/DDA0DD/FFFFFF?text=🌸",
  },
  {
    id: 7,
    title: "Tru Tiên",
    author: "Phật Tiền",
    currentChapter: 0,
    totalChapters: 2100,
    progress: 0,
    status: "unread" as const,
    lastRead: "",
    coverColor: "#98FB98",
    coverImage: "https://via.placeholder.com/80x120/98FB98/000000?text=🌿",
  },
  {
    id: 8,
    title: "Đế Bá",
    author: "Thiên Tàm Thổ Đậu",
    currentChapter: 0,
    totalChapters: 1500,
    progress: 0,
    status: "unread" as const,
    lastRead: "",
    coverColor: "#F0E68C",
    coverImage: "https://via.placeholder.com/80x120/F0E68C/000000?text=👑",
  },
];

const LibraryScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isGridLayout, setIsGridLayout] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Header */}
      <Header
        title="Thư viện"
        onMenuPress={() => console.log("Menu pressed")}
        onSearchPress={() => console.log("Search pressed")}
      />

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Tìm kiếm trong thư viện"
        />
      </View>

      {/* Filter and View Options */}
      <FilterAndLayoutToggle
        isGridLayout={isGridLayout}
        onLayoutChange={setIsGridLayout}
        onFilterPress={() => console.log("Filter pressed")}
      />

      {/* Stories Content */}
      {isGridLayout ? (
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.storiesGrid}>
            <StoryGridView
              stories={mockLibraryStories}
              type={STORY_LAYOUT_TYPE.LIBRARY}
            />
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.listContainer}>
            <StoryListView
              stories={mockLibraryStories}
              type={STORY_LAYOUT_TYPE.LIBRARY}
              onStoryPress={(story) =>
                console.log("Story pressed:", story.title)
              }
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchSection: {
    padding: 8,
    backgroundColor: "#fff",
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
});

export default LibraryScreen;
