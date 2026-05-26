import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { BagNavbarIcon } from '../BottomMenu/icons/BagNavbarIcon';
import { Button } from '../Button';
import { Link } from '../Link';
import { useTheme } from '../../theme';
import { STORE_CARD_ASSETS } from './assets';
import {
  getStoreCardActionIcon,
  PlaceIcon,
  StoreCardAssetIcon,
} from './icons';

export type StoreCardFluxo = 'restaurante' | 'lojas';

export interface StoreCardAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onPress: () => void;
  accessibilityLabel?: string;
}

export interface StoreCardProps {
  fluxo: StoreCardFluxo;
  title: string;
  subtitle: string;
  locationLabel: string;
  onLocationPress?: () => void;
  /** Sobrescreve o logo Abbraccio padrão no fluxo restaurante */
  avatarSource?: ImageSourcePropType;
  /** Sobrescreve o logo Adidas padrão no fluxo lojas */
  brandLogoSource?: ImageSourcePropType;
  brandLogo?: React.ReactNode;
  onWhatsAppPress?: () => void;
  onCallPress?: () => void;
  actions: StoreCardAction[];
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

const MEDIA_SIZE = 88;
const BUTTON_WIDTH = 144;
const ICON_HIT_SLOP = { top: 10, bottom: 10, left: 10, right: 10 };

/**
 * Store listing card — Figma `store-card` (`7995:6944`).
 * @see specs/component-spec/store-card.md
 */
export function StoreCard({
  fluxo,
  title,
  subtitle,
  locationLabel,
  onLocationPress,
  avatarSource,
  brandLogoSource,
  brandLogo,
  onWhatsAppPress,
  onCallPress,
  actions,
  testID,
  style,
}: StoreCardProps) {
  const { storeCard, button } = useTheme();
  const isRestaurante = fluxo === 'restaurante';

  const shopActionIcon = (
    <BagNavbarIcon color={button.secondary.label.default} size={16} />
  );

  const restaurantImage =
    avatarSource ?? STORE_CARD_ASSETS.logoAbbraccio;

  const leadingMedia = isRestaurante ? (
    <View
      style={[
        styles.media,
        {
          backgroundColor: storeCard.avatar.bg,
          borderColor: storeCard.avatar.border,
          borderWidth: storeCard.avatar.borderWidth,
          borderRadius: storeCard.avatar.radius,
        },
      ]}
    >
      <Image
        source={restaurantImage}
        style={[styles.mediaImage, { borderRadius: storeCard.avatar.radius }]}
        resizeMode="cover"
      />
    </View>
  ) : (
    <View
      style={[
        styles.media,
        {
          backgroundColor: storeCard.logo.bg,
          borderColor: storeCard.logo.border,
          borderWidth: storeCard.logo.borderWidth,
          borderRadius: storeCard.logo.radius,
        },
      ]}
    >
      {brandLogo ? (
        <View style={styles.brandLogoSlot}>{brandLogo}</View>
      ) : (
        <Image
          source={brandLogoSource ?? STORE_CARD_ASSETS.logoAdidas}
          style={[styles.mediaImage, { borderRadius: storeCard.logo.radius }]}
          resizeMode="contain"
        />
      )}
    </View>
  );

  const contactIcons = (
    <View style={[styles.iconGroup, { gap: storeCard.spacing.iconGroupGap }]}>
      {onWhatsAppPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`WhatsApp de ${title}`}
          hitSlop={ICON_HIT_SLOP}
          onPress={onWhatsAppPress}
          style={styles.iconTouch}
        >
          <StoreCardAssetIcon
            source={STORE_CARD_ASSETS.whatsapp}
            size={24}
          />
        </Pressable>
      ) : null}
      {onCallPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Ligar para ${title}`}
          hitSlop={ICON_HIT_SLOP}
          onPress={onCallPress}
          style={styles.iconTouch}
        >
          <StoreCardAssetIcon source={STORE_CARD_ASSETS.call} size={24} />
        </Pressable>
      ) : null}
    </View>
  );

  const placeIcon = (
    <PlaceIcon color={storeCard.icon.location} size={16} />
  );

  function renderActionButton(action: StoreCardAction, fillRow: boolean) {
    const icon =
      action.icon ??
      getStoreCardActionIcon(action.id, action.label, shopActionIcon);

    return (
      <View
        key={action.id}
        style={[styles.actionCell, fillRow && styles.actionCellFill]}
      >
        <Button
          status="secondary"
          size="small"
          fullWidth
          onPress={action.onPress}
          iconLeft={icon ?? undefined}
          accessibilityLabel={action.accessibilityLabel ?? action.label}
        >
          {action.label}
        </Button>
      </View>
    );
  }

  function renderActionRow(rowActions: StoreCardAction[]) {
    if (rowActions.length === 0) {
      return null;
    }

    const fillRow = rowActions.length === 1;

    return (
      <View style={[styles.actionsRow, { gap: storeCard.spacing.buttonGap }]}>
        {rowActions.map((action) => renderActionButton(action, fillRow))}
      </View>
    );
  }

  const actionRows = isRestaurante ? (
    <View style={[styles.actionsVertical, { gap: storeCard.spacing.buttonGap }]}>
      {renderActionRow(actions.slice(0, 2))}
      {renderActionRow(actions.slice(2, 4))}
    </View>
  ) : (
    renderActionRow(actions.slice(0, 2))
  );

  return (
    <View
      testID={testID}
      style={[
        styles.root,
        {
          backgroundColor: storeCard.bg,
          borderColor: storeCard.border,
          borderRadius: storeCard.radius,
          padding: storeCard.spacing.cardPadding,
          gap: storeCard.spacing.cardGap,
        },
        style,
      ]}
    >
      <View style={[styles.contentRow, { gap: storeCard.spacing.contentGap }]}>
        <View style={[styles.infoGroup, { gap: storeCard.spacing.infoGap }]}>
          {leadingMedia}
          <View style={[styles.textColumn, { gap: storeCard.spacing.contentInnerGap }]}>
            <View style={[styles.textStack, { gap: storeCard.spacing.textGap }]}>
              <Text
                numberOfLines={2}
                style={[styles.title, { color: storeCard.title }]}
              >
                {title}
              </Text>
              <Text
                numberOfLines={2}
                style={[styles.subtitle, { color: storeCard.subtitle }]}
              >
                {subtitle}
              </Text>
            </View>
            {onLocationPress ? (
              <Link
                size="extraSmall"
                onPress={onLocationPress}
                iconLeft={placeIcon}
                showChevronRight={false}
                accessibilityLabel={`${locationLabel}, ver localização`}
              >
                {locationLabel}
              </Link>
            ) : (
              <View style={styles.locationRow}>
                {placeIcon}
                <Text
                  style={[
                    styles.locationText,
                    { color: storeCard.icon.location },
                  ]}
                >
                  {locationLabel}
                </Text>
              </View>
            )}
          </View>
        </View>
        {contactIcons}
      </View>
      {actions.length > 0 ? actionRows : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 328,
    maxWidth: '100%',
    borderWidth: 1,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  infoGroup: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  media: {
    width: MEDIA_SIZE,
    height: MEDIA_SIZE,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediaImage: {
    width: '100%',
    height: '100%',
  },
  brandLogoSlot: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textColumn: {
    flex: 1,
    minWidth: 0,
  },
  textStack: {
    width: '100%',
  },
  title: {
    fontFamily: 'BeVietnamPro_600SemiBold',
    fontSize: 16,
    fontWeight: '600',
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
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
  },
  locationText: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 12,
    lineHeight: 14,
    includeFontPadding: false,
  },
  iconGroup: {
    alignItems: 'center',
  },
  iconTouch: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionsVertical: {
    width: '100%',
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  actionCell: {
    width: BUTTON_WIDTH,
    maxWidth: '48%',
    flexGrow: 1,
  },
  actionCellFill: {
    width: '100%',
    maxWidth: '100%',
    flexGrow: 1,
  },
});
