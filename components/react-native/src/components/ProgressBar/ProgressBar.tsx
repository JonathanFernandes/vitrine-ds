import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, LayoutChangeEvent, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';

export type ProgressBarSize = 'small' | 'medium' | 'large';
export type ProgressBarColor = 'primary' | 'success' | 'disabled';

export interface ProgressBarProps {
  progress: number;
  size?: ProgressBarSize;
  color?: ProgressBarColor;
  accessibilityLabel?: string;
  animated?: boolean;
  animationDuration?: number;
  width?: number | string;
}

const SIZE_HEIGHT: Record<ProgressBarSize, number> = {
  small: 4,
  medium: 8,
  large: 12,
};

function clampProgress(progress: number) {
  return Math.min(100, Math.max(0, progress));
}

export function ProgressBar({
  progress,
  size = 'small',
  color = 'primary',
  accessibilityLabel = 'Barra de progresso',
  animated = true,
  animationDuration = 300,
  width = '100%',
}: ProgressBarProps) {
  const { progressBar } = useTheme();
  const [trackWidth, setTrackWidth] = useState(0);
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const clampedProgress = clampProgress(progress);
  const height = SIZE_HEIGHT[size];
  const fillColor = progressBar.fill[color];

  const rootStyle = useMemo<ViewStyle>(
    () => ({
      width: width as ViewStyle['width'],
    }),
    [width],
  );

  useEffect(() => {
    if (!trackWidth) {
      return;
    }

    const nextWidth = (trackWidth * clampedProgress) / 100;

    if (!animated) {
      animatedWidth.setValue(nextWidth);
      return;
    }

    Animated.timing(animatedWidth, {
      toValue: nextWidth,
      duration: animationDuration,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [animated, animatedWidth, animationDuration, clampedProgress, trackWidth]);

  function handleLayout(event: LayoutChangeEvent) {
    const { width: measuredWidth } = event.nativeEvent.layout;
    if (measuredWidth !== trackWidth) {
      setTrackWidth(measuredWidth);
    }
  }

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: 100, now: clampedProgress }}
      style={rootStyle}
    >
      <View
        onLayout={handleLayout}
        style={[
          styles.trackContainer,
          {
            height,
            borderRadius: 999,
            backgroundColor: progressBar.track,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.fill,
            {
              height,
              width: trackWidth ? animatedWidth : `${clampedProgress}%`,
              borderRadius: 999,
              backgroundColor: fillColor,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  trackContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    minWidth: 0,
  },
});
