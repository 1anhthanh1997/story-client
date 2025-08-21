import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface RecentReadsSectionProps {
  recentReads: any[];
}

const RecentReadsSection: React.FC<RecentReadsSectionProps> = ({
  recentReads,
}) => {
  return (
    <>
      {recentReads.map((item) => (
        <View key={item.id} style={styles.recentReadRow}>
          <View style={styles.recentReadImage} />
          <View style={{ flex: 1 }}>
            <Text style={styles.recentReadTitle}>{item.title}</Text>
            <Text style={styles.recentReadChapter}>{item.chapter}</Text>
            <View style={styles.progressBarBg}>
              <View
                style={[styles.progressBar, { width: `${30 + item.id * 20}%` }]}
              />
            </View>
          </View>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
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
});

export default RecentReadsSection;


