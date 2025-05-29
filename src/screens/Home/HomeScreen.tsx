import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

// Dummy data
const stories = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  title: `Truyện mới ${i + 1}`,
  image: require("../../../assets/icon.png"), // Replace with your image
  badge: 72,
}));
const completedStories = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  title: `Truyện hoàn ${i + 1}`,
  image: require("../../../assets/icon.png"),
  badge: 72,
}));
const recentReads = [
  { id: 1, title: "Truyện đang đọc 1", chapter: "Chương 5" },
  { id: 2, title: "Truyện đang đọc 2", chapter: "Chương 10" },
  { id: 3, title: "Truyện đang đọc 3", chapter: "Chương 15" },
];
const rankings = [
  { id: 1, title: "Truyện hot 1", reads: 90000, rating: 4.8 },
  { id: 2, title: "Truyện hot 2", reads: 80000, rating: 4.7 },
  { id: 3, title: "Truyện hot 3", reads: 70000, rating: 4.6 },
  { id: 4, title: "Truyện hot 4", reads: 60000, rating: 4.5 },
  { id: 5, title: "Truyện hot 5", reads: 50000, rating: 4.4 },
];
const categories = [
  "Tiên Hiệp",
  "Kiếm Hiệp",
  "Ngôn Tình",
  "Đô Thị",
  "Huyền Huyễn",
  "Xuyên Không",
  "Trọng Sinh",
  "Trinh Thám",
];

const StoryCard = ({ item }: any) => (
  <View style={styles.storyCard}>
    <Image source={item.image} style={styles.storyImage} />
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{item.badge}</Text>
    </View>
    <Text style={styles.storyTitle}>{item.title}</Text>
  </View>
);

const CategoryCard = ({ name }: { name: string }) => (
  <View style={styles.categoryCard}>
    <View style={styles.categoryIcon} />
    <Text style={styles.categoryText}>{name}</Text>
  </View>
);

const HomeScreen = () => {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={{ padding: 10 }}>
      {/* Mới đăng */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mới đăng</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={stories}
          renderItem={StoryCard}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {/* Truyện Full - Hoàn */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Truyện Full - Hoàn</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={completedStories}
          renderItem={StoryCard}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {/* Truyện đọc gần đây */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Truyện đọc gần đây</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        {recentReads.map((item) => (
          <View key={item.id} style={styles.recentReadRow}>
            <View style={styles.recentReadImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.recentReadTitle}>{item.title}</Text>
              <Text style={styles.recentReadChapter}>{item.chapter}</Text>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBar,
                    { width: `${30 + item.id * 20}%` },
                  ]}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
      {/* Bảng xếp hạng */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Bảng xếp hạng</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        {rankings.map((item, idx) => (
          <View key={item.id} style={styles.rankingRow}>
            <Text style={styles.rankingIndex}>{idx + 1}</Text>
            <View style={styles.rankingImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.rankingTitle}>{item.title}</Text>
              <Text style={styles.rankingReads}>
                Lượt đọc: {item.reads.toLocaleString()}
              </Text>
              <Text style={styles.rankingRating}>⭐ {item.rating}</Text>
            </View>
          </View>
        ))}
      </View>
      {/* Thể loại */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Thể loại</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoriesGrid}>
          {categories.map((name, idx) => (
            <CategoryCard key={idx} name={name} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: { backgroundColor: "#fff" },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold" },
  seeAll: { color: "#007AFF", fontSize: 14 },
  storyCard: {
    width: 100,
    marginRight: 12,
    alignItems: "center",
    position: "relative",
  },
  storyImage: {
    width: 90,
    height: 120,
    borderRadius: 8,
    marginBottom: 4,
  },
  badge: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "#FF3B30",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 1,
  },
  badgeText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  storyTitle: { fontSize: 13, textAlign: "center", marginTop: 2 },
  recentReadRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  recentReadImage: {
    width: 40,
    height: 55,
    backgroundColor: "#eee",
    borderRadius: 6,
    marginRight: 10,
  },
  recentReadTitle: { fontWeight: "bold", fontSize: 15 },
  recentReadChapter: { color: "#888", fontSize: 13 },
  progressBarBg: {
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    marginTop: 4,
    width: "90%",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#007AFF",
    borderRadius: 3,
  },
  rankingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  rankingIndex: {
    fontWeight: "bold",
    fontSize: 18,
    width: 22,
    color: "#FF9500",
  },
  rankingImage: {
    width: 40,
    height: 55,
    backgroundColor: "#eee",
    borderRadius: 6,
    marginHorizontal: 10,
  },
  rankingTitle: { fontWeight: "bold", fontSize: 15 },
  rankingReads: { color: "#888", fontSize: 13 },
  rankingRating: { color: "#FFD700", fontSize: 13 },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "30%",
    aspectRatio: 1.2,
    backgroundColor: "#f5f8fa",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    backgroundColor: "#d1d8e0",
    borderRadius: 8,
    marginBottom: 6,
  },
  categoryText: { fontSize: 13, fontWeight: "500" },
});

export default HomeScreen;
