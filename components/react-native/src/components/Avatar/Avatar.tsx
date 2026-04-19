import React from 'react';
import {
  AccessibilityRole,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';

export type AvatarSize = 'small' | 'large';

export interface AvatarProps {
  /** Conteúdo exibido no avatar, como iniciais. */
  label: string;
  /** Escala visual do avatar. */
  size?: AvatarSize;
  /** Nome completo ou descrição para leitores de tela. */
  accessibilityLabel?: string;
  /** Papel de acessibilidade quando o avatar for reutilizado em contextos interativos. */
  accessibilityRole?: AccessibilityRole;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

const SIZE_CONFIG: Record<
  AvatarSize,
  {
    dimension: number;
    fontFamily: string;
    fontSize: number;
    fontWeight: '600' | '700';
    letterSpacing: number;
    lineHeight: number;
  }
> = {
  small: {
    dimension: 48,
    fontFamily: 'BeVietnamPro_700Bold',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 24,
  },
  large: {
    dimension: 64,
    fontFamily: 'BeVietnamPro_600SemiBold',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: -0.2,
    lineHeight: 24,
  },
};

export function Avatar({
  label,
  size = 'small',
  accessibilityLabel,
  accessibilityRole = 'image',
  testID,
  style,
}: AvatarProps) {
  const { avatar } = useTheme();
  const config = SIZE_CONFIG[size];

  return (
    <View
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole={accessibilityRole}
      style={[
        styles.root,
        {
          width: config.dimension,
          height: config.dimension,
        },
        style,
      ]}
      testID={testID}
    >
      <View
        style={[
          styles.container,
          {
            width: config.dimension,
            height: config.dimension,
            borderRadius: avatar.radius,
            backgroundColor: avatar.bg.default,
            borderColor: avatar.border.default,
          },
        ]}
      >
        <Text
          numberOfLines={1}
          style={[
            styles.label,
            {
              color: avatar.label.default,
              fontFamily: config.fontFamily,
              fontSize: config.fontSize,
              fontWeight: config.fontWeight,
              letterSpacing: config.letterSpacing,
              lineHeight: config.lineHeight,
            },
          ]}
        >
          {label}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    padding: 8,
    overflow: 'hidden',
  },
  label: {
    includeFontPadding: false,
    textAlign: 'center',
  },
});
