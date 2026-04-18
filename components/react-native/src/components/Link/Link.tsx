import React, { useState } from 'react';
import {
  AccessibilityRole,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme';

export type LinkVariant = 'primary' | 'destructive';
export type LinkSize = 'large' | 'medium' | 'small' | 'extraSmall';
export type LinkStyle = 'default' | 'negative';

export interface LinkProps {
  children: string;
  variant?: LinkVariant;
  size?: LinkSize;
  style?: LinkStyle;
  bold?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  showChevronLeft?: boolean;
  showChevronRight?: boolean;
  onPress: () => void;
  onLongPress?: () => void;
  accessibilityRole?: AccessibilityRole;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
}

const SIZE_CONFIG = {
  large: { fontSize: 20, lineHeight: 24, minHeight: 32 },
  medium: { fontSize: 16, lineHeight: 20, minHeight: 28 },
  small: { fontSize: 14, lineHeight: 16, minHeight: 24 },
  extraSmall: { fontSize: 12, lineHeight: 14, minHeight: 22 },
} as const;

function Chevron({ color, direction = 'right' }: { color: string; direction?: 'left' | 'right' }) {
  const rotation = direction === 'left' ? '180deg' : '0deg';
  return (
    <View style={{ transform: [{ rotate: rotation }] }}>
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        <Path
          d="M10 7.5 14 12l-4 4.5"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.75}
        />
      </Svg>
    </View>
  );
}

export function Link({
  children,
  variant = 'primary',
  size = 'large',
  style = 'default',
  bold = false,
  disabled = false,
  iconLeft,
  iconRight,
  containerStyle,
  showChevronLeft = false,
  showChevronRight = true,
  onPress,
  onLongPress,
  accessibilityRole = 'link',
  accessibilityLabel,
  accessibilityHint,
  testID,
}: LinkProps) {
  const { link } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const cfg = SIZE_CONFIG[size];

  const usesNegative = style === 'negative';
  const effectiveVariant = usesNegative ? 'primary' : variant;
  const resolvedBold = effectiveVariant === 'destructive' ? false : bold;

  function getTextColor(pressed: boolean) {
    if (disabled) {
      return usesNegative
        ? link.negative.text.disabled
        : effectiveVariant === 'destructive'
          ? link.destructive.text.disabled
          : link.primary.text.disabled;
    }

    if (usesNegative) {
      return pressed ? link.negative.text.default : link.negative.text.default;
    }

    if (pressed) {
      return effectiveVariant === 'destructive'
        ? link.destructive.text.pressed
        : link.primary.text.pressed;
    }

    return effectiveVariant === 'destructive'
      ? link.destructive.text.default
      : link.primary.text.default;
  }

  function getFocusStroke() {
    if (usesNegative) return link.negative.focusStroke;
    return effectiveVariant === 'destructive'
      ? link.destructive.focusStroke
      : link.primary.focusStroke;
  }

  return (
    <Pressable
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={disabled ? undefined : onPress}
      onLongPress={disabled ? undefined : onLongPress}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      hitSlop={size === 'small' || size === 'extraSmall' ? 12 : 8}
      testID={testID}
      style={({ pressed }) => [
        styles.wrapper,
        { minHeight: cfg.minHeight },
        isFocused && {
          borderWidth: 2,
          borderColor: getFocusStroke(),
        },
        pressed && !disabled && styles.pressed,
        containerStyle,
      ]}
    >
      {({ pressed }) => {
        const color = getTextColor(pressed);

        return (
          <View style={styles.content}>
            {iconLeft && React.isValidElement(iconLeft)
              ? React.cloneElement(iconLeft as React.ReactElement<{ color?: string }>, { color })
              : showChevronLeft
                ? <Chevron color={color} direction="left" />
                : null}
            <Text
              style={[
                styles.text,
                {
                  color,
                  fontSize: cfg.fontSize,
                  lineHeight: cfg.lineHeight,
                  fontFamily: resolvedBold ? 'BeVietnamPro_700Bold' : 'BeVietnamPro_400Regular',
                  fontWeight: resolvedBold ? '700' : '400',
                },
              ]}
            >
              {children}
            </Text>
            {iconRight && React.isValidElement(iconRight)
              ? React.cloneElement(iconRight as React.ReactElement<{ color?: string }>, { color })
              : showChevronRight
                ? <Chevron color={color} direction="right" />
                : null}
          </View>
        );
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 4,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  text: {
    includeFontPadding: false,
  },
  pressed: {
    opacity: 0.8,
  },
});
