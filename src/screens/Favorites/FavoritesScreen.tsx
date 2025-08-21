import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "../../constants/fonts";

// Mock data for favorites
const mockFavorites = [
  {
    id: 1,
    title: "Võ Luyện Đỉnh Phon",
    author: "Thiên Tàm Thổ Đậu",
    rating: 4.8,
    coverColor: "#FF6B6B",
  },
  {
    id: 2,
    title: "Đấu Phá Thương Kh",
    author: "Vong Ngữ",
    rating: 4.7,
    coverColor: "#4ECDC4",
  },
  {
    id: 3,
    title: "Vũ Động Càn Khôn",
    author: "Vũ Phong",
    rating: 4.6,
    coverColor: "#45B7D1",
  },
  {
    id: 4,
    title: "Phàm Nhân Tu Tiên",
    author: "Vong Ngữ",
    rating: 4.9,
    coverColor: "#96CEB4",
  },
  {
    id: 5,
    title: "Linh Vũ Thiên Hạ",
    author: "Thiên Tàm Thổ Đậu",
    rating: 4.5,
    coverColor: "#FFEAA7",
  },
  {
    id: 6,
    title: "Đại Chúa Tể",
    author: "Vũ Phong",
    rating: 4.8,
    coverColor: "#DDA0DD",
  },
];

const FavoritesScreen = () => {
  const [isGridLayout, setIsGridLayout] = useState(true);
  const [searchText, setSearchText] = useState("");

  const renderFavoriteItem = (item: (typeof mockFavorites)[0]) => (
    <View key={item.id} style={styles.favoriteItem}>
      <View style={[styles.coverImage, { backgroundColor: item.coverColor }]}>
        <TouchableOpacity style={styles.removeButton}>
          <Text style={styles.removeButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.itemTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.itemAuthor} numberOfLines={1}>
        {item.author}
      </Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.starIcon}>★</Text>
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Yêu thích</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Search and Filter Section */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm trong danh sách yêu thích"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />

        <View style={styles.filterRow}>
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
      </View>

      {/* Favorites Grid */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.favoritesGrid}>
          {mockFavorites.map(renderFavoriteItem)}
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
    padding: 16,
  },
  favoritesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
