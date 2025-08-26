import React from "react";
import { View, StyleSheet } from "react-native";
import StoryListView from "./StoryListView";

// Sample data that matches the image description
const sampleStories = [
  {
    id: 1,
    title: "The Last Guardian",
    author: "Anime Studio",
    coverImage: "https://via.placeholder.com/80x120/FF6B9D/FFFFFF?text=🎭",
    lastRead: "2 hours ago",
    status: "reading" as const,
    progress: 45,
  },
  {
    id: 2,
    title: "City of Dreams",
    author: "Manga Creator",
    coverImage: "https://via.placeholder.com/80x120/4ECDC4/FFFFFF?text=🏯",
    lastRead: "1 day ago",
    status: "reading" as const,
    progress: 78,
  },
  {
    id: 3,
    title: "Eternal Quest",
    author: "Light Novel Author",
    coverImage: "https://via.placeholder.com/80x120/45B7D1/FFFFFF?text=⚔️",
    lastRead: "3 days ago",
    status: "completed" as const,
    progress: 100,
  },
  {
    id: 4,
    title: "Mystic Academy",
    author: "Fantasy Writer",
    coverImage: "https://via.placeholder.com/80x120/96CEB4/FFFFFF?text=🎓",
    lastRead: "1 week ago",
    status: "unread" as const,
  },
  {
    id: 5,
    title: "Dragon's Heart",
    author: "Adventure Author",
    coverImage: "https://via.placeholder.com/80x120/FFEAA7/000000?text=🐉",
    lastRead: "2 weeks ago",
    status: "reading" as const,
    progress: 23,
  },
];

const StoryListViewDemo: React.FC = () => {
  const handleStoryPress = (story: any) => {
    console.log("Story pressed:", story.title);
    // Handle story selection here
  };

  return (
    <View style={styles.container}>
      <StoryListView stories={sampleStories} onStoryPress={handleStoryPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
});

export default StoryListViewDemo;
