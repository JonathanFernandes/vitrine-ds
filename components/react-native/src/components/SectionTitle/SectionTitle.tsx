import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme';
import { Link } from '../Link';

export type SectionTitleVariant = 'default' | 'negative';

export interface SectionTitleProps {
  title: string;
  variant?: SectionTitleVariant;
  linkText?: string;
  onLinkPress?: () => void;
  showLink?: boolean;
  accessibilityLabel?: string;
  testID?: string;
}

export function SectionTitle({
  title,
  variant = 'default',
  linkText = 'Abrir todos',
  onLinkPress,
  showLink = true,
  accessibilityLabel,
  testID,
}: SectionTitleProps) {
  const { sectionTitle } = useTheme();
  const titleColor =
    variant === 'negative'
      ? sectionTitle.title.negative
      : sectionTitle.title.default;
  const linkColor =
    variant === 'negative'
      ? sectionTitle.link.negative
      : sectionTitle.link.default;

  return (
    <View style={styles.root} testID={testID}>
      <View style={styles.titleWrapper}>
        <Text
          accessibilityRole="header"
          style={[styles.title, { color: titleColor }]}
        >
          {title}
        </Text>
      </View>

      {showLink ? (
        <Link
          accessibilityLabel={accessibilityLabel ?? `${linkText} ${title}`}
          bold
          onPress={onLinkPress ?? (() => {})}
          size="small"
          style={variant === 'negative' ? 'negative' : 'default'}
        >
          {linkText}
        </Link>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'BeVietnamPro_700Bold',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: -0.18,
    includeFontPadding: false,
  },
});
