import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface StoryCardProps {
  item: {
    id: number;
    title: string;
    image: any;
    badge: number;
  };
}

const StoryCard: React.FC<StoryCardProps> = ({ item }) => {
  // Don't render if no title (empty item)
  if (!item.title) {
    return <View style={styles.storyCard} />;
  }

  return (
    <View style={styles.storyCard}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://drive.google.com/uc?export=view&id=1tztWuVZi8DSeBDj-yIBqEf6u9JUlSt95",
          }}
          style={styles.storyImage}
        />
        {item.badge > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
      </View>
      <Text style={styles.storyTitle}>{item.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  storyCard: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 4,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 8,
  },
  storyImage: {
    width: 90,
    height: 120,
    borderRadius: 8,
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
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  storyTitle: {
    fontSize: 13,
    textAlign: "center",
    fontWeight: "500",
    color: "#333",
  },
});

export default StoryCard;
