import {
  ScrollView,
  View,
  StatusBar,
  StyleSheet,
  SafeAreaView,
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

const HomePage = () => {
  // Define sections data to avoid repetition
  const sections = [
    {
      id: "new",
      title: "Mới đăng",
      content: <NewStoriesSection stories={stories} />,
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
});

export default HomePage;
