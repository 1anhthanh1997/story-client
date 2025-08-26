import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ExpandIcon, FilterIcon, GridIcon, ListIcon } from "components/icons";

interface FilterAndLayoutToggleProps {
  isGridLayout: boolean;
  onLayoutChange: (isGrid: boolean) => void;
  onFilterPress: () => void;
}

const FilterAndLayoutToggle: React.FC<FilterAndLayoutToggleProps> = ({
  isGridLayout,
  onLayoutChange,
  onFilterPress,
}) => {
  return (
    <View style={styles.filterSection}>
      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
        <FilterIcon />
        <Text style={styles.filterButtonText}>Lọc</Text>
        <ExpandIcon />
      </TouchableOpacity>

      <View style={styles.layoutToggle}>
        <TouchableOpacity
          style={[
            styles.layoutButton,
            isGridLayout && styles.layoutButtonActive,
          ]}
          onPress={() => onLayoutChange(true)}
        >
          <GridIcon color={isGridLayout ? "#fff" : "#000"} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.layoutButton,
            !isGridLayout && styles.layoutButtonActive,
          ]}
          onPress={() => onLayoutChange(false)}
        >
          <ListIcon color={!isGridLayout ? "#fff" : "#000"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterSection: {
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 8,
    gap: 8,
  },
  filterButtonText: {
    fontSize: 16,
    color: "#333",
  },
  layoutToggle: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 4,
    gap: 8,
  },
  layoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D9D9D9",
  },
  layoutButtonActive: {
    backgroundColor: "#3B82F6",
    borderColor: "transparent",
  },
});

export default FilterAndLayoutToggle;
