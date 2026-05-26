import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  ImageStyle,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { STORE_CARD_ASSETS } from './assets';

export { STORE_CARD_ASSETS };

/** Path de `specs/assets/place.svg` (viewBox 12×12) — tokenizável via `fill`. */
const PLACE_ICON_PATH =
  'M6 1C8.1 1 10 2.61 10 5.1C10 6.76 8.665 8.725 6 11C3.335 8.725 2 6.76 2 5.1C2 2.61 3.9 1 6 1ZM9 5.1C9 3.285 7.675 2 6 2C4.325 2 3 3.285 3 5.1C3 6.27 3.975 7.82 6 9.67C8.025 7.82 9 6.27 9 5.1ZM6 6C5.45 6 5 5.55 5 5C5 4.45 5.45 4 6 4C6.55 4 7 4.45 7 5C7 5.55 6.55 6 6 6Z';

/** Ícone de localização no `Link` do Store Card — 16 px (Figma `place`). */
export function PlaceIcon({
  color,
  size = 16,
}: {
  color: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <Path d={PLACE_ICON_PATH} fill={color} />
    </Svg>
  );
}

export function StoreCardAssetIcon({
  source,
  size = 24,
  style,
}: {
  source: ImageSourcePropType;
  size?: number;
  style?: StyleProp<ImageStyle>;
}) {
  return (
    <Image
      source={source}
      style={[{ width: size, height: size }, style]}
      resizeMode="contain"
    />
  );
}

export type StoreCardActionIconKey =
  | 'menu'
  | 'queue'
  | 'reserve'
  | 'benefits'
  | 'shop';

export function resolveStoreCardActionIconKey(
  id: string,
  label: string,
): StoreCardActionIconKey | null {
  const key = `${id} ${label}`.toLowerCase();

  if (key.includes('card') || key.includes('menu') || key.includes('cardápio')) {
    return 'menu';
  }
  if (key.includes('fila') || key.includes('queue') || key.includes('order')) {
    return 'queue';
  }
  if (key.includes('reserv') || key.includes('mesa')) {
    return 'reserve';
  }
  if (key.includes('benef') || key.includes('benefício')) {
    return 'benefits';
  }
  if (key.includes('compra') || key.includes('shop') || key.includes('online')) {
    return 'shop';
  }

  return null;
}

const ACTION_ASSET: Record<
  Exclude<StoreCardActionIconKey, 'shop'>,
  ImageSourcePropType
> = {
  menu: STORE_CARD_ASSETS.digitalMenu,
  queue: STORE_CARD_ASSETS.order,
  reserve: STORE_CARD_ASSETS.tableReservation,
  benefits: STORE_CARD_ASSETS.benefitsStar,
};

export function getStoreCardActionIcon(
  id: string,
  label: string,
  shopFallback?: React.ReactNode,
): React.ReactNode {
  const resolved = resolveStoreCardActionIconKey(id, label);

  if (!resolved) {
    return null;
  }

  if (resolved === 'shop') {
    return shopFallback ?? null;
  }

  return <StoreCardAssetIcon source={ACTION_ASSET[resolved]} size={16} />;
}
