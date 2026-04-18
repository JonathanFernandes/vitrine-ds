import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme';
import {
  BottomMenuItem,
  BottomMenuItemType,
} from './BottomMenuItem';
import {
  BagNavbarIcon,
  BagNavbarFilledIcon,
  BenefitsStarIcon,
  BenefitsStarFilledIcon,
  HomeNavbarFilledIcon,
  HomeNavbarIcon,
  MenuAndroidIcon,
  QrCodeNavIcon,
} from './icons';

export interface BottomMenuItemConfig {
  type: BottomMenuItemType;
  label: string;
  icon: React.ReactNode;
  /** Optional alternative icon for the active state (e.g. filled vs outline). */
  activeIcon?: React.ReactNode;
}

export interface BottomMenuProps {
  activeTab: BottomMenuItemType;
  onTabPress: (tab: BottomMenuItemType) => void;
  /**
   * Custom tab configuration. Defaults to the standard 5-tab layout:
   * Início · Benefícios · Enviar nota · Lojas · Menu
   *
   * When providing custom items, pass icons as React elements that accept
   * an optional `color` prop — the component will inject the correct theme color.
   */
  items?: BottomMenuItemConfig[];
}

const DEFAULT_ITEMS: BottomMenuItemConfig[] = [
  { type: 'home', label: 'Início', icon: <HomeNavbarIcon />, activeIcon: <HomeNavbarFilledIcon /> },
  { type: 'benefits', label: 'Benefícios', icon: <BenefitsStarIcon />, activeIcon: <BenefitsStarFilledIcon /> },
  { type: 'default', label: 'Enviar nota', icon: <QrCodeNavIcon /> },
  { type: 'stores', label: 'Lojas', icon: <BagNavbarIcon />, activeIcon: <BagNavbarFilledIcon /> },
  { type: 'menu', label: 'Menu', icon: <MenuAndroidIcon /> },
];

/**
 * Bottom navigation bar fixed at the base of the screen.
 *
 * Renders 5 tabs in a horizontal row with a top border separator.
 * The active tab shows bold text + theme-colored icon/label.
 * Type `"default"` (Enviar nota) has a wider layout with a rounded BgFrame.
 */
export function BottomMenu({
  activeTab,
  onTabPress,
  items = DEFAULT_ITEMS,
}: BottomMenuProps) {
  const { bottomMenu } = useTheme();

  return (
    <View
      accessibilityRole="tablist"
      style={[
        styles.container,
        {
          backgroundColor: bottomMenu.bg,
          borderTopColor: bottomMenu.border,
        },
      ]}
    >
      {items.map((item, index) => {
        const isActive = activeTab === item.type;
        const icon = isActive && item.activeIcon ? item.activeIcon : item.icon;

        return (
          <BottomMenuItem
            key={item.type}
            type={item.type}
            label={item.label}
            icon={icon}
            isActive={isActive}
            onPress={() => onTabPress(item.type)}
            accessibilityLabel={`${item.label}, tab ${index + 1} de ${items.length}`}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 86,
    borderTopWidth: 1,
    paddingBottom: 16,
    width: '100%',
  },
});
