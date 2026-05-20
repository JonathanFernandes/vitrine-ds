import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button } from '../Button';
import { useTheme } from '../../theme';
import { CouponIcon, LockIcon, ServiceIcon } from '../BenefitsCardVertical/icons';

export type BenefitsCardHorizontalStatus = 'default' | 'locked' | 'used';

function CheckIcon({ color = '#B3B3B3', size = 16 }: { color?: string; size?: number }) {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          width: size * 0.55,
          height: size * 0.35,
          borderLeftWidth: 2,
          borderBottomWidth: 2,
          borderColor: color,
          transform: [{ rotate: '-45deg' }],
          marginTop: -size * 0.08,
        }}
      />
    </View>
  );
}

export interface BenefitsCardHorizontalProps {
  status?: BenefitsCardHorizontalStatus;
  categoryLabel: string;
  storeName: string;
  description: string;
  expirationText?: string;
  productImageSource?: ImageSourcePropType;
  storeLogoSource?: ImageSourcePropType;
  categoryIcon?: React.ReactNode;
  activateLabel?: string;
  lockedLabel?: string;
  usedLabel?: string;
  onCardPress?: (event: GestureResponderEvent) => void;
  onActivatePress?: () => void;
  testID?: string;
  accessibilityLabel?: string;
}

/**
 * Horizontal benefits card — Figma `COMPONENT_SET` Benefits Card (horizontal) `7810:5098`.
 * @see specs/component-spec/benefits-card-horizontal.md
 */
export function BenefitsCardHorizontal({
  status = 'default',
  categoryLabel,
  storeName,
  description,
  expirationText,
  productImageSource,
  storeLogoSource: _storeLogoSource,
  categoryIcon,
  activateLabel = 'Ativar',
  lockedLabel = 'Bloqueado',
  usedLabel = 'Utilizado',
  onCardPress,
  onActivatePress,
  testID,
  accessibilityLabel,
}: BenefitsCardHorizontalProps) {
  const { benefitsCardHorizontal: h } = useTheme();
  const isLocked = status === 'locked';

  const stateA11y =
    status === 'locked' ? 'benefício bloqueado' : status === 'used' ? 'benefício utilizado' : '';
  const cardAccessibilityLabel =
    accessibilityLabel ??
    `${storeName}, ${description}${categoryLabel ? `, ${categoryLabel}` : ''}${stateA11y ? `, ${stateA11y}` : ''}`;

  const brandingBg = isLocked ? h.brandingMaskBg : h.brandingBg;

  const logoBlock = (
    <View
      style={[
        styles.storeLogo,
        {
          backgroundColor: h.storeLogoBg,
          borderColor: h.logoBorder,
          borderWidth: h.logoBorderWidth,
          borderRadius: h.rootRadius,
        },
      ]}
    >
      {productImageSource ? (
        <Image
          source={productImageSource}
          style={[
            styles.storeLogoImage,
            {
              borderRadius: h.rootRadius,
              opacity: isLocked ? 0.55 : 1,
            },
          ]}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[
            styles.storeLogoImage,
            {
              borderRadius: h.rootRadius,
              opacity: isLocked ? 0.55 : 1,
            },
          ]}
        />
      )}

      {isLocked ? (
        <View style={[styles.lockBadge, { backgroundColor: h.lockBadgeBg }]}>
          <LockIcon color={h.onDark} size={16} />
        </View>
      ) : null}
    </View>
  );

  const ctaRow =
    status === 'default' ? (
      <Button
        status="secondary"
        size="small"
        fullWidth
        onPress={onActivatePress}
        iconLeft={<CouponIcon color={h.actionActive} size={16} />}
        accessibilityLabel={activateLabel}
      >
        {activateLabel}
      </Button>
    ) : (
      <Pressable
        disabled
        accessibilityRole="button"
        accessibilityState={{ disabled: true }}
        accessibilityLabel={isLocked ? lockedLabel : usedLabel}
        style={[
          styles.disabledCta,
          {
            backgroundColor: h.actionDisabledBg,
            borderRadius: h.rootRadius,
          },
        ]}
      >
        {isLocked ? (
          <LockIcon color={h.actionDisabled} size={16} />
        ) : (
          <CheckIcon color={h.actionDisabled} size={16} />
        )}
        <Text style={[styles.disabledCtaLabel, { color: h.actionDisabled }]}>
          {isLocked ? lockedLabel : usedLabel}
        </Text>
      </Pressable>
    );

  const inner = (
    <>
      <View style={[styles.branding, { backgroundColor: brandingBg, borderRadius: h.rootRadius }]}>
        {logoBlock}
      </View>

      <View style={[styles.content, { flex: 1, gap: h.contentGap }]}>
        <View style={{ flex: 1, gap: h.textStackGap }}>
          <View style={[styles.categoryRow, { gap: h.categoryRowGap }]}>
            {categoryIcon ?? <ServiceIcon color={h.secondary} size={16} />}
            <Text style={[styles.categoryLabel, { color: h.secondary }]} numberOfLines={1}>
              {categoryLabel}
            </Text>
          </View>

          <View style={{ gap: h.titleBlockGap }}>
            <Text style={[styles.storeName, { color: h.text }]} numberOfLines={1}>
              {storeName}
            </Text>
            <Text style={[styles.description, { color: h.text }]} numberOfLines={2}>
              {description}
            </Text>
          </View>
        </View>

        {expirationText ? (
          <Text style={[styles.expiration, { color: h.secondary }]} numberOfLines={1}>
            {expirationText}
          </Text>
        ) : null}

        {ctaRow}
      </View>
    </>
  );

  const rootStyle = [
    styles.root,
    {
      width: 343,
      minHeight: 136,
      gap: h.columnGap,
      borderRadius: h.rootRadius,
      backgroundColor: h.cardSurface,
    },
  ];

  if (!onCardPress) {
    return (
      <View
        style={rootStyle}
        testID={testID}
        accessibilityLabel={cardAccessibilityLabel}
        accessibilityRole="none"
      >
        {inner}
      </View>
    );
  }

  return (
    <Pressable
      onPress={onCardPress}
      accessibilityRole="button"
      accessibilityLabel={cardAccessibilityLabel}
      style={rootStyle}
      testID={testID}
    >
      {inner}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'stretch',
    padding: 0,
    overflow: 'hidden',
  },
  branding: {
    width: 136,
    height: 136,
    overflow: 'hidden',
  },
  storeLogo: {
    width: 136,
    height: 136,
    overflow: 'hidden',
    position: 'relative',
  },
  storeLogoImage: {
    width: '100%',
    height: '100%',
  },
  lockBadge: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -20,
  },
  content: {
    paddingVertical: 0,
    paddingRight: 0,
    minWidth: 0,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 16,
  },
  categoryLabel: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    includeFontPadding: false,
    flexShrink: 1,
  },
  storeName: {
    fontFamily: 'BeVietnamPro_700Bold',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
    includeFontPadding: false,
  },
  description: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
  },
  expiration: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    includeFontPadding: false,
  },
  disabledCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 32,
  },
  disabledCtaLabel: {
    fontFamily: 'BeVietnamPro_700Bold',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
    includeFontPadding: false,
  },
});
