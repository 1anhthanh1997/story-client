import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { fonts } from "constants/fonts";
import { useNavigation } from "@react-navigation/native";
import type { MainTabScreenProps } from "../../types/navigation";

const PanelSeeMore = ({
  children,
  title,
  sectionId,
}: {
  children: any;
  title: string;
  sectionId?: string;
}) => {
  const navigation =
    useNavigation<MainTabScreenProps<"AllStory">["navigation"]>();

  const handleSeeAllPress = () => {
    navigation.navigate("AllStory", { sectionId });
  };

  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity onPress={handleSeeAllPress}>
          <Text style={styles.seeAll}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: fonts.primaryFont,
  },
  seeAll: { color: "#007AFF", fontSize: 14, fontFamily: fonts.primaryFont },
});

export default PanelSeeMore;
