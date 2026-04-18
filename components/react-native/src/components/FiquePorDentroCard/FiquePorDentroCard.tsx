import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Badge, BadgeStatus } from '../Badge';
import { CalendarIcon } from '../Shortcuts/icons';
import { useTheme } from '../../theme';

export interface FiquePorDentroCardBadge {
  label: string;
  variant: 'neutral-1' | 'neutral-2';
}

export interface FiquePorDentroCardProps {
  imageUrl: string;
  title: string;
  date?: string;
  badges?: FiquePorDentroCardBadge[];
  onPress?: () => void;
  accessibilityLabel?: string;
}

/**
 * Editorial card for the "Fique por Dentro" section.
 * Base variant shows image and title, with optional date and badges.
 */
export function FiquePorDentroCard({
  imageUrl,
  title,
  date,
  badges,
  onPress,
  accessibilityLabel,
}: FiquePorDentroCardProps) {
  const { fiquePorDentroCard } = useTheme();
  const hasBadges = Boolean(badges && badges.length > 0);
  const hasDate = Boolean(date);

  const content = (
    <View
      style={[
        styles.card,
        {
          backgroundColor: fiquePorDentroCard.bg,
          borderColor: fiquePorDentroCard.border,
          borderRadius: fiquePorDentroCard.radius,
        },
      ]}
    >
      <View
        style={[
          styles.imageWrap,
          {
            borderTopLeftRadius: fiquePorDentroCard.radius,
            borderTopRightRadius: fiquePorDentroCard.radius,
          },
        ]}
      >
        <Image
          accessibilityElementsHidden
          resizeMode="cover"
          source={{ uri: imageUrl }}
          style={[
            styles.image,
            {
              borderTopLeftRadius: fiquePorDentroCard.radius,
              borderTopRightRadius: fiquePorDentroCard.radius,
            },
          ]}
        />
      </View>

      <View style={styles.content}>
        {hasBadges ? (
          <View style={styles.badgesRow}>
            {badges!.map((badge, index) => (
              <Badge
                key={`${badge.label}-${index}`}
                status={badge.variant as BadgeStatus}
                size="small"
                label={badge.label}
                leftIcon={null}
                rightIcon={null}
              />
            ))}
          </View>
        ) : null}

        <View style={styles.textArea}>
          {hasDate ? (
            <View style={styles.dateRow}>
              <CalendarIcon color={fiquePorDentroCard.icon} size={16} />
              <Text style={[styles.date, { color: fiquePorDentroCard.date }]}>
                {date}
              </Text>
            </View>
          ) : null}

          <Text
            numberOfLines={2}
            style={[styles.title, { color: fiquePorDentroCard.title }]}
          >
            {title}
          </Text>
        </View>
      </View>
    </View>
  );

  if (!onPress) {
    return (
      <View
        accessibilityRole="image"
        accessibilityLabel={accessibilityLabel ?? title}
        style={styles.root}
      >
        {content}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [styles.root, pressed && styles.pressed]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 270,
  },
  card: {
    width: 270,
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageWrap: {
    width: 270,
    height: 140,
    overflow: 'hidden',
  },
  image: {
    width: 270,
    height: 140,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    flexWrap: 'wrap',
  },
  textArea: {
    gap: 8,
    width: '100%',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  date: {
    flex: 1,
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14.4,
    includeFontPadding: false,
  },
  title: {
    width: '100%',
    fontFamily: 'BeVietnamPro_700Bold',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    includeFontPadding: false,
  },
  pressed: {
    opacity: 0.85,
  },
});
