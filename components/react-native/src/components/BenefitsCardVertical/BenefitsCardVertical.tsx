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
import { CouponIcon, LockIcon, ServiceIcon } from './icons';

export type BenefitsCardVerticalAction = 'active' | 'disabled';

export interface BenefitsCardVerticalProps {
  action?: BenefitsCardVerticalAction;
  storeName: string;
  categoryLabel: string;
  description: string;
  expirationDate?: string;
  buttonLabel?: string;
  productImageSource?: ImageSourcePropType;
  storeLogoSource?: ImageSourcePropType;
  categoryIcon?: React.ReactNode;
  buttonIcon?: React.ReactNode;
  lockIcon?: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  onButtonPress?: () => void;
  testID?: string;
  accessibilityLabel?: string;
}

/**
 * Vertical benefits card used in carousels and benefit listings.
 * Matches the Figma node 7195:3512 for the active and blocked states.
 */
export function BenefitsCardVertical({
  action = 'active',
  storeName,
  categoryLabel,
  description,
  expirationDate,
  buttonLabel,
  productImageSource,
  storeLogoSource,
  categoryIcon,
  buttonIcon,
  lockIcon,
  onPress,
  onButtonPress,
  testID,
  accessibilityLabel,
}: BenefitsCardVerticalProps) {
  const { benefitsCardVertical } = useTheme();
  const isDisabled = action === 'disabled';
  const resolvedButtonLabel = buttonLabel ?? (isDisabled ? 'Bloqueado' : 'Ativar');
  const cardAccessibilityLabel =
    accessibilityLabel ??
    `${storeName}, ${categoryLabel}, ${description}${isDisabled ? ', benefício bloqueado' : expirationDate ? `, ${expirationDate}` : ''}`;

  const rootContent = (
    <>
      <View style={styles.imageWrapper}>
        {productImageSource ? (
          <Image
            source={productImageSource}
            style={[
              styles.image,
              {
                borderTopLeftRadius: benefitsCardVertical.radius,
                borderTopRightRadius: benefitsCardVertical.radius,
                opacity: isDisabled ? 0.45 : 1,
              },
            ]}
            resizeMode="cover"
          />
        ) : (
          <View
            style={[
              styles.image,
              styles.imagePlaceholder,
              {
                backgroundColor: benefitsCardVertical.imageBg,
                borderTopLeftRadius: benefitsCardVertical.radius,
                borderTopRightRadius: benefitsCardVertical.radius,
                opacity: isDisabled ? 0.7 : 1,
              },
            ]}
          />
        )}

        {storeLogoSource ? (
          <View
            style={[
              styles.storeLogoWrapper,
              {
                borderColor: benefitsCardVertical.logoBorder,
                borderRadius: benefitsCardVertical.radius,
              },
            ]}
          >
            <Image source={storeLogoSource} style={styles.storeLogo} resizeMode="contain" />
          </View>
        ) : null}

        {isDisabled ? (
          <View
            style={[
              styles.lockOverlay,
              { backgroundColor: benefitsCardVertical.lockBg },
            ]}
          >
            {lockIcon ?? <LockIcon color={benefitsCardVertical.onDark} />}
          </View>
        ) : null}
      </View>

      <View
        style={[
          styles.content,
          {
            backgroundColor: benefitsCardVertical.containerBg,
            borderBottomLeftRadius: benefitsCardVertical.radius,
            borderBottomRightRadius: benefitsCardVertical.radius,
          },
        ]}
      >
        <View style={styles.details}>
          <View style={styles.categoryRow}>
            <View style={styles.categoryContent}>
              {categoryIcon ?? <ServiceIcon color={benefitsCardVertical.secondary} />}
              <Text style={[styles.categoryLabel, { color: benefitsCardVertical.secondary }]}>
                {categoryLabel}
              </Text>
            </View>
          </View>

          <View style={styles.textContent}>
            <Text style={[styles.storeName, { color: benefitsCardVertical.text }]}>
              {storeName}
            </Text>
            <Text
              style={[styles.description, { color: benefitsCardVertical.text }]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {description}
            </Text>
          </View>

          {!isDisabled && expirationDate ? (
            <Text style={[styles.expirationDate, { color: benefitsCardVertical.secondary }]}>
              {expirationDate}
            </Text>
          ) : null}
        </View>

        <Button
          status="secondary"
          size="small"
          fullWidth
          disabled={isDisabled}
          onPress={onButtonPress}
          iconLeft={
            buttonIcon ??
            (isDisabled ? (
              <LockIcon color={benefitsCardVertical.action.disabled} />
            ) : (
              <CouponIcon color={benefitsCardVertical.action.active} />
            ))
          }
        >
          {resolvedButtonLabel}
        </Button>
      </View>
    </>
  );

  if (!onPress) {
    return (
      <View
        style={styles.root}
        testID={testID}
        accessibilityLabel={cardAccessibilityLabel}
      >
        {rootContent}
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={cardAccessibilityLabel}
      style={styles.root}
      testID={testID}
    >
      {rootContent}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 156,
  },
  imageWrapper: {
    position: 'relative',
    width: 156,
    height: 156,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
  },
  storeLogoWrapper: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  storeLogo: {
    width: 28,
    height: 28,
  },
  lockOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 40,
    height: 40,
    marginLeft: -20,
    marginTop: -20,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingTop: 12,
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 8,
    gap: 16,
  },
  details: {
    gap: 12,
  },
  categoryRow: {
    height: 16,
    justifyContent: 'center',
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  categoryLabel: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    includeFontPadding: false,
  },
  textContent: {
    gap: 4,
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
    lineHeight: 20,
  },
  expirationDate: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14.4,
    includeFontPadding: false,
  },
});
