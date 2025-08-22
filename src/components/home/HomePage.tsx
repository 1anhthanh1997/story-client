import {
  ScrollView,
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  stories,
  completedStories,
  recentReads,
  rankings,
  categories,
} from "../../constants";
import Header from "../common/Header";
import PanelSeeMore from "components/common/PanelSeeMore";
import NewStoriesSection from "./section/NewStoriesSection";
import CompletedStoriesSection from "./section/CompletedStoriesSection";
import RecentReadsSection from "./section/RecentReadsSection";
import RankingsSection from "./section/RankingsSection";
import CategoriesSection from "./section/CategoriesSection";
import { getAllStories } from "api/story";
import { useEffect, useState } from "react";
import { Story } from "../../types/story";

const HomePage = () => {
  const [storiesData, setStoriesData] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Define sections data to avoid repetition
  const sections = [
    {
      id: "new",
      title: "Mới đăng",
      content: (
        <NewStoriesSection
          stories={storiesData.length > 0 ? storiesData : stories}
        />
      ),
    },
    {
      id: "completed",
      title: "Truyện Full - Hoàn",
      content: <CompletedStoriesSection completedStories={completedStories} />,
    },
    {
      id: "recent",
      title: "Truyện đọc gần đây",
      content: <RecentReadsSection recentReads={recentReads} />,
    },
    {
      id: "rankings",
      title: "Bảng xếp hạng",
      content: <RankingsSection rankings={rankings} />,
    },
    {
      id: "categories",
      title: "Thể loại",
      content: <CategoriesSection categories={categories} />,
    },
  ];

  const fetchStories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: any = await getAllStories({
        page: 1,
        limit: 20,
        sortBy: "createdAt",
        sortOrder: "desc",
      });
      setStoriesData(response.data?.stories);
    } catch (error) {
      console.error("Error fetching stories:", error);
      setError("Failed to fetch stories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header
        title="Vũ trụ truyện"
        onMenuPress={() => console.log("Menu pressed")}
        onSearchPress={() => console.log("Search pressed")}
      />

      {loading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading stories...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchStories}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {sections.map((section) => (
          <PanelSeeMore
            key={section.id}
            title={section.title}
            sectionId={section.id}
          >
            {section.content}
          </PanelSeeMore>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    backgroundColor: "#fff",
    flex: 1,
  },
  scrollContent: {
    padding: 12,
    paddingBottom: 20, // Reduced padding since we have bottom tab bar
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#ff0000",
    marginBottom: 10,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default HomePage;
