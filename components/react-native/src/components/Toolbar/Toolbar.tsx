import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useTheme } from '../../theme';

export type ToolbarVariant = 'default' | 'negative' | 'icons' | 'onboarding';
export type ToolbarLeftIcon = 'back' | 'close';

export interface ToolbarProps {
  variant?: ToolbarVariant;
  backLabel?: string;
  backAccessibilityLabel?: string;
  onBackPress?: () => void;
  rightLabel?: string;
  onRightPress?: () => void;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  rightIconAccessibilityLabel?: string;
  onSearchPress?: () => void;
  onMenuPress?: () => void;
  hideBackArrow?: boolean;
  leftIcon?: ToolbarLeftIcon;
}

function BackArrowIcon({ color }: { color: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d="M9.33325 3.33334 4.66659 8l4.66666 4.66667"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
      />
      <Path d="M5.33325 8H12.6666" stroke={color} strokeLinecap="round" strokeWidth={1.6} />
    </Svg>
  );
}

function SearchIcon({ color }: { color: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Circle cx={7} cy={7} r={4.5} stroke={color} strokeWidth={1.4} />
      <Path d="M10.5 10.5 13.3333 13.3333" stroke={color} strokeLinecap="round" strokeWidth={1.4} />
    </Svg>
  );
}

function MenuIcon({ color }: { color: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Circle cx={8} cy={2.75} r={1.2} fill={color} />
      <Circle cx={8} cy={8} r={1.2} fill={color} />
      <Circle cx={8} cy={13.25} r={1.2} fill={color} />
    </Svg>
  );
}

function CloseIcon({ color }: { color: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d="M12.2005 3.80665C11.9405 3.54665 11.5205 3.54665 11.2605 3.80665L8.00047 7.05998L4.74047 3.79998C4.48047 3.53998 4.06047 3.53998 3.80047 3.79998C3.54047 4.05998 3.54047 4.47998 3.80047 4.73998L7.06047 7.99998L3.80047 11.26C3.54047 11.52 3.54047 11.94 3.80047 12.2C4.06047 12.46 4.48047 12.46 4.74047 12.2L8.00047 8.93998L11.2605 12.2C11.5205 12.46 11.9405 12.46 12.2005 12.2C12.4605 11.94 12.4605 11.52 12.2005 11.26L8.94047 7.99998L12.2005 4.73998C12.4538 4.48665 12.4538 4.05998 12.2005 3.80665Z"
        fill={color}
      />
    </Svg>
  );
}

export function Toolbar({
  variant = 'default',
  backLabel = variant === 'onboarding' ? 'Voltar' : 'Page name',
  backAccessibilityLabel,
  onBackPress,
  rightLabel = 'Pular',
  onRightPress,
  rightIcon,
  onRightIconPress,
  rightIconAccessibilityLabel = 'Ação',
  onSearchPress,
  onMenuPress,
  hideBackArrow = false,
  leftIcon = 'back',
}: ToolbarProps) {
  const { toolbar } = useTheme();
  const isNegative = variant === 'negative';
  const isIcons = variant === 'icons';
  const isOnboarding = variant === 'onboarding';

  const backArrowColor = isNegative ? toolbar.icon.negative : toolbar.icon.default;
  const backLabelColor = isNegative ? toolbar.label.negative : toolbar.label.default;
  const actionIconColor = toolbar.icon.default;
  const resolvedBackAccessibilityLabel =
    backAccessibilityLabel ?? (backLabel === 'Voltar' ? 'Voltar' : `Voltar ${backLabel}`);

  return (
    <View accessibilityRole="header" style={styles.root}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={resolvedBackAccessibilityLabel}
        hitSlop={8}
        onPress={onBackPress}
        style={({ pressed }) => [styles.backLink, pressed && styles.pressed]}
      >
        {!hideBackArrow ? (
          leftIcon === 'close'
            ? <CloseIcon color={backArrowColor} />
            : <BackArrowIcon color={backArrowColor} />
        ) : null}
        <Text style={[styles.linkLabel, { color: backLabelColor }]}>{backLabel}</Text>
      </Pressable>

      {rightIcon ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={rightIconAccessibilityLabel}
          hitSlop={14}
          onPress={onRightIconPress}
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
        >
          {React.isValidElement(rightIcon)
            ? React.cloneElement(rightIcon as React.ReactElement<{ color?: string }>, {
                color: actionIconColor,
              })
            : rightIcon}
        </Pressable>
      ) : isIcons ? (
        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Buscar"
            hitSlop={14}
            onPress={onSearchPress}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          >
            <SearchIcon color={actionIconColor} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Menu"
            hitSlop={14}
            onPress={onMenuPress}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          >
            <MenuIcon color={actionIconColor} />
          </Pressable>
        </View>
      ) : null}

      {isOnboarding ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Pular etapa"
          hitSlop={8}
          onPress={onRightPress}
          style={({ pressed }) => [styles.rightLink, pressed && styles.pressed]}
        >
          <Text style={[styles.linkLabel, { color: toolbar.label.default }]}>{rightLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    minHeight: 64,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backLink: {
    flex: 1,
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  linkLabel: {
    fontFamily: 'BeVietnamPro_700Bold',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
    includeFontPadding: false,
  },
  actions: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    minWidth: 24,
    minHeight: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightLink: {
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  pressed: {
    opacity: 0.8,
  },
});
