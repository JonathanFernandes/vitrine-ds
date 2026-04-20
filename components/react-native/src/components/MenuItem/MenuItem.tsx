import React from 'react';
import {
  AccessibilityRole,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme';

export type MenuItemStyle = 'default' | 'negative';

export interface MenuItemProps {
  label: string;
  style?: MenuItemStyle;
  icon?: boolean;
  divider?: boolean;
  onPress?: () => void;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
}

function WifiWebIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M1 9.00001L3 11C7.97 6.03001 16.03 6.03001 21 11L23 9.00001C16.93 2.93001 7.08 2.93001 1 9.00001ZM9 17L12 20L15 17C13.35 15.34 10.66 15.34 9 17ZM5 13L7 15C9.76 12.24 14.24 12.24 17 15L19 13C15.14 9.14001 8.87 9.14001 5 13Z"
        fill={color}
      />
    </Svg>
  );
}

function ArrowRightIcon({ color }: { color: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d="M6.66675 3.33334L11.3334 8L6.66675 12.6667"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
      />
      <Path
        d="M10.6667 8H3.33341"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={1.6}
      />
    </Svg>
  );
}

/**
 * Menu/list row based on Figma node `7506:9672`.
 * Matches the published `default` and `negative` variants with optional Wi-Fi icon and divider.
 */
export function MenuItem({
  label,
  style = 'default',
  icon = true,
  divider = true,
  onPress,
  testID,
  accessibilityLabel,
  accessibilityRole,
}: MenuItemProps) {
  const { menuItem } = useTheme();
  const colors = style === 'negative' ? menuItem.negative : menuItem.default;
  const resolvedAccessibilityLabel = accessibilityLabel ?? label;
  const resolvedRole = accessibilityRole ?? 'button';

  const content = (
    <View style={styles.root}>
      <View style={styles.row}>
        {icon ? (
          <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.leadingIcon}>
            <WifiWebIcon color={colors.icon} />
          </View>
        ) : null}
        <Text numberOfLines={1} style={[styles.label, { color: colors.text }]}>
          {label}
        </Text>
        <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={styles.chevron}>
          <ArrowRightIcon color={colors.chevron} />
        </View>
      </View>
      {divider ? <View style={[styles.divider, { backgroundColor: colors.divider }]} /> : null}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityLabel={resolvedAccessibilityLabel}
        accessibilityRole={resolvedRole}
        hitSlop={8}
        onPress={onPress}
        style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
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
      style={styles.pressable}
      testID={testID}
    >
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: 319,
    height: 64,
  },
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  row: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 12,
  },
  leadingIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
    minWidth: 0,
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    includeFontPadding: false,
  },
  chevron: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
  },
  pressed: {
    opacity: 0.8,
  },
});
