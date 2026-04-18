import React from 'react';
import { Asset } from 'expo-asset';
import { SvgUri } from 'react-native-svg';

export type SvgAssetIconName =
  | 'benefits-star'
  | 'calendar'
  | 'cinema'
  | 'estrela-loyalt'
  | 'invoice-history'
  | 'parking'
  | 'qr-code-nav'
  | 'restaurant'
  | 'sac'
  | 'shopping_bag'
  | 'teatro'
  | 'wifi';

interface SvgAssetIconProps {
  name: SvgAssetIconName;
  width?: number;
  height?: number;
}

const SVG_ASSET_MODULES: Record<SvgAssetIconName, number> = {
  'benefits-star': require('../../Icons/benefits-star.svg'),
  calendar: require('../../Icons/calendar.svg'),
  cinema: require('../../Icons/cinema.svg'),
  'estrela-loyalt': require('../../Icons/estrela-loyalt.svg'),
  'invoice-history': require('../../Icons/invoice-history.svg'),
  parking: require('../../Icons/parking.svg'),
  'qr-code-nav': require('../../Icons/qr-code-nav.svg'),
  restaurant: require('../../Icons/restaurant.svg'),
  sac: require('../../Icons/sac.svg'),
  shopping_bag: require('../../Icons/shopping_bag.svg'),
  teatro: require('../../Icons/teatro.svg'),
  wifi: require('../../Icons/wifi.svg'),
};

const SVG_ASSET_URIS: Record<SvgAssetIconName, string> = {
  'benefits-star': Asset.fromModule(SVG_ASSET_MODULES['benefits-star']).uri,
  calendar: Asset.fromModule(SVG_ASSET_MODULES.calendar).uri,
  cinema: Asset.fromModule(SVG_ASSET_MODULES.cinema).uri,
  'estrela-loyalt': Asset.fromModule(SVG_ASSET_MODULES['estrela-loyalt']).uri,
  'invoice-history': Asset.fromModule(SVG_ASSET_MODULES['invoice-history']).uri,
  parking: Asset.fromModule(SVG_ASSET_MODULES.parking).uri,
  'qr-code-nav': Asset.fromModule(SVG_ASSET_MODULES['qr-code-nav']).uri,
  restaurant: Asset.fromModule(SVG_ASSET_MODULES.restaurant).uri,
  sac: Asset.fromModule(SVG_ASSET_MODULES.sac).uri,
  shopping_bag: Asset.fromModule(SVG_ASSET_MODULES.shopping_bag).uri,
  teatro: Asset.fromModule(SVG_ASSET_MODULES.teatro).uri,
  wifi: Asset.fromModule(SVG_ASSET_MODULES.wifi).uri,
};

export function SvgAssetIcon({
  name,
  width = 24,
  height = 24,
}: SvgAssetIconProps) {
  return (
    <SvgUri
      height={height}
      uri={SVG_ASSET_URIS[name]}
      width={width}
    />
  );
}
