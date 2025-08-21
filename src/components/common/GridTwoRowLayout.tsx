import React from "react";
import { View, StyleSheet } from "react-native";
import StoryCard from "../home/StoryCard";

interface GridTwoRowLayoutProps {
  data: Array<{
    id: number;
    title: string;
    image: any;
    badge: number;
  }>;
}

const GridTwoRowLayout: React.FC<GridTwoRowLayoutProps> = ({ data }) => {
  // Ensure we have exactly 6 items, pad with empty items if needed
  const paddedData = [...data];
  while (paddedData.length < 6) {
    paddedData.push({
      id: paddedData.length + 1,
      title: "",
      image: null,
      badge: 0,
    });
  }

  // Split data into two rows of 3 items each
  const firstRow = paddedData.slice(0, 3);
  const secondRow = paddedData.slice(3, 6);

  return (
    <View style={styles.container}>
      {/* First row */}
      <View style={styles.row}>
        {firstRow.map((item, index) => (
          <StoryCard key={item.id || index} item={item} />
        ))}
      </View>

      {/* Second row */}
      <View style={styles.row}>
        {secondRow.map((item, index) => (
          <StoryCard key={item.id || index + 3} item={item} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});

export default GridTwoRowLayout;
