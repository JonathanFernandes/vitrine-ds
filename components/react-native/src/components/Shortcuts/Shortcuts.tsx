import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import {
  ActiveBenefitsIcon,
  ArrowRightIcon,
  BenefitsStarIcon,
  CalendarIcon,
  CheckIcon,
  CinemaIcon,
  HelpIcon,
  InvoiceHistoryIcon,
  LockedBenefitsIcon,
  MapIndoorIcon,
  ParkingIcon,
  QrCodeIcon,
  RestaurantIcon,
  SacIcon,
  ShoppingBagIcon,
  SolarIcon,
  TheaterIcon,
  WifiIcon,
} from './icons';

export type ShortcutType =
  | 'beneficios'
  | 'solar'
  | 'estacionamento'
  | 'lojas'
  | 'historico-compras'
  | 'historico-notas'
  | 'conectar-wifi'
  | 'wifi'
  | 'enviar-notas'
  | 'historico-recibos'
  | 'beneficios-ativos'
  | 'beneficios-utilizados'
  | 'proximos-niveis'
  | 'como-funciona'
  | 'central-ajuda'
  | 'ver-mais'
  | 'restaurantes'
  | 'cinema'
  | 'eventos'
  | 'teatro'
  | 'mapa-indoor';

export type ShortcutsVariant =
  | 'hub-home-deslogada'
  | 'hub-home-logada'
  | 'hub-menu'
  | 'hub-beneficios';

export interface ShortcutItemProps {
  type: ShortcutType;
  label?: string;
  icon?: React.ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
}

export interface ShortcutsProps {
  variant?: ShortcutsVariant;
  items?: ShortcutItemProps[];
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

export const DEFAULT_SHORTCUT_ITEMS_BY_VARIANT: Record<
  ShortcutsVariant,
  ShortcutItemProps[]
> = {
  'hub-home-deslogada': [
    { type: 'estacionamento' },
    { type: 'cinema' },
    { type: 'eventos' },
    { type: 'teatro' },
    { type: 'restaurantes' },
    { type: 'mapa-indoor' },
    { type: 'wifi' },
  ],
  'hub-home-logada': [
    { type: 'beneficios' },
    { type: 'historico-compras' },
    { type: 'estacionamento' },
    { type: 'cinema' },
    { type: 'restaurantes' },
    { type: 'eventos' },
    { type: 'lojas' },
    { type: 'wifi' },
  ],
  'hub-menu': [
    { type: 'enviar-notas' },
    { type: 'beneficios' },
    { type: 'estacionamento' },
    { type: 'lojas' },
  ],
  'hub-beneficios': [
    { type: 'beneficios-ativos' },
    { type: 'beneficios-utilizados' },
    { type: 'proximos-niveis' },
    { type: 'como-funciona' },
  ],
};

const HUB_CONFIG: Record<
  ShortcutsVariant,
  { width: number; gap: number; paddingRight: number; scrollable: boolean }
> = {
  'hub-home-deslogada': { width: 342, gap: 0, paddingRight: 16, scrollable: true },
  'hub-home-logada': { width: 342, gap: 0, paddingRight: 16, scrollable: true },
  'hub-menu': { width: 432, gap: 16, paddingRight: 0, scrollable: false },
  'hub-beneficios': { width: 432, gap: 16, paddingRight: 0, scrollable: false },
};

const DEFAULT_LABELS: Record<ShortcutType, string> = {
  beneficios: 'Meus benefícios',
  solar: 'Solar',
  estacionamento: 'Estacionamento',
  lojas: 'Lojas',
  'historico-compras': 'Histórico de compras',
  'historico-notas': 'Histórico de notas',
  'conectar-wifi': 'Conectar Wi-Fi',
  wifi: 'Wi-Fi',
  'enviar-notas': 'Enviar nota fiscal',
  'historico-recibos': 'Histórico de recibos',
  'beneficios-ativos': 'Benefícios ativos',
  'beneficios-utilizados': 'Benefícios utilizados',
  'proximos-niveis': 'Próximos níveis',
  'como-funciona': 'Como funciona?',
  'central-ajuda': 'Central de ajuda',
  'ver-mais': 'Ver mais',
  restaurantes: 'Restaurantes',
  cinema: 'Cinema',
  eventos: 'Eventos',
  teatro: 'Teatro',
  'mapa-indoor': 'Mapa indoor',
};

function getShortcutIcon(type: ShortcutType, color: string, borderColor: string) {
  switch (type) {
    case 'beneficios':
      return <BenefitsStarIcon color={color} />;
    case 'solar':
      return <SolarIcon color={color} />;
    case 'estacionamento':
      return <ParkingIcon color={color} />;
    case 'lojas':
      return <ShoppingBagIcon color={color} />;
    case 'historico-compras':
    case 'historico-notas':
    case 'historico-recibos':
      return <InvoiceHistoryIcon color={color} />;
    case 'conectar-wifi':
    case 'wifi':
      return <WifiIcon color={color} />;
    case 'enviar-notas':
      return <QrCodeIcon color={color} />;
    case 'beneficios-ativos':
      return <ActiveBenefitsIcon color={color} />;
    case 'beneficios-utilizados':
      return <CheckIcon color={color} />;
    case 'proximos-niveis':
      return <LockedBenefitsIcon color={color} />;
    case 'como-funciona':
      return <HelpIcon color={color} borderColor={borderColor} />;
    case 'central-ajuda':
      return <SacIcon color={color} />;
    case 'ver-mais':
      return <ArrowRightIcon color={color} />;
    case 'restaurantes':
      return <RestaurantIcon color={color} />;
    case 'cinema':
      return <CinemaIcon color={color} />;
    case 'eventos':
      return <CalendarIcon color={color} />;
    case 'teatro':
      return <TheaterIcon color={color} />;
    case 'mapa-indoor':
      return <MapIndoorIcon color={color} />;
    default:
      return <BenefitsStarIcon color={color} />;
  }
}

function ShortcutItem({ type, label, icon, onPress, accessibilityLabel }: ShortcutItemProps) {
  const { shortcuts } = useTheme();
  const isMore = type === 'ver-mais';
  const resolvedLabel = label ?? DEFAULT_LABELS[type];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? resolvedLabel}
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [styles.itemRoot, pressed && styles.pressed]}
    >
      <View
        style={[
          styles.iconCard,
          {
            backgroundColor: isMore ? 'transparent' : shortcuts.bg,
            borderColor: isMore ? shortcuts.moreBorder : shortcuts.border,
            borderRadius: shortcuts.radius,
          },
        ]}
      >
        {icon ?? getShortcutIcon(type, shortcuts.icon, isMore ? shortcuts.moreBorder : shortcuts.icon)}
      </View>
      <Text style={[styles.label, { color: shortcuts.label }]} numberOfLines={2}>
        {resolvedLabel}
      </Text>
    </Pressable>
  );
}

export function Shortcuts({
  variant = 'hub-home-deslogada',
  items,
  testID,
  style,
}: ShortcutsProps) {
  const config = HUB_CONFIG[variant];
  const resolvedItems = items ?? DEFAULT_SHORTCUT_ITEMS_BY_VARIANT[variant];
  const content = resolvedItems.map((item, index) => (
    <ShortcutItem
      key={`${item.type}-${index}`}
      {...item}
    />
  ));

  if (config.scrollable) {
    return (
      <ScrollView
        horizontal
        accessibilityLabel={`Lista de atalhos ${variant}`}
        contentContainerStyle={[
          styles.scrollContent,
          { gap: config.gap, paddingRight: config.paddingRight },
        ]}
        showsHorizontalScrollIndicator={false}
        style={[{ width: config.width }, style]}
        testID={testID}
      >
        {content}
      </ScrollView>
    );
  }

  return (
    <View
      style={[
        styles.staticRow,
        { gap: config.gap, width: config.width },
        style,
      ]}
      testID={testID}
    >
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    alignItems: 'flex-start',
  },
  staticRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  itemRoot: {
    width: 96,
    height: 108,
    alignItems: 'center',
    gap: 8,
  },
  iconCard: {
    width: 72,
    height: 64,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    width: 96,
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    textAlign: 'center',
    includeFontPadding: false,
  },
  pressed: {
    opacity: 0.8,
  },
});
