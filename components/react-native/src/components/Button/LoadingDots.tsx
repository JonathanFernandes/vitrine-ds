import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

// Matches Figma "Assets/loading-bullets-sm": 42×14px container, 3 dots
const DOT_SIZE = 10;
const DOT_GAP = 6; // 3×10 + 2×6 = 42px total width
const PULSE_DURATION = 400;
const STAGGER_DELAY = 160;

interface LoadingDotsProps {
  color: string;
}

export function LoadingDots({ color }: LoadingDotsProps) {
  const anims = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    const animations = anims.map((anim, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * STAGGER_DELAY),
          Animated.timing(anim, {
            toValue: 1,
            duration: PULSE_DURATION,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: PULSE_DURATION,
            useNativeDriver: true,
          }),
          // Pause before next cycle to let other dots finish
          Animated.delay(STAGGER_DELAY * (anims.length - 1 - i)),
        ]),
      ),
    );

    animations.forEach((a) => a.start());
    return () => animations.forEach((a) => a.stop());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      {anims.map((anim, i) => (
        <Animated.View
          key={i}
          style={[
            styles.dot,
            i > 0 && { marginLeft: DOT_GAP },
            {
              backgroundColor: color,
              opacity: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.35, 1],
              }),
              transform: [
                {
                  scale: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.6, 1],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
    height: 14,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
});
