import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme';

export type BottomMenuItemType =
  | 'home'
  | 'benefits'
  | 'default'
  | 'stores'
  | 'menu';

export interface BottomMenuItemProps {
  type: BottomMenuItemType;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onPress: () => void;
  accessibilityLabel?: string;
}

/**
 * Individual tab item within the Bottom Menu navigation bar.
 *
 * - Type `"default"` (Enviar nota) has a special BgFrame behind the icon and reduced top padding.
 * - Active state changes icon/label colors and label weight to Bold.
 * - Icons should be 24×24 React elements that accept a `color` prop or use `tintColor`.
 */
export function BottomMenuItem({
  type,
  label,
  icon,
  isActive,
  onPress,
  accessibilityLabel,
}: BottomMenuItemProps) {
  const { bottomMenu } = useTheme();
  const isSpecialType = type === 'default';

  const iconColor = isActive ? bottomMenu.icon.active : bottomMenu.icon.default;
  const labelColor = isActive ? bottomMenu.label.active : bottomMenu.label.default;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.wrapper,
        {
          borderRadius: bottomMenu.itemRadius,
          paddingTop: isSpecialType ? 8 : 16,
        },
        isSpecialType && styles.wrapperSpecial,
      ]}
    >
      {isSpecialType ? (
        <View
          style={[
            styles.bgFrame,
            {
              backgroundColor: bottomMenu.backgroundActive,
              borderRadius: bottomMenu.bgFrameRadius,
            },
          ]}
        >
          <View style={styles.iconContainer}>
            {React.isValidElement(icon)
              ? React.cloneElement(icon as React.ReactElement<{ color?: string }>, {
                  color: iconColor,
                })
              : icon}
          </View>
        </View>
      ) : (
        <View style={styles.iconContainer}>
          {React.isValidElement(icon)
            ? React.cloneElement(icon as React.ReactElement<{ color?: string }>, {
                color: iconColor,
              })
            : icon}
        </View>
      )}

      <Text
        style={[
          styles.label,
          {
            color: labelColor,
            fontFamily: isActive
              ? 'BeVietnamPro_700Bold'
              : 'BeVietnamPro_400Regular',
            fontWeight: isActive ? '700' : '400',
            lineHeight: isActive ? 14 : 14.4,
            marginTop: isSpecialType ? 8 : 16,
          },
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: 86,
    alignItems: 'center',
    paddingBottom: 16,
    paddingHorizontal: 4,
  },
  wrapperSpecial: {
    // Type=Default ("Enviar nota") is wider — flex: 1.5 approximates 104px vs 67.75px
    flex: 1.5,
  },
  bgFrame: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
    includeFontPadding: false,
  },
});
