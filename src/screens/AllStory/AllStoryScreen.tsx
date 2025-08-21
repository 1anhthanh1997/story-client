import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { MainTabScreenProps } from "../../types/navigation";
import { fonts } from "../../constants/fonts";

// Mock data for stories
const mockStories = [
  {
    id: 1,
    title: "Đại Chúa Tể",
    author: "Thiên Tâm Thổ Đậu",
    rating: 4.8,
    coverColor: "#FF6B6B",
  },
  {
    id: 2,
    title: "Yêu Thần Ký",
    author: "Phật Tiền",
    rating: 4.3,
    coverColor: "#4ECDC4",
  },
  {
    id: 3,
    title: "Linh Vũ Thiên Hạ",
    author: "Vũ Phong",
    rating: 4.7,
    coverColor: "#45B7D1",
  },
  {
    id: 4,
    title: "Võ Luyện Đỉnh Phon",
    author: "Thiên Tàm Thổ Đậu",
    rating: 4.6,
    coverColor: "#96CEB4",
  },
  {
    id: 5,
    title: "Đấu Phá Thương Kh",
    author: "Vong Ngữ",
    rating: 4.5,
    coverColor: "#FFEAA7",
  },
  {
    id: 6,
    title: "Vũ Động Càn Khôn",
    author: "Vũ Phong",
    rating: 4.4,
    coverColor: "#DDA0DD",
  },
  {
    id: 7,
    title: "Phàm Nhân Tu Tiên",
    author: "Vong Ngữ",
    rating: 4.9,
    coverColor: "#FFB6C1",
  },
  {
    id: 8,
    title: "Linh Vũ Thiên Hạ",
    author: "Thiên Tàm Thổ Đậu",
    rating: 4.2,
    coverColor: "#98FB98",
  },
  {
    id: 9,
    title: "Đại Chúa Tể",
    author: "Vũ Phong",
    rating: 4.8,
    coverColor: "#F0E68C",
  },
  {
    id: 10,
    title: "Yêu Thần Ký",
    author: "Phật Tiền",
    rating: 4.1,
    coverColor: "#FFA07A",
  },
  {
    id: 11,
    title: "Linh Vũ Thiên Hạ",
    author: "Thiên Tàm Thổ Đậu",
    rating: 4.6,
    coverColor: "#87CEEB",
  },
  {
    id: 12,
    title: "Võ Luyện Đỉnh Phon",
    author: "Vũ Phong",
    rating: 4.7,
    coverColor: "#D8BFD8",
  },
  {
    id: 13,
    title: "Đấu Phá Thương Kh",
    author: "Vong Ngữ",
    rating: 4.3,
    coverColor: "#F5DEB3",
  },
  {
    id: 14,
    title: "Vũ Động Càn Khôn",
    author: "Thiên Tàm Thổ Đậu",
    rating: 4.5,
    coverColor: "#FFC0CB",
  },
  {
    id: 15,
    title: "Phàm Nhân Tu Tiên",
    author: "Vũ Phong",
    rating: 4.8,
    coverColor: "#B0E0E6",
  },
];

const categoryTabs = ["Tất cả", "Mới đăng", "Hoàn thành", "Đọc gần đây", "..."];

const AllStoryScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isGridLayout, setIsGridLayout] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const navigation =
    useNavigation<MainTabScreenProps<"AllStory">["navigation"]>();
  const route = useRoute<MainTabScreenProps<"AllStory">["route"]>();

  const sectionId = route.params?.sectionId;

  // Map section IDs to display titles
  const getSectionTitle = (id?: string) => {
    switch (id) {
      case "new":
        return "Mới đăng";
      case "completed":
        return "Truyện Full - Hoàn";
      case "recent":
        return "Truyện đọc gần đây";
      case "rankings":
        return "Bảng xếp hạng";
      case "categories":
        return "Thể loại";
      default:
        return "Tất cả truyện";
    }
  };

  const handleBackPress = () => {
    navigation.navigate("Home");
  };

  const renderStoryItem = (item: (typeof mockStories)[0]) => (
    <View key={item.id} style={styles.storyItem}>
      <View style={[styles.coverImage, { backgroundColor: item.coverColor }]}>
        <Text style={styles.coverPlaceholder}>📚</Text>
      </View>
      <Text style={styles.storyTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.storyAuthor} numberOfLines={1}>
        {item.author}
      </Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.starIcon}>★</Text>
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{getSectionTitle(sectionId)}</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder={`Tìm kiếm trong ${getSectionTitle(
              sectionId
            ).toLowerCase()}`}
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Filter and View Options */}
      <View style={styles.filterSection}>
        <View style={styles.filterRow}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>🔽 Lọc</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sortButton}>
            <Text style={styles.sortButtonText}>↕️ Mới nhất</Text>
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
      </View>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContent}
      >
        {categoryTabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, activeTab === index && styles.activeTab]}
            onPress={() => setActiveTab(index)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === index && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Stories Grid */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.storiesGrid}>
          {mockStories.map(renderStoryItem)}
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
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  sortButtonText: {
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
  tabsContainer: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tabsContent: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#3B82F6",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#3B82F6",
    fontWeight: "600",
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
    width: "31%",
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

export default AllStoryScreen;
