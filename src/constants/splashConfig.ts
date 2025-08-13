export const splashConfig = {
  // Display duration in milliseconds
  duration: 3000,

  // App branding
  appName: "Vũ trụ Truyện",
  tagline: "Your Gateway to Amazing Stories",

  // Colors
  colors: {
    background: "#ffffff",
    primary: "#4a9eff",
    text: "#333333",
    textSecondary: "#666666",
    loadingBarBackground: "#e0e0e0",
    loadingDotActive: "#2D2D2D",
    loadingDotInactive: "#D9D9D9",
  },

  // Animation settings
  animations: {
    fadeInDuration: 1200,
    scaleDuration: 1200,
    loadingBarDuration: 2500,
    dotAnimationDuration: 400,
  },

  // Logo settings
  logo: {
    size: 0.8, // Percentage of screen width
    source: require("../../assets/images/splash/splash-image.png"),
  },
};
