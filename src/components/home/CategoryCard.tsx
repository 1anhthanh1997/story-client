import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CategoryCardProps {
  name: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name }) => (
  <View style={styles.categoryCard}>
    <View style={styles.categoryIcon} />
    <Text style={styles.categoryText}>{name}</Text>
  </View>
);

const styles = StyleSheet.create({
  categoryCard: {
    width: "100%",
    aspectRatio: 1.2,
    backgroundColor: "#f5f8fa",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryIcon: {
    width: 32,
    height: 32,
    backgroundColor: "#d1d8e0",
    borderRadius: 8,
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "500",
  },
});

export default CategoryCard;
