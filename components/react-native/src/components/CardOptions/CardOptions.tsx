import React from 'react';
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
import { RadioIcon } from '../RadioIcon';

export type CardOptionsState = 'default' | 'selected';

export interface CardOptionsProps {
  state?: CardOptionsState;
  title: string;
  subtitle: string;
  leadingIcon?: React.ReactNode;
  onPress?: () => void;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
  style?: StyleProp<ViewStyle>;
}

function PhoneOutlineIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 3.75h8a1.25 1.25 0 0 1 1.25 1.25v14A1.25 1.25 0 0 1 16 20.25H8A1.25 1.25 0 0 1 6.75 19V5A1.25 1.25 0 0 1 8 3.75Z"
        stroke={color}
        strokeWidth={1.7}
      />
      <Path d="M7.5 7.25h9" stroke={color} strokeWidth={1.7} />
      <Path d="M7.5 16.75h9" stroke={color} strokeWidth={1.7} />
    </Svg>
  );
}

function renderLeadingIcon(icon: React.ReactNode, color: string) {
  if (!icon) {
    return <PhoneOutlineIcon color={color} />;
  }

  if (!React.isValidElement(icon)) {
    return icon;
  }

  return React.cloneElement(icon as React.ReactElement<{ color?: string }>, {
    color,
  });
}

/**
 * Selectable option card based on Figma node `7555:13212`.
 * Delegates the trailing control to `RadioIcon` so selected state stays consistent.
 */
export function CardOptions({
  state = 'selected',
  title,
  subtitle,
  leadingIcon,
  onPress,
  testID,
  accessibilityLabel,
  accessibilityRole = 'radio',
  style,
}: CardOptionsProps) {
  const { cardOptions } = useTheme();
  const selected = state === 'selected';
  const resolvedAccessibilityLabel = accessibilityLabel ?? `${title}, ${subtitle}`;

  const content = (
    <View
      style={[
        styles.container,
        {
          backgroundColor: cardOptions.container.bg,
          borderColor: selected
            ? cardOptions.container.border.selected
            : cardOptions.container.border.default,
          borderRadius: cardOptions.container.radius,
        },
      ]}
    >
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={styles.leadingIcon}
      >
        {renderLeadingIcon(leadingIcon, cardOptions.icon.leading)}
      </View>
      <View style={styles.textStack}>
        <Text
          numberOfLines={1}
          style={[styles.title, { color: cardOptions.title }]}
        >
          {title}
        </Text>
        <Text
          numberOfLines={1}
          style={[styles.subtitle, { color: cardOptions.subtitle }]}
        >
          {subtitle}
        </Text>
      </View>
      <RadioIcon state={selected ? 'checked' : 'default'} />
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityLabel={resolvedAccessibilityLabel}
        accessibilityRole={accessibilityRole}
        accessibilityState={{ selected }}
        hitSlop={8}
        onPress={onPress}
        style={({ pressed }) => [
          styles.root,
          pressed && styles.pressed,
          style,
        ]}
        testID={testID}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View
      accessibilityLabel={resolvedAccessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ selected }}
      style={[styles.root, style]}
      testID={testID}
    >
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 327,
    maxWidth: '100%',
  },
  container: {
    width: '100%',
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderWidth: 1,
  },
  leadingIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStack: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
    gap: 4,
  },
  title: {
    fontFamily: 'BeVietnamPro_700Bold',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    includeFontPadding: false,
  },
  subtitle: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    includeFontPadding: false,
  },
  pressed: {
    opacity: 0.88,
  },
});
