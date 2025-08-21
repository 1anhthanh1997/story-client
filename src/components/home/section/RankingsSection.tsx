import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface RankingsSectionProps {
  rankings: any[];
}

const RankingsSection: React.FC<RankingsSectionProps> = ({ rankings }) => {
  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
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
});

export default RankingsSection;


