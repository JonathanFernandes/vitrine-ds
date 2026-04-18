import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { CouponIcon, LockIcon } from '../BenefitsCardVertical/icons';
import { SvgAssetIcon } from '../SvgAssetIcon';

interface IconProps {
  color?: string;
  borderColor?: string;
  size?: number;
}

export function BenefitsStarIcon({ size = 24 }: IconProps) {
  return <SvgAssetIcon name="benefits-star" width={size} height={size} />;
}

export function CalendarIcon({ size = 24 }: IconProps) {
  return <SvgAssetIcon name="calendar" width={size} height={size} />;
}

export function InvoiceHistoryIcon({ size = 24 }: IconProps) {
  return <SvgAssetIcon name="invoice-history" width={size} height={size} />;
}

export function ParkingIcon({ size = 24 }: IconProps) {
  return <SvgAssetIcon name="parking" width={size} height={size} />;
}

export function SacIcon({ size = 24 }: IconProps) {
  return <SvgAssetIcon name="sac" width={size} height={size} />;
}

export function ShoppingBagIcon({ size = 24 }: IconProps) {
  return <SvgAssetIcon name="shopping_bag" width={size} height={size} />;
}

export function WifiIcon({ size = 24 }: IconProps) {
  return <SvgAssetIcon name="wifi" width={size} height={size} />;
}

export function QrCodeIcon({ size = 24 }: IconProps) {
  return <SvgAssetIcon name="qr-code-nav" width={size} height={size} />;
}

export function RestaurantIcon({ size = 24 }: IconProps) {
  return <SvgAssetIcon name="restaurant" width={size} height={size} />;
}

export function CinemaIcon({ size = 24 }: IconProps) {
  return <SvgAssetIcon name="cinema" width={size} height={size} />;
}

export function TheaterIcon({ size = 24 }: IconProps) {
  return <SvgAssetIcon name="teatro" width={size} height={size} />;
}

export function MapIndoorIcon({ color = '#1B3C7E', size = 24 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 6.5L8.5 4L15 6.5L21 4V17.5L15.5 20L9 17.5L3 20V6.5Z"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={1.8}
      />
      <Path d="M9 4.5V17.5" stroke={color} strokeWidth={1.8} />
      <Path d="M15 6.5V19.5" stroke={color} strokeWidth={1.8} />
      <Circle cx={12} cy={10.75} r={1.75} fill={color} />
    </Svg>
  );
}

export function HelpIcon({
  color = '#1B3C7E',
  borderColor = '#1B3C7E',
  size = 24,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={borderColor} strokeWidth={1.8} />
      <Path d="M9.8 9.4C9.8 8.07452 10.8745 7 12.2 7C13.5255 7 14.6 8.07452 14.6 9.4C14.6 10.4915 13.8758 11.4138 12.8817 11.7121C12.3995 11.8567 12 12.2455 12 12.8V13.4" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Circle cx={12} cy={16.9} r={1.1} fill={color} />
    </Svg>
  );
}

export function CheckIcon({ color = '#1B3C7E', size = 24 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M20.5 6.5L9.5 17.5L4 12" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ArrowRightIcon({ color = '#1B3C7E', size = 24 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M5 12H18" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Path d="M13 7L18 12L13 17" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function SolarIcon({ color = '#1B3C7E', size = 24 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={4.5} stroke={color} strokeWidth={1.8} />
      <Path d="M12 2V5M12 19V22M2 12H5M19 12H22M5.2 5.2L7.3 7.3M16.7 16.7L18.8 18.8M18.8 5.2L16.7 7.3M7.3 16.7L5.2 18.8" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function ActiveBenefitsIcon({ color = '#1B3C7E', size = 24 }: IconProps) {
  return <CouponIcon color={color} size={size} />;
}

export function LockedBenefitsIcon({ color = '#1B3C7E', size = 24 }: IconProps) {
  return <LockIcon color={color} size={size} />;
}
