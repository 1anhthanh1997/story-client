import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, typography } from "../../constants/theme";
import { SearchIcon } from "components/icons";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Tìm kiếm trong thư viện",
  onSubmit,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchIconContainer}>
        <SearchIcon />
      </View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    height: 32,
    width: "100%",
  },
  searchIconContainer: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: typography.fontSizes.medium,
    color: "red",
  },
});
