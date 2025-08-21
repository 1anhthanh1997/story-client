import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/theme";

interface SideDrawerProps {
  isVisible: boolean;
  onClose: () => void;
}

const { width: screenWidth } = Dimensions.get("window");
const DRAWER_WIDTH = screenWidth * 0.8;

const SideDrawer: React.FC<SideDrawerProps> = ({ isVisible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      // Show drawer
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Hide drawer
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -DRAWER_WIDTH,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible, slideAnim, fadeAnim]);

  const handleBackdropPress = () => {
    onClose();
  };

  const handleMenuItemPress = (route: string) => {
    // Handle navigation here
    console.log(`Navigating to: ${route}`);
    onClose();
  };

  const handleCategoryPress = (category: string) => {
    // Handle category selection
    console.log(`Selected category: ${category}`);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      {/* Backdrop */}
      <Animated.View
        style={[
          styles.backdrop,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backdropTouchable}
          onPress={handleBackdropPress}
        />
      </Animated.View>

      {/* Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        {/* Header */}
        <View style={styles.drawerHeader}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.drawerTitle}>Menu</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <ScrollView
          style={styles.menuContainer}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuItemPress("home")}
          >
            <Text style={styles.menuItemText}>🏠 Trang chủ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.selectedMenuItem]}
            onPress={() => handleMenuItemPress("categories")}
          >
            <Text style={[styles.menuItemText, styles.selectedMenuItemText]}>
              🔲 Thể loại
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuItemPress("explore")}
          >
            <Text style={styles.menuItemText}>🧭 Khám phá</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuItemPress("settings")}
          >
            <Text style={styles.menuItemText}>⚙️ Cài đặt</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuItemPress("help")}
          >
            <Text style={styles.menuItemText}>❓ Trợ giúp</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuItemPress("about")}
          >
            <Text style={styles.menuItemText}>ℹ️ Về chúng tôi</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuItemPress("logout")}
          >
            <Text style={styles.menuItemText}>↪️ Đăng xuất</Text>
          </TouchableOpacity>

          {/* Category Buttons Section */}
          <View style={styles.categorySection}>
            <Text style={styles.categorySectionTitle}>Thể loại</Text>
            <View style={styles.categoryGrid}>
              <TouchableOpacity
                style={styles.categoryButton}
                onPress={() => handleCategoryPress("ancient")}
              >
                <View style={styles.categoryButtonContent}>
                  <Text style={styles.categoryIcon}>💰</Text>
                  <Text style={styles.categoryText}>Cổ Đại</Text>
                  <Text style={styles.categoryArrow}>›</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.categoryButton}
                onPress={() => handleCategoryPress("modern")}
              >
                <View style={styles.categoryButtonContent}>
                  <Text style={styles.categoryIcon}>💰</Text>
                  <Text style={styles.categoryText}>Hiện Đại</Text>
                  <Text style={styles.categoryArrow}>›</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.categoryButton}
                onPress={() => handleCategoryPress("horror")}
              >
                <View style={styles.categoryButtonContent}>
                  <Text style={styles.categoryIcon}>💰</Text>
                  <Text style={styles.categoryText}>Linh Dị</Text>
                  <Text style={styles.categoryArrow}>›</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.categoryButton}
                onPress={() => handleCategoryPress("teen")}
              >
                <View style={styles.categoryButtonContent}>
                  <Text style={styles.categoryIcon}>💰</Text>
                  <Text style={styles.categoryText}>Truyện Teen</Text>
                  <Text style={styles.categoryArrow}>›</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backdropTouchable: {
    flex: 1,
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: DRAWER_WIDTH,
    height: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: fonts.styleScriptRegular,
    color: "#333",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
  menuContainer: {
    flex: 1,
    paddingTop: 10,
  },
  menuItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  selectedMenuItem: {
    backgroundColor: "#E3F2FD",
  },
  menuItemText: {
    fontSize: 18,
    fontFamily: fonts.styleScriptRegular,
    color: "#333",
  },
  selectedMenuItemText: {
    color: colors.primary,
    fontWeight: "bold",
  },
  categorySection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  categorySectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: fonts.styleScriptRegular,
    color: "#333",
    marginBottom: 15,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryButton: {
    width: "48%",
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  categoryButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    justifyContent: "space-between",
  },
  categoryIcon: {
    fontSize: 16,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: fonts.styleScriptRegular,
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  categoryArrow: {
    fontSize: 18,
    color: "#666",
    fontWeight: "bold",
  },
});

export default SideDrawer;
