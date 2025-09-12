import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface Review {
  _id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  date: string;
  likes: number;
  isLiked: boolean;
}

interface ReviewsListProps {
  reviews: Review[];
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  const handleLikePress = (reviewId: string) => {
    // TODO: Implement like functionality
    console.log("Like review:", reviewId);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Text
        key={i}
        style={[
          styles.starIcon,
          i < rating ? styles.starFilled : styles.starEmpty,
        ]}
      >
        ★
      </Text>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Đánh giá</Text>
      <View style={styles.reviewsList}>
        {reviews.map((review) => (
          <View key={review._id} style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <Image
                source={{ uri: review.user.avatar }}
                style={styles.reviewAvatar}
              />
              <View style={styles.reviewUserInfo}>
                <Text style={styles.reviewUserName}>{review.user.name}</Text>
                <View style={styles.reviewRating}>
                  {renderStars(review.rating)}
                </View>
              </View>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
            <View style={styles.reviewActions}>
              <TouchableOpacity
                style={styles.likeButton}
                onPress={() => handleLikePress(review._id)}
              >
                <Text
                  style={[
                    styles.likeButtonText,
                    review.isLiked && styles.likeButtonTextActive,
                  ]}
                >
                  👍 {review.likes}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  reviewsList: {
    gap: 16,
  },
  reviewItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewUserInfo: {
    flex: 1,
  },
  reviewUserName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: "row",
    gap: 2,
  },
  starIcon: {
    fontSize: 16,
  },
  starFilled: {
    color: "#FFD700",
  },
  starEmpty: {
    color: "#ddd",
  },
  reviewDate: {
    fontSize: 12,
    color: "#666",
  },
  reviewComment: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  likeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
  },
  likeButtonText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  likeButtonTextActive: {
    color: "#007AFF",
  },
});

export default ReviewsList;
