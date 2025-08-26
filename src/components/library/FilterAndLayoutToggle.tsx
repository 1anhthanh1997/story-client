import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { ExpandIcon, FilterIcon, GridIcon, ListIcon } from "components/icons";

interface FilterAndLayoutToggleProps {
  isGridLayout: boolean;
  onLayoutChange: (isGrid: boolean) => void;
  onFilterPress: () => void;
  onFilterChange?: (filters: FilterOptions) => void;
}

interface FilterOptions {
  sortBy: "newest" | "oldest" | "views" | "rating";
  status: "all" | "ongoing" | "completed";
}

const FilterPopup: React.FC<{
  visible: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}> = ({ visible, onClose, filters, onFilterChange }) => {
  const handleSortChange = (sortBy: FilterOptions["sortBy"]) => {
    onFilterChange({ ...filters, sortBy });
  };

  const handleStatusChange = (status: FilterOptions["status"]) => {
    onFilterChange({ ...filters, status });
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.popupContainer}>
              {/* Sort by section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Sắp xếp theo</Text>
                <View style={styles.optionsContainer}>
                  <TouchableOpacity
                    style={styles.optionRow}
                    onPress={() => handleSortChange("newest")}
                  >
                    <View
                      style={[
                        styles.radioButton,
                        filters.sortBy === "newest" &&
                          styles.radioButtonSelected,
                      ]}
                    >
                      {filters.sortBy === "newest" && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>
                    <Text style={styles.optionText}>Mới nhất</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.optionRow}
                    onPress={() => handleSortChange("oldest")}
                  >
                    <View
                      style={[
                        styles.radioButton,
                        filters.sortBy === "oldest" &&
                          styles.radioButtonSelected,
                      ]}
                    >
                      {filters.sortBy === "oldest" && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>
                    <Text style={styles.optionText}>Cũ nhất</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.optionRow}
                    onPress={() => handleSortChange("views")}
                  >
                    <View
                      style={[
                        styles.radioButton,
                        filters.sortBy === "views" &&
                          styles.radioButtonSelected,
                      ]}
                    >
                      {filters.sortBy === "views" && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>
                    <Text style={styles.optionText}>Lượt xem</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.optionRow}
                    onPress={() => handleSortChange("rating")}
                  >
                    <View
                      style={[
                        styles.radioButton,
                        filters.sortBy === "rating" &&
                          styles.radioButtonSelected,
                      ]}
                    >
                      {filters.sortBy === "rating" && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>
                    <Text style={styles.optionText}>Đánh giá</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Separator */}
              <View style={styles.separator} />

              {/* Status section */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Trạng thái</Text>
                <View style={styles.optionsContainer}>
                  <TouchableOpacity
                    style={styles.optionRow}
                    onPress={() => handleStatusChange("all")}
                  >
                    <View
                      style={[
                        styles.radioButton,
                        filters.status === "all" && styles.radioButtonSelected,
                      ]}
                    >
                      {filters.status === "all" && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>
                    <Text style={styles.optionText}>Tất cả</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.optionRow}
                    onPress={() => handleStatusChange("ongoing")}
                  >
                    <View
                      style={[
                        styles.radioButton,
                        filters.status === "ongoing" &&
                          styles.radioButtonSelected,
                      ]}
                    >
                      {filters.status === "ongoing" && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>
                    <Text style={styles.optionText}>Đang ra</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.optionRow}
                    onPress={() => handleStatusChange("completed")}
                  >
                    <View
                      style={[
                        styles.radioButton,
                        filters.status === "completed" &&
                          styles.radioButtonSelected,
                      ]}
                    >
                      {filters.status === "completed" && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>
                    <Text style={styles.optionText}>Hoàn thành</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const FilterAndLayoutToggle: React.FC<FilterAndLayoutToggleProps> = ({
  isGridLayout,
  onLayoutChange,
  onFilterPress,
  onFilterChange,
}) => {
  const [isFilterPopupVisible, setIsFilterPopupVisible] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: "newest",
    status: "all",
  });

  const handleFilterPress = () => {
    setIsFilterPopupVisible(true);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleClosePopup = () => {
    setIsFilterPopupVisible(false);
  };

  return (
    <>
      <View style={styles.filterSection}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={handleFilterPress}
        >
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

      <FilterPopup
        visible={isFilterPopupVisible}
        onClose={handleClosePopup}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </>
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
  // Popup styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    maxWidth: 320,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  optionsContainer: {
    gap: 12,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D9D9D9",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#3B82F6",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3B82F6",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 20,
  },
});

export default FilterAndLayoutToggle;
