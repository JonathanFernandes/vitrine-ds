import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '../../theme';

export interface MoviePosterProps {
  imageUrl: string;
  title: string;
  date: string;
  onPress?: () => void;
  accessibilityLabel?: string;
}

export function MoviePoster({
  imageUrl,
  title,
  date,
  onPress,
  accessibilityLabel,
}: MoviePosterProps) {
  const { moviePoster } = useTheme();
  const content = (
    <View style={styles.content}>
      <View style={styles.posterWrapper}>
        <Image
          accessibilityElementsHidden
          resizeMode="cover"
          source={{ uri: imageUrl }}
          style={[
            styles.posterImage,
            {
              borderRadius: moviePoster.radius,
            },
          ]}
        />
        <Text
          style={[
            styles.date,
            {
              color: moviePoster.text,
            },
          ]}
        >
          {date}
        </Text>
      </View>

      <Text
        numberOfLines={2}
        style={[
          styles.title,
          {
            color: moviePoster.text,
          },
        ]}
      >
        {title}
      </Text>
    </View>
  );

  if (!onPress) {
    return (
      <View
        accessibilityRole="image"
        accessibilityLabel={accessibilityLabel ?? `${title} - Estreia ${date}`}
        style={styles.root}
      >
        {content}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="imagebutton"
      accessibilityLabel={accessibilityLabel ?? `${title} - Estreia ${date}`}
      onPress={onPress}
      style={styles.root}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 180,
    overflow: 'visible',
  },
  content: {
    gap: 8,
  },
  posterWrapper: {
    width: 180,
    height: 264,
    position: 'relative',
  },
  posterImage: {
    width: 180,
    height: 264,
  },
  date: {
    position: 'absolute',
    top: 236,
    left: 0,
    width: 180,
    textAlign: 'center',
    fontFamily: 'BeVietnamPro_700Bold',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    textShadowColor: 'rgba(82, 100, 122, 0.25)',
    textShadowOffset: { width: 0, height: 16 },
    textShadowRadius: 32,
    includeFontPadding: false,
  },
  title: {
    width: 180,
    textAlign: 'center',
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14.4,
    includeFontPadding: false,
  },
});
