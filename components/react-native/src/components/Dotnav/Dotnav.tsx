import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme';

export type DotnavStyle = 'default' | 'negative';

export interface DotnavProps {
  style?: DotnavStyle;
  slideCount: number;
  currentSlide: number;
  width?: number;
  testID?: string;
  accessibilityLabel?: string;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function Dotnav({
  style = 'default',
  slideCount,
  currentSlide,
  width,
  testID,
  accessibilityLabel,
}: DotnavProps) {
  const { dotnav } = useTheme();
  const clampedSlideCount = clamp(slideCount, 2, 6);
  const clampedCurrentSlide = clamp(currentSlide, 0, clampedSlideCount - 1);
  const containerWidth = width ?? (clampedSlideCount <= 3 ? 112 : 172);
  const gap = 8;
  const barWidth = (containerWidth - (clampedSlideCount - 1) * gap) / clampedSlideCount;
  const activeColor =
    style === 'negative' ? dotnav.active.negative : dotnav.active.default;
  const inactiveColor =
    style === 'negative' ? dotnav.inactive.negative : dotnav.inactive.default;

  return (
    <View
      accessibilityRole="adjustable"
      accessibilityLabel={
        accessibilityLabel ?? `Página ${clampedCurrentSlide + 1} de ${clampedSlideCount}`
      }
      accessibilityValue={{
        min: 1,
        max: clampedSlideCount,
        now: clampedCurrentSlide + 1,
      }}
      style={[styles.root, { width: containerWidth }]}
      testID={testID}
    >
      {Array.from({ length: clampedSlideCount }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.bar,
            {
              width: barWidth,
              backgroundColor: index <= clampedCurrentSlide ? activeColor : inactiveColor,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 4,
  },
  bar: {
    height: 4,
    borderRadius: 2,
  },
});
