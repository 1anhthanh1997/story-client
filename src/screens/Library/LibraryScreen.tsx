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

// Mock data for library stories with reading progress
const mockLibraryStories = [
  {
    id: 1,
    title: "Võ Luyện Đỉnh Phon",
    author: "Thiên Tâm Thổ Đậu",
    currentChapter: 156,
    totalChapters: 2543,
    progress: 6,
    status: "reading",
    lastRead: "Hôm qua",
    coverColor: "#FF6B6B",
  },
  {
    id: 2,
    title: "Nguyên T...",
    author: "Vũ Phong",
    currentChapter: 245,
    totalChapters: 1200,
    progress: 20,
    status: "reading",
    lastRead: "23/4/2025",
    coverColor: "#4ECDC4",
  },
  {
    id: 3,
    title: "Phàm Nhân Tu Tiên",
    author: "Vong Ngữ",
    currentChapter: 543,
    totalChapters: 1123,
    progress: 48,
    status: "reading",
    lastRead: "21/4/2025",
    coverColor: "#45B7D1",
  },
  {
    id: 4,
    title: "Đấu Phá Thương Kh",
    author: "Vong Ngữ",
    currentChapter: 1648,
    totalChapters: 1648,
    progress: 100,
    status: "completed",
    lastRead: "20/4/2025",
    coverColor: "#96CEB4",
  },
  {
    id: 5,
    title: "Vũ Động Càn Khôn",
    author: "Vũ Phong",
    currentChapter: 876,
    totalChapters: 1352,
    progress: 65,
    status: "reading",
    lastRead: "18/4/2025",
    coverColor: "#FFEAA7",
  },
  {
    id: 6,
    title: "Tiên Nghịch",
    author: "Thiên Tàm Thổ Đậu",
    currentChapter: 0,
    totalChapters: 1800,
    progress: 0,
    status: "unread",
    lastRead: "",
    coverColor: "#DDA0DD",
  },
  {
    id: 7,
    title: "Tru Tiên",
    author: "Phật Tiền",
    currentChapter: 0,
    totalChapters: 2100,
    progress: 0,
    status: "unread",
    lastRead: "",
    coverColor: "#98FB98",
  },
  {
    id: 8,
    title: "Đế Bá",
    author: "Thiên Tàm Thổ Đậu",
    currentChapter: 0,
    totalChapters: 1500,
    progress: 0,
    status: "unread",
    lastRead: "",
    coverColor: "#F0E68C",
  },
];

const LibraryScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isGridLayout, setIsGridLayout] = useState(true);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "reading":
        return "#007AFF";
      case "completed":
        return "#10B981";
      case "unread":
        return "#6B7280";
      default:
        return "#6B7280";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "reading":
        return "Đang đọc";
      case "completed":
        return "Đã đọc";
      case "unread":
        return "Chưa đọc";
      default:
        return "Chưa đọc";
    }
  };

  const renderStoryItem = (story: any) => (
    <View key={story.id} style={styles.storyItem}>
      {/* Cover Image */}
      <View style={[styles.coverImage, { backgroundColor: story.coverColor }]}>
        <Text style={styles.coverPlaceholder}>📚</Text>
      </View>

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
            {story.currentChapter}/{story.totalChapters}
          </Text>
          <Text style={styles.progressPercent}>{story.progress}%</Text>
        </View>
      </View>

      {/* Story Info */}
      <Text style={styles.storyTitle} numberOfLines={2}>
        {story.title}
      </Text>
      <Text style={styles.storyAuthor} numberOfLines={1}>
        {story.author}
      </Text>

      {/* Status Button */}
      <TouchableOpacity
        style={[
          styles.statusButton,
          { backgroundColor: getStatusColor(story.status) },
        ]}
      >
        <Text style={styles.statusText}>{getStatusText(story.status)}</Text>
        {story.lastRead && (
          <Text style={styles.lastReadText}>{story.lastRead}</Text>
        )}
      </TouchableOpacity>
    </View>
  );

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
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm trong thư viện"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Filter and View Options */}
      <View style={styles.filterSection}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>🔽 Lọc</Text>
        </TouchableOpacity>

        <View style={styles.layoutToggle}>
          <TouchableOpacity
            style={[
              styles.layoutButton,
              isGridLayout && styles.layoutButtonActive,
            ]}
            onPress={() => setIsGridLayout(true)}
          >
            <Text
              style={[
                styles.layoutButtonText,
                isGridLayout && styles.layoutButtonTextActive,
              ]}
            >
              ⬜
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.layoutButton,
              !isGridLayout && styles.layoutButtonActive,
            ]}
            onPress={() => setIsGridLayout(false)}
          >
            <Text
              style={[
                styles.layoutButtonText,
                !isGridLayout && styles.layoutButtonTextActive,
              ]}
            >
              ☰
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stories Grid */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.storiesGrid}>
          {mockLibraryStories.map(renderStoryItem)}
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
    color: "#666",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
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
    padding: 16,
  },
  contentContainer: {
    paddingBottom: 80, // Add padding to prevent content from being hidden behind bottom tab bar
  },
  storiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  storyItem: {
    width: "48%",
    marginBottom: 20,
  },
  coverImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#e5e7eb",
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
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
  },
  storyAuthor: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  statusButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  statusText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  lastReadText: {
    fontSize: 10,
    color: "#fff",
    marginTop: 2,
    opacity: 0.9,
  },
});

export default LibraryScreen;
