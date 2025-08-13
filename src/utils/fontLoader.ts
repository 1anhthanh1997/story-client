import * as Font from "expo-font";

export const loadFonts = async () => {
  try {
    // console.log("🔄 Starting font loading...");

    // Try different possible font family names
    const fontFamilyNames = [
      "StyleScript-Regular",
      "Style Script",
      "StyleScript",
      "Style_Script",
    ];

    // console.log("🎯 Trying font family names:", fontFamilyNames);

    const fontLoadResult = await Font.loadAsync({
      "StyleScript-Regular": require("../../assets/fonts/StyleScript-Regular.ttf"),
    });

    // console.log("✅ Fonts loaded successfully:", fontLoadResult);

    // Check all possible font family names
    // for (const fontName of fontFamilyNames) {
    //   const isLoaded = Font.isLoaded(fontName);
    //   console.log(`🔍 Font "${fontName}" loaded:`, isLoaded);
    // }

    return fontLoadResult;
  } catch (error) {
    console.error("❌ Error loading fonts:", error);
    throw error;
  }
};

export const fontsLoaded = Font.isLoaded;
