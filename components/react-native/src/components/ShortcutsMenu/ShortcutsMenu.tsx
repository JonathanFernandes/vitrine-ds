import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme';

export type ShortcutsMenuApplication = 'category' | 'menu';
export type ShortcutsMenuState = 'active' | 'default' | 'number' | 'disabled';
export type ShortcutsMenuFeature =
  | 'reserva-de-mesa'
  | 'fila-online'
  | 'cardapio-digital';

export interface ShortcutsMenuProps {
  application: ShortcutsMenuApplication;
  state?: ShortcutsMenuState;
  feature?: ShortcutsMenuFeature;
  label: string;
  number?: string;
  icon?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

function DiamondIcon({
  fillColor,
  strokeColor,
}: {
  fillColor: string;
  strokeColor: string;
}) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 5.5h10l4 5-9 8.5L3 10.5l4-5Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Path d="M9.5 5.5 12 10.5l2.5-5" stroke={strokeColor} strokeWidth={1.5} />
      <Path d="M7 10.5h10" stroke={strokeColor} strokeWidth={1.5} />
    </Svg>
  );
}

function CheckBadgeIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M4 5h10l4 4-4 4H4V5Z" stroke={color} strokeWidth={1.8} />
      <Path d="m8.5 9 2 2 4-4" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} />
    </Svg>
  );
}

function TableReservationIcon({
  color,
  accent,
}: {
  color: string;
  accent: string;
}) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12.5599 14.5151H12.6503C12.8311 14.5151 13.0119 14.4515 13.151 14.3384L16.809 11.3429C17.1567 11.0603 17.2123 10.5517 16.9342 10.1984C16.7951 10.0218 16.6073 9.91582 16.3917 9.89463C16.1692 9.87343 15.9675 9.93702 15.8006 10.0712L12.7754 12.544L11.8436 11.3288C11.7114 11.1592 11.5237 11.0533 11.3081 11.025C11.0994 10.9967 10.8839 11.0603 10.717 11.1946C10.3692 11.4701 10.3067 11.9858 10.5779 12.3391L12.0174 14.2042C12.1496 14.3808 12.3512 14.4939 12.5599 14.5151Z"
        fill={accent}
      />
      <Path
        d="M22.7829 17.1856L20.6131 6.09374C20.4462 5.359 19.8134 4.84326 19.0693 4.84326H5.83514C5.83514 4.84326 5.76559 4.85033 5.73777 4.85739C5.04929 4.90685 4.47208 5.40139 4.31213 6.09374L2.13542 17.1856C2.0311 17.666 2.13542 18.1605 2.44141 18.542C2.74045 18.9235 3.19248 19.1496 3.67929 19.1496H8.60992C8.95764 19.1496 9.23582 18.867 9.23582 18.5138C9.23582 18.1605 8.95764 17.8779 8.60992 17.8779H3.67929C3.5402 17.8779 3.45675 17.8002 3.42197 17.7508C3.3872 17.7013 3.33157 17.6024 3.35939 17.4682L5.09102 8.34744L6.92002 17.8991C7.08692 18.6339 7.71977 19.1496 8.46388 19.1496H21.246C21.7328 19.1496 22.1779 18.9306 22.4839 18.542C22.7829 18.1605 22.8942 17.6589 22.7899 17.1856H22.7829ZM21.4963 17.7508C21.4616 17.8002 21.3781 17.8779 21.239 17.8779H8.45693C8.30393 17.8779 8.1718 17.772 8.13703 17.6165L5.83514 6.12907C5.83514 6.12907 5.84209 6.12907 5.84904 6.12907H12.1219C12.1219 6.12907 12.1219 6.12907 12.1288 6.12907H19.0693C19.2223 6.12907 19.3544 6.23504 19.3892 6.39047L21.5589 17.4823C21.5867 17.6165 21.5311 17.7155 21.4963 17.7649V17.7508Z"
        fill={color}
      />
      <Path
        d="M21.239 19.3334H8.45691C8.45691 19.3334 8.40128 19.3334 8.37346 19.3334H3.67927C3.14379 19.3334 2.64307 19.0861 2.30231 18.6623C1.9685 18.2384 1.84332 17.6873 1.96155 17.1504L4.13826 6.05853C4.31212 5.28846 4.94497 4.7374 5.72385 4.68088C5.77949 4.67381 5.80731 4.66675 5.83512 4.66675H19.0693C19.8968 4.66675 20.5992 5.239 20.787 6.05853L22.9567 17.1504C23.075 17.6802 22.9567 18.2313 22.616 18.6623C22.2752 19.0932 21.7815 19.3334 21.239 19.3334ZM9.27753 18.9731H21.239C21.6702 18.9731 22.0666 18.7753 22.3378 18.4362C22.6021 18.0971 22.7064 17.652 22.609 17.2281L20.4393 6.13624C20.2932 5.48627 19.7299 5.02706 19.0693 5.02706L5.75167 5.04119C5.13273 5.09064 4.62507 5.52866 4.48598 6.14331L2.30927 17.221C2.2119 17.6449 2.30927 18.0829 2.58049 18.4291C2.85171 18.7682 3.2481 18.966 3.67927 18.966H7.3929C7.10082 18.74 6.88523 18.4291 6.77396 18.0547H3.67927C3.46369 18.0547 3.33851 17.9346 3.28288 17.8639C3.23419 17.8074 3.13683 17.652 3.18551 17.4259L5.09101 7.53508L7.05214 17.6944H7.97706C7.97706 17.6944 7.97011 17.6661 7.97011 17.659L5.61258 5.94549H19.0693C19.3057 5.94549 19.5143 6.10092 19.563 6.34112L21.7328 17.433C21.7815 17.6449 21.6911 17.7933 21.6354 17.871C21.5381 17.9911 21.392 18.0617 21.239 18.0617H9.27753C9.36098 18.1889 9.41662 18.3514 9.41662 18.5139C9.41662 18.6764 9.36794 18.8389 9.27753 18.9731ZM8.38042 18.966H8.60991C8.86027 18.966 9.05499 18.7612 9.05499 18.5068C9.05499 18.2525 8.87418 18.0688 8.64468 18.0547H8.44996C8.44996 18.0547 8.42214 18.0547 8.41519 18.0547H7.14254C7.33726 18.5775 7.81711 18.9378 8.37346 18.966H8.38042ZM8.65859 17.6944H21.239C21.3016 17.6944 21.3364 17.6661 21.3572 17.6378C21.3851 17.5955 21.399 17.5531 21.3851 17.5107L19.2153 6.41884C19.2014 6.34819 19.1388 6.29873 19.0693 6.29873H6.05766L8.30392 17.5743C8.31783 17.6378 8.36651 17.6873 8.4291 17.6944H8.60296C8.60296 17.6944 8.63077 17.6944 8.65164 17.6944H8.65859ZM5.09101 9.16L3.53323 17.5107C3.51932 17.5743 3.54714 17.6167 3.56105 17.6378C3.58887 17.6802 3.63059 17.6944 3.67927 17.6944H6.69051L5.09101 9.16Z"
        fill={color}
      />
    </Svg>
  );
}

function CompareArrowsIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9.01 14H2V16H9.01V19L13 15L9.01 11V14ZM14.99 13V10H22V8H14.99V5L11 9L14.99 13Z"
        fill={color}
      />
    </Svg>
  );
}

function MenuBookIcon({ color, accent }: { color: string; accent: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 5C19.89 4.65 18.67 4.5 17.5 4.5C15.55 4.5 13.45 4.9 12 6C10.55 4.9 8.45 4.5 6.5 4.5C4.55 4.5 2.45 4.9 1 6V20.65C1 20.9 1.25 21.15 1.5 21.15C1.6 21.15 1.65 21.1 1.75 21.1C3.1 20.45 5.05 20 6.5 20C8.45 20 10.55 20.4 12 21.5C13.35 20.65 15.8 20 17.5 20C19.15 20 20.85 20.3 22.25 21.05C22.35 21.1 22.4 21.1 22.5 21.1C22.75 21.1 23 20.85 23 20.6V6C22.4 5.55 21.75 5.25 21 5ZM3 18.5V7C4.1 6.65 5.3 6.5 6.5 6.5C7.84 6.5 9.63 6.91 11 7.49V18.99C9.63 18.41 7.84 18 6.5 18C5.3 18 4.1 18.15 3 18.5ZM21 18.5C19.9 18.15 18.7 18 17.5 18C16.16 18 14.37 18.41 13 18.99V7.49C14.37 6.9 16.16 6.5 17.5 6.5C18.7 6.5 19.9 6.65 21 7V18.5Z"
        fill={color}
      />
      <Path
        d="M17.5 10.5C18.38 10.5 19.23 10.59 20 10.76V9.24C19.21 9.09 18.36 9 17.5 9C16.22 9 15.04 9.16 14 9.47V11.04C14.99 10.69 16.18 10.5 17.5 10.5Z"
        fill={accent}
      />
      <Path
        d="M17.5 13.1599C18.38 13.1599 19.23 13.2499 20 13.4199V11.8999C19.21 11.7499 18.36 11.6599 17.5 11.6599C16.22 11.6599 15.04 11.8199 14 12.1299V13.6999C14.99 13.3599 16.18 13.1599 17.5 13.1599Z"
        fill={accent}
      />
      <Path
        d="M17.5 15.8301C18.38 15.8301 19.23 15.9201 20 16.0901V14.5701C19.21 14.4201 18.36 14.3301 17.5 14.3301C16.22 14.3301 15.04 14.4901 14 14.8001V16.3701C14.99 16.0201 16.18 15.8301 17.5 15.8301Z"
        fill={accent}
      />
    </Svg>
  );
}

function getMenuIcon(
  feature: ShortcutsMenuFeature | undefined,
  color: string,
  accent: string,
) {
  switch (feature) {
    case 'reserva-de-mesa':
      return <TableReservationIcon color={color} accent={accent} />;
    case 'fila-online':
      return <CompareArrowsIcon color={color} />;
    case 'cardapio-digital':
      return <MenuBookIcon color={color} accent={accent} />;
    default:
      return <TableReservationIcon color={color} accent={accent} />;
  }
}

export function ShortcutsMenu({
  application,
  state = 'default',
  feature,
  label,
  number,
  icon,
  onPress,
  disabled = false,
  accessibilityLabel,
  style,
}: ShortcutsMenuProps) {
  const { shortcutsMenu } = useTheme();
  const isCategory = application === 'category';
  const isActive = isCategory && state === 'active';
  const isDisabled = disabled || (isCategory && state === 'disabled');
  const isNumber = isCategory && state === 'number';
  const isMenu = application === 'menu';

  const content = (
    <View
      style={[
        styles.card,
        {
          borderRadius: shortcutsMenu.radius,
        },
        isMenu
          ? {
              backgroundColor: shortcutsMenu.menu.bg,
              borderColor: shortcutsMenu.menu.border,
              borderWidth: 1,
            }
          : {
              backgroundColor: isActive
                ? shortcutsMenu.active.bg
                : shortcutsMenu.default.bg,
              borderColor: isActive
                ? shortcutsMenu.active.border
                : shortcutsMenu.default.border,
              borderWidth: 1,
            },
      ]}
    >
      {isMenu ? (
        <>
          <View style={styles.menuIconsRow}>
            {icon ?? getMenuIcon(feature, shortcutsMenu.menu.icon, shortcutsMenu.menu.iconAccent)}
            <View style={styles.menuGap} />
          </View>
          <View style={styles.menuContentRow}>
            <Text style={[styles.menuLabel, { color: shortcutsMenu.menu.label }]}>{label}</Text>
          </View>
        </>
      ) : (
        <>
          {icon ??
            (isActive ? (
              <CheckBadgeIcon color={shortcutsMenu.active.icon} />
            ) : (
              <DiamondIcon
                fillColor={shortcutsMenu.default.iconFill}
                strokeColor={
                  isDisabled
                    ? shortcutsMenu.disabled.iconStroke
                    : shortcutsMenu.default.iconStroke
                }
              />
            ))}
          <View style={styles.categoryLabelWrap}>
            {isNumber ? (
              <Text style={[styles.categoryLabel, { color: shortcutsMenu.default.label }]}>
                <Text style={styles.categoryNumber}>{number ?? '01'}</Text>
                <Text>{` ${label}`}</Text>
              </Text>
            ) : (
              <Text
                style={[
                  styles.categoryLabel,
                  {
                    color: isActive
                      ? shortcutsMenu.active.label
                      : isDisabled
                        ? shortcutsMenu.disabled.label
                        : shortcutsMenu.default.label,
                  },
                ]}
              >
                {label}
              </Text>
            )}
          </View>
        </>
      )}
    </View>
  );

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: isDisabled, selected: isActive }}
      disabled={isDisabled}
      hitSlop={8}
      onPress={isDisabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.root,
        style,
        pressed && !isDisabled && styles.pressed,
      ]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 88,
    height: 88,
    borderRadius: 4,
  },
  card: {
    flex: 1,
    padding: 8,
  },
  pressed: {
    opacity: 0.85,
  },
  categoryLabelWrap: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  categoryLabel: {
    width: 72,
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 12,
    includeFontPadding: false,
  },
  categoryNumber: {
    fontFamily: 'BeVietnamPro_700Bold',
    fontWeight: '700',
  },
  menuIconsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  menuGap: {
    flex: 1,
    minHeight: 24,
  },
  menuContentRow: {
    marginTop: 16,
    width: '100%',
  },
  menuLabel: {
    width: 72,
    fontFamily: 'BeVietnamPro_700Bold',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 14,
    color: '#1B3C7E',
    includeFontPadding: false,
  },
});
