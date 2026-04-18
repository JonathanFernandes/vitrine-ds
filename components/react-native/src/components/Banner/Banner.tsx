import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { useTheme } from '../../theme';
import { Dotnav, DotnavStyle } from '../Dotnav';

export interface BannerProps {
  imageSource: ImageSourcePropType;
  imageAccessibilityLabel?: string;
  slideCount: number;
  currentSlide: number;
  onSlideChange?: (index: number) => void;
  width?: number;
  imageHeight?: number;
  dotnavStyle?: DotnavStyle;
}

export function Banner({
  imageSource,
  imageAccessibilityLabel,
  slideCount,
  currentSlide,
  onSlideChange,
  width,
  imageHeight = 211,
  dotnavStyle = 'default',
}: BannerProps) {
  const { banner } = useTheme();
  const { width: windowWidth } = useWindowDimensions();
  const resolvedWidth = width ?? windowWidth;

  return (
    <View
      style={[
        styles.root,
        {
          width: resolvedWidth,
          backgroundColor: banner.bg,
        },
      ]}
    >
      <Image
        source={imageSource}
        accessibilityLabel={imageAccessibilityLabel}
        style={[styles.image, { width: resolvedWidth, height: imageHeight }]}
        resizeMode="cover"
      />

      <Pressable
        onPress={() => {
          if (!onSlideChange || slideCount < 2) {
            return;
          }
          onSlideChange((currentSlide + 1) % slideCount);
        }}
        accessibilityRole="none"
      >
        <Dotnav
          style={dotnavStyle}
          slideCount={slideCount}
          currentSlide={currentSlide}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingBottom: 16,
    gap: 16,
  },
  image: {
    borderRadius: 0,
  },
});
