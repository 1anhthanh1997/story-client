import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "../../constants/fonts";
import Header from "components/common/Header";
import { SearchBar } from "components/library/SearchBar";
import { ExpandIcon, FilterIcon, GridIcon, ListIcon } from "components/icons";
import StoryGridView from "components/library/StoryGridView";
import StoryListView from "components/library/StoryListView";

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
      <View style={styles.filterSection}>
        <TouchableOpacity style={styles.filterButton}>
          <FilterIcon />
          <Text style={styles.filterButtonText}>Lọc</Text>
          <ExpandIcon />
        </TouchableOpacity>

        <View style={styles.layoutToggle}>
          <TouchableOpacity
            style={[
              styles.layoutButton,
              isGridLayout && styles.layoutButtonActive,
            ]}
            onPress={() => setIsGridLayout(true)}
          >
            <GridIcon color={isGridLayout ? "#fff" : "#000"} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.layoutButton,
              !isGridLayout && styles.layoutButtonActive,
            ]}
            onPress={() => setIsGridLayout(false)}
          >
            <ListIcon color={!isGridLayout ? "#fff" : "#000"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stories Content */}
      {isGridLayout ? (
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.storiesGrid}>
            <StoryGridView stories={mockLibraryStories} />
          </View>
        </ScrollView>
      ) : (
        <View style={styles.listContainer}>
          <StoryListView
            stories={mockLibraryStories}
            onStoryPress={(story) => console.log("Story pressed:", story.title)}
          />
        </View>
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
  filterSection: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 8,
    gap: 8,
  },
  filterButtonText: {
    fontSize: 16,
    color: "#333",
  },
  layoutToggle: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 4,
    gap: 8,
  },
  layoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D9D9D9",
  },
  layoutButtonActive: {
    backgroundColor: "#3B82F6",
    borderColor: "transparent",
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
