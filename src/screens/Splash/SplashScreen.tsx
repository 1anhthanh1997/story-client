import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { fonts } from "../../constants/fonts";
import { splashConfig } from "../../constants/splashConfig";

const { width, height } = Dimensions.get("window");

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const loadingAnim = useRef(new Animated.Value(0)).current;
  const dotAnim1 = useRef(new Animated.Value(0)).current;
  const dotAnim2 = useRef(new Animated.Value(0)).current;
  const dotAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start main animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: splashConfig.animations.fadeInDuration,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Start loading bar animation
    Animated.timing(loadingAnim, {
      toValue: 1,
      duration: splashConfig.animations.loadingBarDuration,
      useNativeDriver: false,
    }).start();

    // Animate loading dots
    const animateDots = () => {
      Animated.sequence([
        Animated.timing(dotAnim1, {
          toValue: 1,
          duration: splashConfig.animations.dotAnimationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(dotAnim2, {
          toValue: 1,
          duration: splashConfig.animations.dotAnimationDuration,
          useNativeDriver: true,
        }),
        Animated.timing(dotAnim3, {
          toValue: 1,
          duration: splashConfig.animations.dotAnimationDuration,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Reset dots and repeat
        dotAnim1.setValue(0);
        dotAnim2.setValue(0);
        dotAnim3.setValue(0);
        animateDots();
      });
    };

    animateDots();

    // Auto navigate after configured duration
    const timer = setTimeout(() => {
      onFinish();
    }, splashConfig.duration);

    return () => clearTimeout(timer);
  }, [
    fadeAnim,
    scaleAnim,
    loadingAnim,
    dotAnim1,
    dotAnim2,
    dotAnim3,
    onFinish,
  ]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image
          source={splashConfig.logo.source}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>{splashConfig.appName}</Text>
      </Animated.View>

      {/* Loading indicator */}
      <View style={styles.loadingContainer}>
        <Animated.View
          style={[
            styles.loadingDotInactive,
            {
              opacity: dotAnim1,
              backgroundColor: dotAnim1.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  splashConfig.colors.loadingDotInactive,
                  splashConfig.colors.loadingDotActive,
                ],
              }),
              transform: [
                {
                  scale: dotAnim1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.loadingDotInactive,
            {
              opacity: dotAnim2,
              backgroundColor: dotAnim2.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  splashConfig.colors.loadingDotInactive,
                  splashConfig.colors.loadingDotActive,
                ],
              }),
              transform: [
                {
                  scale: dotAnim2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.loadingDotInactive,
            {
              opacity: dotAnim3,
              backgroundColor: dotAnim3.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  splashConfig.colors.loadingDotInactive,
                  splashConfig.colors.loadingDotActive,
                ],
              }),
              transform: [
                {
                  scale: dotAnim3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: splashConfig.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: width * splashConfig.logo.size,
    height: width * splashConfig.logo.size,
    marginBottom: 20,
  },
  appName: {
    fontSize: 40,
    color: splashConfig.colors.text,
    textAlign: "center",
    // Use Style Script font with fallback
    fontFamily: fonts.styleScriptRegular,
  },
  loadingContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: splashConfig.colors.loadingDotActive, // Active dot color
    marginHorizontal: 4,
  },
  loadingDotInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: splashConfig.colors.loadingDotInactive, // Inactive dot color
    marginHorizontal: 4,
  },
});

export default SplashScreen;
