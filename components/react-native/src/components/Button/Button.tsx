import React, { useState } from 'react';
import {
  AccessibilityState,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { LoadingDots } from './LoadingDots';

export type ButtonStatus =
  | 'primary'
  | 'primary-inverse'
  | 'secondary'
  | 'secondary-inverse'
  | 'destructive';

export type ButtonSize = 'large' | 'medium' | 'small';

export interface ButtonProps {
  status?: ButtonStatus;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onPress?: () => void;
  onLongPress?: () => void;
  children: React.ReactNode;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
}

const SIZE_CONFIG: Record<
  ButtonSize,
  {
    height: number;
    paddingVertical: number;
    paddingHorizontal: number;
    fontSize: number;
    lineHeight: number;
  }
> = {
  large: {
    height: 56,
    paddingVertical: 16,
    paddingHorizontal: 32,
    fontSize: 16,
    lineHeight: 24,
  },
  medium: {
    height: 48,
    paddingVertical: 12,
    paddingHorizontal: 24,
    fontSize: 14,
    lineHeight: 24,
  },
  small: {
    height: 32,
    paddingVertical: 4,
    paddingHorizontal: 16,
    fontSize: 12,
    lineHeight: 16,
  },
};

export function Button({
  status = 'primary',
  size = 'large',
  fullWidth = false,
  disabled = false,
  loading = false,
  iconLeft,
  iconRight,
  onPress,
  onLongPress,
  children,
  accessibilityLabel,
  accessibilityHint,
  testID,
}: ButtonProps) {
  const { button } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const isInteractionDisabled = disabled || loading;
  const sizeConfig = SIZE_CONFIG[size];

  function getContainerStyle(pressed: boolean): ViewStyle {
    const base: ViewStyle = {
      height: sizeConfig.height,
      paddingVertical: sizeConfig.paddingVertical,
      paddingHorizontal: sizeConfig.paddingHorizontal,
      borderRadius: button.radius,
    };

    if (disabled) {
      switch (status) {
        case 'primary':
          return { ...base, backgroundColor: button.primary.bg.disabled };
        case 'primary-inverse':
          return { ...base, backgroundColor: button.primaryInverse.bg.disabled };
        case 'secondary':
          return { ...base, backgroundColor: button.secondary.bg.disabled };
        case 'secondary-inverse':
          return { ...base, backgroundColor: button.secondaryInverse.bg.disabled };
        case 'destructive':
          return { ...base, backgroundColor: button.danger.bg.disabled };
      }
    }

    if (loading) {
      switch (status) {
        case 'primary':
          return { ...base, backgroundColor: button.primary.bg.pressed };
        case 'primary-inverse':
          return { ...base, backgroundColor: button.primaryInverse.bg.loading };
        case 'secondary':
          return { ...base, backgroundColor: button.secondary.bg.loading };
        case 'secondary-inverse':
          return { ...base, backgroundColor: button.secondaryInverse.bg.loading };
        case 'destructive':
          return { ...base, backgroundColor: button.danger.bg.loading };
      }
    }

    if (pressed) {
      switch (status) {
        case 'primary':
          return { ...base, backgroundColor: button.primary.bg.pressed };
        case 'primary-inverse':
          return { ...base, backgroundColor: button.primaryInverse.bg.pressed };
        case 'secondary':
          return { ...base, backgroundColor: button.secondary.bg.pressed };
        case 'secondary-inverse':
          return { ...base, backgroundColor: button.secondaryInverse.bg.pressed };
        case 'destructive':
          return { ...base, backgroundColor: button.danger.bg.pressed };
      }
    }

    if (isFocused) {
      switch (status) {
        case 'primary':
          return {
            ...base,
            backgroundColor: button.primary.bg.pressed,
            borderWidth: 2,
            borderColor: button.primary.focus.borderColor,
          };
        case 'primary-inverse':
          return {
            ...base,
            backgroundColor: button.primaryInverse.bg.focus,
            borderWidth: 2,
            borderColor: button.primaryInverse.border.focus,
          };
        case 'secondary':
          return {
            ...base,
            backgroundColor: button.secondary.bg.focus,
            borderWidth: 2,
            borderColor: button.secondary.border.focus,
          };
        case 'secondary-inverse':
          return {
            ...base,
            backgroundColor: button.secondaryInverse.bg.focus,
            borderWidth: 2,
            borderColor: button.secondaryInverse.border.focus,
          };
        case 'destructive':
          return {
            ...base,
            backgroundColor: button.danger.bg.pressed,
            borderWidth: 2,
            borderColor: button.danger.focus.borderColor,
          };
      }
    }

    // Default state
    switch (status) {
      case 'primary':
        return { ...base, backgroundColor: button.primary.bg.default };
      case 'primary-inverse':
        return { ...base, backgroundColor: button.primaryInverse.bg.default };
      case 'secondary':
        return {
          ...base,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: button.secondary.border.default,
        };
      case 'secondary-inverse':
        return {
          ...base,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: button.secondaryInverse.border.default,
        };
      case 'destructive':
        return { ...base, backgroundColor: button.danger.bg.default };
    }
  }

  function getLabelColor(pressed: boolean): string {
    if (disabled) {
      switch (status) {
        case 'primary':
          return button.primary.label.disabled;
        case 'primary-inverse':
          return button.primaryInverse.label.disabled;
        case 'secondary':
          return button.secondary.label.disabled;
        case 'secondary-inverse':
          return button.secondaryInverse.label.disabled;
        case 'destructive':
          return button.danger.label.disabled;
      }
    }

    if (loading) {
      switch (status) {
        case 'primary':
        case 'destructive':
          return button.primary.label.default;
        case 'primary-inverse':
          return button.primaryInverse.label.loading;
        case 'secondary':
          return button.secondary.label.loading;
        case 'secondary-inverse':
          return button.secondaryInverse.label.loading;
      }
    }

    if (pressed) {
      switch (status) {
        case 'primary':
        case 'destructive':
          return button.primary.label.default;
        case 'primary-inverse':
          return button.primaryInverse.label.pressed;
        case 'secondary':
          return button.secondary.label.pressed;
        case 'secondary-inverse':
          return button.secondaryInverse.label.pressed;
      }
    }

    if (isFocused) {
      switch (status) {
        case 'primary':
        case 'destructive':
          return button.primary.label.default;
        case 'primary-inverse':
          return button.primaryInverse.label.focus;
        case 'secondary':
          return button.secondary.label.focus;
        case 'secondary-inverse':
          return button.secondaryInverse.label.focus;
      }
    }

    switch (status) {
      case 'primary':
      case 'destructive':
        return button.primary.label.default;
      case 'primary-inverse':
        return button.primaryInverse.label.default;
      case 'secondary':
        return button.secondary.label.default;
      case 'secondary-inverse':
        return button.secondaryInverse.label.default;
    }
  }

  const accessibilityState: AccessibilityState = {
    disabled: isInteractionDisabled,
    busy: loading,
  };

  function renderIcon(icon: React.ReactNode, color: string) {
    if (!React.isValidElement(icon)) {
      return icon;
    }

    return React.cloneElement(icon as React.ReactElement<{ color?: string }>, { color });
  }

  return (
    <Pressable
      onPress={isInteractionDisabled ? undefined : onPress}
      onLongPress={isInteractionDisabled ? undefined : onLongPress}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      disabled={isInteractionDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={accessibilityState}
      testID={testID}
      // Small is below the 44pt iOS / 48dp Android minimum — expand touch target
      hitSlop={size === 'small' ? { top: 6, bottom: 6 } : undefined}
      style={({ pressed }) => [
        styles.container,
        getContainerStyle(pressed),
        fullWidth && styles.fullWidth,
      ]}
    >
      {({ pressed }) => {
        const labelColor = getLabelColor(pressed);
        return (
            <View style={styles.content}>
            {iconLeft && (
              <View
                style={[
                  styles.icon,
                  styles.iconGap,
                  size === 'small' && styles.iconSmall,
                ]}
              >
                {renderIcon(iconLeft, labelColor)}
              </View>
            )}

            {/* Text container maintains its size during loading so button width stays fixed */}
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.label,
                  {
                    fontSize: sizeConfig.fontSize,
                    lineHeight: sizeConfig.lineHeight,
                    color: labelColor,
                  },
                  loading && styles.labelHidden,
                ]}
                numberOfLines={1}
              >
                {children}
              </Text>
              {loading && (
                <View style={[StyleSheet.absoluteFill, styles.loadingOverlay]}>
                  <LoadingDots color={labelColor} />
                </View>
              )}
            </View>

            {iconRight && (
              <View
                style={[
                  styles.icon,
                  styles.iconGap,
                  size === 'small' && styles.iconSmall,
                ]}
              >
                {renderIcon(iconRight, labelColor)}
              </View>
            )}
          </View>
        );
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    minWidth: 132,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconGap: {
    marginHorizontal: 4,
  },
  icon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSmall: {
    width: 16,
    height: 16,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'BeVietnamPro_700Bold',
    fontWeight: '700',
    textAlign: 'center',
    includeFontPadding: false,
  },
  labelHidden: {
    opacity: 0,
  },
  loadingOverlay: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
