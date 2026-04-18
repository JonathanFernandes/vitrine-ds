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

export interface EventCardTag {
  label: string;
  status:
    | 'neutral-1'
    | 'neutral-2'
    | 'neutral-3'
    | 'success'
    | 'info'
    | 'warning'
    | 'error';
}

export interface EventCardProps {
  imageUrl: string;
  title: string;
  date: string;
  tags: EventCardTag[];
  onPress?: () => void;
  accessibilityLabel?: string;
}

/**
 * Event card used in highlight sections and horizontal carousels.
 * Matches Figma node 7229:6016 and reuses Badge small instances for tags.
 */
export function EventCard({
  imageUrl,
  title,
  date,
  tags,
  onPress,
  accessibilityLabel,
}: EventCardProps) {
  const { eventCard } = useTheme();

  const content = (
    <View
      style={[
        styles.card,
        {
          backgroundColor: eventCard.bg,
          borderColor: eventCard.border,
          borderRadius: eventCard.radius,
        },
      ]}
    >
      <View
        style={[
          styles.imageWrap,
          {
            borderTopLeftRadius: eventCard.radius,
            borderTopRightRadius: eventCard.radius,
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
              borderTopLeftRadius: eventCard.radius,
              borderTopRightRadius: eventCard.radius,
            },
          ]}
        />
      </View>

      <View style={styles.info}>
        <View style={styles.tagsRow}>
          {tags.map((tag, index) => (
            <Badge
              key={`${tag.label}-${index}`}
              status={tag.status as BadgeStatus}
              size="small"
              label={tag.label}
              leftIcon={null}
              rightIcon={null}
            />
          ))}
        </View>

        <View style={styles.details}>
          <View style={styles.dateRow}>
            <CalendarIcon color={eventCard.icon} size={16} />
            <Text style={[styles.date, { color: eventCard.date }]}>{date}</Text>
          </View>

          <Text
            numberOfLines={2}
            style={[styles.title, { color: eventCard.title }]}
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
        accessibilityLabel={accessibilityLabel ?? `${title} - ${date}`}
        style={styles.root}
      >
        {content}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? `${title} - ${date}`}
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
    height: 110,
    overflow: 'hidden',
  },
  image: {
    width: 270,
    height: 110,
  },
  info: {
    height: 144,
    padding: 16,
    gap: 16,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    flexWrap: 'wrap',
  },
  details: {
    gap: 8,
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
