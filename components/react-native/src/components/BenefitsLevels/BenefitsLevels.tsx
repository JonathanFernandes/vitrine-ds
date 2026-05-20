import React, { useMemo } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { SvgAssetIcon, type SvgAssetIconName } from '../SvgAssetIcon';
import { BenefitsLevelsCheckIcon, BenefitsLevelsCloseIcon } from './icons';

export type BenefitsLevel = '1' | '2' | '3';

const LOYALTY_STAR_ICON_BY_LEVEL: Record<BenefitsLevel, SvgAssetIconName> = {
  '1': 'estrela-loyalt-1',
  '2': 'estrela-loyalt-2',
  '3': 'estrela-loyalt-3',
};

export interface BenefitsLevelItem {
  title: string;
  caption: string;
  /** false → Close icon + disabled text tokens */
  enabled: boolean;
}

export interface BenefitsLevelsProps {
  level?: BenefitsLevel;
  showTag?: boolean;
  tagLabel?: string;
  heading: string;
  description: string;
  benefits: BenefitsLevelItem[];
  testID?: string;
  accessibilityLabel?: string;
  style?: ViewStyle;
}

/**
 * Loyalty program level card — Figma `COMPONENT_SET` benefits-levels `7935:14175`.
 * @see specs/component-spec/benefits-levels.md
 */
export function BenefitsLevels({
  level = '1',
  showTag = true,
  tagLabel = 'Você está aqui',
  heading,
  description,
  benefits,
  testID,
  accessibilityLabel,
  style,
}: BenefitsLevelsProps) {
  const { benefitsLevels: t, fontsLoaded } = useTheme();
  const { spacing: sp, sizes } = t;
  const starIconName = LOYALTY_STAR_ICON_BY_LEVEL[level];

  const cardA11yLabel = useMemo(() => {
    if (accessibilityLabel) return accessibilityLabel;
    const lines = benefits
      .map((b) => `${b.title}, ${b.caption}, ${b.enabled ? 'disponível' : 'indisponível'}`)
      .join('. ');
    return `${heading}. ${description}. ${lines}`;
  }, [accessibilityLabel, benefits, description, heading]);

  return (
    <View
      testID={testID}
      accessibilityRole="summary"
      accessibilityLabel={cardA11yLabel}
      style={[
        styles.root,
        {
          width: t.width,
          padding: sp.padding,
          gap: sp.sectionGap,
          backgroundColor: t.surface,
          borderColor: t.border,
          borderWidth: t.borderWidth,
          borderRadius: t.radius,
        },
        style,
      ]}
    >
      <View style={{ gap: sp.headerBlockGap }}>
        <View
          style={[
            styles.headerRow,
            {
              gap: sp.headerRowGap,
              justifyContent: showTag ? 'space-between' : 'flex-start',
            },
          ]}
        >
          <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            <SvgAssetIcon name={starIconName} width={sizes.star} height={sizes.star} />
          </View>
          {showTag ? (
            <View
              accessibilityRole="text"
              style={[
                styles.badge,
                {
                  backgroundColor: t.badgeBg,
                  borderRadius: t.radius,
                  paddingHorizontal: sp.badgePaddingH,
                  paddingVertical: sp.badgePaddingV,
                  minHeight: sp.badgeHeight,
                },
              ]}
            >
              <Text
                style={[
                  styles.badgeLabel,
                  { color: t.badgeLabel },
                  !fontsLoaded && styles.fontFallback,
                ]}
              >
                {tagLabel}
              </Text>
            </View>
          ) : null}
        </View>

        <View style={{ gap: sp.titleStackGap }}>
          <Text
            style={[
              styles.heading,
              { color: t.heading },
              !fontsLoaded && styles.fontFallback,
            ]}
          >
            {heading}
          </Text>
          <Text
            style={[
              styles.description,
              { color: t.description },
              !fontsLoaded && styles.fontFallback,
            ]}
          >
            {description}
          </Text>
        </View>
      </View>

      <View style={{ gap: sp.sectionGap }}>
        {benefits.map((item, index) => {
          const textColor = item.enabled ? t.benefitTitle : t.benefitTextDisabled;
          const captionColor = item.enabled ? t.benefitCaption : t.benefitTextDisabled;
          const rowA11y = `${item.title}, ${item.caption}, ${item.enabled ? 'disponível' : 'indisponível'}`;

          return (
            <View
              key={`${item.title}-${index}`}
              accessibilityRole="text"
              accessibilityLabel={rowA11y}
              style={[styles.benefitRow, { gap: sp.benefitRowGap }]}
            >
              <View accessible={false} importantForAccessibility="no">
                {item.enabled ? (
                  <BenefitsLevelsCheckIcon color={t.iconCheck} size={sizes.rowIcon} />
                ) : (
                  <BenefitsLevelsCloseIcon color={t.iconCloseDisabled} size={sizes.rowIcon} />
                )}
              </View>
              <View style={[styles.benefitTextCol, { gap: sp.benefitTextGap, flex: 1 }]}>
                <Text
                  style={[
                    styles.benefitTitle,
                    { color: textColor },
                    !fontsLoaded && styles.fontFallback,
                  ]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.benefitCaption,
                    { color: captionColor },
                    !fontsLoaded && styles.fontFallback,
                  ]}
                >
                  {item.caption}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignSelf: 'flex-start',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeLabel: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    includeFontPadding: false,
  },
  heading: {
    fontFamily: 'BeVietnamPro_700Bold',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    letterSpacing: -1,
    includeFontPadding: false,
  },
  description: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    includeFontPadding: false,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  benefitTextCol: {
    minWidth: 0,
  },
  benefitTitle: {
    fontFamily: 'BeVietnamPro_700Bold',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: -0.18,
    includeFontPadding: false,
  },
  benefitCaption: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14.4,
    includeFontPadding: false,
  },
  fontFallback: {
    fontFamily: undefined,
  },
});
