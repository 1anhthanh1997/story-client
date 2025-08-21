import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "../../constants/fonts";

// Mock data for reading history
const mockReadingHistory = [
  {
    id: 1,
    title: "Recent Read 1",
    lastRead: "2 hours ago",
    coverColor: "#FF6B6B",
  },
  {
    id: 2,
    title: "Recent Read 2",
    lastRead: "2 hours ago",
    coverColor: "#4ECDC4",
  },
  {
    id: 3,
    title: "Recent Read 3",
    lastRead: "2 hours ago",
    coverColor: "#45B7D1",
  },
];

const PersonalScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <View style={styles.hamburgerIcon}>
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
            <View style={styles.hamburgerLine} />
          </View>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Vũ trụ truyện</Text>

        <TouchableOpacity style={styles.searchButton}>
          <View style={styles.searchIcon}>
            <View style={styles.searchCircle} />
            <View style={styles.searchHandle} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>😊</Text>
              </View>
            </View>

            <View style={styles.userDetails}>
              <Text style={styles.userName}>Minh Anh</Text>
              <Text style={styles.userUsername}>@minhanh2025</Text>
            </View>
          </View>

          {/* Statistics Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>245</Text>
              <Text style={styles.statLabel}>Reading</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>180</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>56</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>
        </View>

        {/* Reading History Section */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Reading History</Text>

          {mockReadingHistory.map((item) => (
            <View key={item.id} style={styles.historyItem}>
              <View
                style={[
                  styles.historyCover,
                  { backgroundColor: item.coverColor },
                ]}
              >
                <Text style={styles.coverPlaceholder}>📚</Text>
              </View>

              <View style={styles.historyContent}>
                <Text style={styles.historyTitle}>{item.title}</Text>
                <Text style={styles.historyTime}>
                  Last read: {item.lastRead}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  menuButton: {
    padding: 8,
  },
  hamburgerIcon: {
    width: 24,
    height: 18,
    justifyContent: "space-between",
  },
  hamburgerLine: {
    width: "100%",
    height: 2,
    backgroundColor: "#333",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: fonts.styleScriptRegular,
    textAlign: "center",
    flex: 1,
  },
  searchButton: {
    padding: 8,
  },
  searchIcon: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  searchCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#333",
    position: "absolute",
  },
  searchHandle: {
    width: 8,
    height: 2,
    backgroundColor: "#333",
    position: "absolute",
    right: 2,
    top: 18,
    transform: [{ rotate: "45deg" }],
  },
  content: {
    flex: 1,
  },
  profileSection: {
    padding: 20,
    backgroundColor: "#fff",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#e0e0e0",
  },
  avatarText: {
    fontSize: 32,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  userUsername: {
    fontSize: 16,
    color: "#666",
    fontFamily: fonts.styleScriptRegular,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3B82F6",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  historySection: {
    padding: 20,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
  },
  historyCover: {
    width: 60,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  coverPlaceholder: {
    fontSize: 24,
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  historyTime: {
    fontSize: 14,
    color: "#666",
  },
});

export default PersonalScreen;
