import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme';

export type BadgeStatus =
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral-1'
  | 'neutral-2'
  | 'neutral-3'
  | 'promo'
  | 'premiere'
  | 'blog'
  | 'filter-default'
  | 'filter-active'
  | 'disabled';

export type BadgeSize = 'medium' | 'small';

export interface BadgeProps {
  status: BadgeStatus;
  size?: BadgeSize;
  label: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
}

const SIZE_CONFIG = {
  medium: { height: 32, icon: 16 },
  small: { height: 24, icon: 12 },
} as const;

function AddCircleIcon({ color, size }: { color: string; size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M8 1.333A6.667 6.667 0 1 0 8 14.667 6.667 6.667 0 0 0 8 1.333Zm3 7.334H8.667V11H7.333V8.667H5V7.333h2.333V5h1.334v2.333H11v1.334Z"
        fill={color}
      />
    </Svg>
  );
}

function getStatusTokens(theme: ReturnType<typeof useTheme>['badge'], status: BadgeStatus) {
  switch (status) {
    case 'success':
      return theme.success;
    case 'warning':
      return theme.warning;
    case 'error':
      return theme.error;
    case 'info':
      return theme.info;
    case 'neutral-1':
      return theme.neutral1;
    case 'neutral-2':
      return theme.neutral2;
    case 'neutral-3':
      return theme.neutral3;
    case 'promo':
      return theme.promo;
    case 'premiere':
      return theme.premiere;
    case 'blog':
      return theme.blog;
    case 'filter-default':
      return theme.filterDefault;
    case 'filter-active':
      return theme.filterActive;
    case 'disabled':
      return theme.disabled;
  }
}

export function Badge({
  status,
  size = 'medium',
  label,
  leftIcon,
  rightIcon,
  onPress,
  accessibilityLabel,
}: BadgeProps) {
  const { badge } = useTheme();
  const tokens = getStatusTokens(badge, status);
  const cfg = SIZE_CONFIG[size];
  const isInteractive = status === 'filter-default' || status === 'filter-active';
  const isBold = status === 'filter-active' || status === 'disabled';
  const left = leftIcon === undefined ? <AddCircleIcon color={tokens.fg} size={cfg.icon} /> : leftIcon;
  const right = rightIcon === undefined ? <AddCircleIcon color={tokens.fg} size={cfg.icon} /> : rightIcon;

  const content = (
    <View
      style={[
        styles.container,
        {
          minHeight: cfg.height,
          borderRadius: badge.radius,
          backgroundColor: tokens.bg,
          borderColor: tokens.border,
          borderWidth: tokens.border ? 1 : 0,
        },
      ]}
    >
      {left ? <View style={styles.icon}>{left}</View> : null}
      <Text
        style={[
          styles.label,
          {
            color: tokens.fg,
            fontFamily: isBold ? 'BeVietnamPro_700Bold' : 'BeVietnamPro_400Regular',
            fontWeight: isBold ? '700' : '400',
          },
        ]}
      >
        {label}
      </Text>
      {right ? <View style={styles.icon}>{right}</View> : null}
    </View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Pressable
      accessibilityRole={isInteractive ? 'button' : 'text'}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{
        selected: status === 'filter-active',
        disabled: status === 'disabled',
      }}
      hitSlop={10}
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    lineHeight: 14,
    includeFontPadding: false,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
});
