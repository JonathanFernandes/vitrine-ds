import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  AccessibilityRole,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme';

export type NotificationIconGroupVariant =
  | 'default'
  | 'with-counter'
  | 'dot'
  | 'filled';

export interface NotificationIconGroupProps {
  variant?: NotificationIconGroupVariant;
  /** Contagem exibida quando `variant === 'with-counter'`. */
  count?: number;
  counterTone?: 'subtle' | 'strong';
  testID?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
  onPress?: () => void;
}

interface BellIconProps {
  color: string;
  filled?: boolean;
}

function BellIcon({ color, filled = false }: BellIconProps) {
  if (filled) {
    return (
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z"
          fill={color}
        />
      </Svg>
    );
  }

  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22Z"
        fill={color}
      />
      <Path
        d="M18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
      />
    </Svg>
  );
}

function getAccessibilityLabel(
  variant: NotificationIconGroupVariant,
  count: number | undefined,
  accessibilityLabel: string | undefined,
) {
  if (accessibilityLabel) {
    return accessibilityLabel;
  }

  if (variant === 'with-counter' && count) {
    return `${count} notificações não lidas`;
  }

  if (variant === 'dot') {
    return 'Novas notificações';
  }

  return 'Notificações';
}

export function NotificationIconGroup({
  variant = 'default',
  count = 10,
  counterTone = 'subtle',
  testID,
  style,
  accessibilityLabel,
  accessibilityRole,
  onPress,
}: NotificationIconGroupProps) {
  const { notificationIconGroup } = useTheme();
  const showsCounter = variant === 'with-counter';
  const showsDot = variant === 'dot';
  const badgeLabel =
    showsCounter && count > 99 ? '99+' : showsCounter ? String(Math.max(count, 0)) : null;
  const resolvedAccessibilityLabel = getAccessibilityLabel(variant, count, accessibilityLabel);
  const resolvedRole = accessibilityRole ?? (onPress ? 'button' : 'image');
  const content = (
    <View pointerEvents="none" style={styles.frame}>
      <BellIcon
        color={notificationIconGroup.icon.default}
        filled={variant === 'filled'}
      />
      {(showsCounter || showsDot) ? (
        <View
          style={[
            styles.badge,
            showsDot ? styles.dotBadge : styles.counterBadge,
            {
              backgroundColor:
                counterTone === 'strong'
                  ? notificationIconGroup.counter.bgStrong
                  : notificationIconGroup.counter.bg,
            },
          ]}
        >
          {badgeLabel ? (
            <Text
              style={[
                styles.badgeText,
                { color: notificationIconGroup.counter.text },
              ]}
            >
              {badgeLabel}
            </Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityLabel={resolvedAccessibilityLabel}
        accessibilityRole={resolvedRole}
        hitSlop={12}
        onPress={onPress}
        style={({ pressed }) => [styles.root, style, pressed && styles.pressed]}
        testID={testID}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View
      accessibilityLabel={resolvedAccessibilityLabel}
      accessibilityRole={resolvedRole}
      style={[styles.root, style]}
      testID={testID}
    >
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 24,
    height: 24,
  },
  frame: {
    width: 24,
    height: 24,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: -2,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterBadge: {
    minWidth: 16,
    height: 16,
    paddingHorizontal: 3,
  },
  dotBadge: {
    width: 10,
    height: 10,
    top: 1,
    right: -1,
  },
  badgeText: {
    fontFamily: 'BeVietnamPro_700Bold',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 12,
    includeFontPadding: false,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
});
