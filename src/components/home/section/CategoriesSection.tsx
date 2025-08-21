import React from "react";
import { View, StyleSheet } from "react-native";
import CategoryCard from "../CategoryCard";

interface CategoriesSectionProps {
  categories: string[];
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
}) => {
  return (
    <View style={styles.categoriesGrid}>
      {categories.map((name, idx) => (
        <View key={idx} style={styles.categoryItem}>
          <CategoryCard name={name} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryItem: {
    width: "30.87%", // Exact: (100% - 16px) / 3 = 30.67%
    marginBottom: 16,
  },
});

export default CategoriesSection;
