import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { Navigation } from "./src/navigation";
import { store } from "./src/store";
import { loadFonts } from "./src/utils/fontLoader";

export default function App() {
  const [fontsAreLoaded, setFontsAreLoaded] = useState(false);
  const [fontLoadingError, setFontLoadingError] = useState<string | null>(null);

  useEffect(() => {
    const loadAppFonts = async () => {
      try {
        await loadFonts();

        // Check if font is actually loaded
        setFontsAreLoaded(true);
      } catch (error) {
        console.error("💥 Font loading failed:", error);
        setFontLoadingError(
          error instanceof Error ? error.message : "Font loading failed"
        );
        // Still set fonts as loaded to prevent infinite loading
        setFontsAreLoaded(true);
      }
    };

    loadAppFonts();
  }, []);

  if (!fontsAreLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a9eff" />
        <Text style={styles.loadingText}>Loading fonts...</Text>
      </View>
    );
  }

  if (fontLoadingError) {
    console.warn("⚠️ Font loading warning:", fontLoadingError);
  }

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "#ffffff",
    marginTop: 20,
    fontSize: 16,
  },
});
