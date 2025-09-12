import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import RenderHtml from "react-native-render-html";
import { Story } from "../../types/story";

const { width } = Dimensions.get("window");

interface SummaryContentProps {
  story: Story;
}

const SummaryContent: React.FC<SummaryContentProps> = ({ story }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Giới thiệu</Text>
      <RenderHtml
        contentWidth={width - 32}
        source={{
          html:
            story.description ||
            "Mô tả truyện sẽ được cập nhật sớm. Hãy đọc và khám phá câu chuyện thú vị này!",
        }}
        tagsStyles={{
          p: styles.introductionText,
          div: styles.introductionText,
          span: styles.introductionText,
          br: { marginBottom: 8 },
        }}
        baseStyle={styles.introductionText}
      />
      {/* Detailed Information */}
      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Thông tin chi tiết</Text>
        <View style={styles.detailsList}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Tác giả:</Text>
            <Text style={styles.detailValue}>
              {story.author?.name || "Chưa cập nhật"}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Thể loại:</Text>
            <Text style={styles.detailValue}>
              {story.genres && story.genres.slice(0, 2).join(", ")}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Trạng thái:</Text>
            <Text style={styles.detailValue}>{story.status}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Số chương:</Text>
            <Text style={styles.detailValue}>{story.chapters}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Xuất bản:</Text>
            <Text style={styles.detailValue}>{story.publishedDate}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Cập nhật:</Text>
            <Text style={styles.detailValue}>{story.updatedDate}</Text>
          </View>
        </View>
      </View>
      {/* Tags Section */}
      <View style={styles.tagsSection}>
        <Text style={styles.sectionTitle}>Thẻ</Text>
        <View style={styles.tagsContainer}>
          {story.tags &&
            story.tags.map((tag: string, index: number) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
        </View>
      </View>
      {/* About Author Section */}
      <View style={styles.authorSection}>
        <Text style={styles.sectionTitle}>Về tác giả</Text>
        <View style={styles.authorInfo}>
          <Image
            source={{
              uri: "https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-1697898655.jpg",
            }}
            style={styles.authorAvatar}
          />
          <View style={styles.authorDetails}>
            <Text style={styles.authorName}>
              {story.author?.name || "Chưa cập nhật"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  introductionText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#333",
    textAlign: "justify",
  },
  // Detailed Information styles
  detailsSection: {
    marginTop: 24,
  },
  detailsList: {
    gap: 12,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "400",
    flex: 2,
    textAlign: "right",
  },
  // Tags Section styles
  tagsSection: {
    marginTop: 24,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  // Author Section styles
  authorSection: {
    marginTop: 24,
  },
  authorInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  authorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  authorDetails: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});

export default SummaryContent;
