import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '../../theme';

export interface CardStoreItemProps {
  storeName: string;
  logoUri?: string;
  onPress?: () => void;
  storeId?: string;
  disabled?: boolean;
}

export function CardStoreItem({
  storeName,
  logoUri,
  onPress,
  storeId,
  disabled = false,
}: CardStoreItemProps) {
  const { cardStoreItem } = useTheme();
  const content = (
    <View style={styles.content}>
      <View
        style={[
          styles.logoWrapper,
          {
            backgroundColor: cardStoreItem.logoBg,
            borderColor: cardStoreItem.logoBorder,
            borderRadius: cardStoreItem.radius,
          },
        ]}
      >
        <View
          style={[
            styles.logoInner,
            {
              backgroundColor: cardStoreItem.logoInnerBg,
              borderColor: cardStoreItem.logoInnerBorder,
              borderRadius: cardStoreItem.radius,
            },
          ]}
        >
          {logoUri ? (
            <Image
              source={{ uri: logoUri }}
              style={styles.logoImage}
              resizeMode="contain"
              accessibilityIgnoresInvertColors
            />
          ) : (
            <View
              style={[
                styles.logoPlaceholder,
                {
                  backgroundColor: cardStoreItem.imageFill,
                  borderColor: cardStoreItem.imageBorder,
                },
              ]}
            />
          )}
        </View>
      </View>

      <Text
        style={[styles.storeName, { color: cardStoreItem.name }]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {storeName}
      </Text>
    </View>
  );

  if (!onPress) {
    return <View style={styles.root}>{content}</View>;
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Loja ${storeName}`}
      disabled={disabled}
      onPress={onPress}
      testID={storeId}
      style={styles.root}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 64,
    height: 86,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logoWrapper: {
    width: 64,
    height: 64,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 0,
  },
  logoInner: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    overflow: 'hidden',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  logoPlaceholder: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
  },
  storeName: {
    width: 64,
    textAlign: 'center',
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    includeFontPadding: false,
  },
});
