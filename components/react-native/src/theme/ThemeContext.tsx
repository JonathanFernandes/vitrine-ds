import {
  BeVietnamPro_400Regular,
  BeVietnamPro_600SemiBold,
  BeVietnamPro_700Bold,
  useFonts,
} from '@expo-google-fonts/be-vietnam-pro';
import React, { createContext, useContext, useState } from 'react';
import {
  avatarTokens,
  AvatarThemeTokens,
  bottomSheetTokens,
  BottomSheetThemeTokens,
  badgeTokens,
  BadgeThemeTokens,
  cardOptionsTokens,
  CardOptionsThemeTokens,
  carouselStoreTokens,
  CarouselStoreThemeTokens,
  headerHomeTokens,
  HeaderHomeThemeTokens,
  linkTokens,
  LinkThemeTokens,
  modalMobileTokens,
  ModalMobileThemeTokens,
  menuItemTokens,
  MenuItemThemeTokens,
  moviePosterTokens,
  MoviePosterThemeTokens,
  eventCardTokens,
  EventCardThemeTokens,
  fiquePorDentroCardTokens,
  FiquePorDentroCardThemeTokens,
  toolbarTokens,
  ToolbarThemeTokens,
  shortcutsTokens,
  ShortcutsThemeTokens,
  notificationIconGroupTokens,
  NotificationIconGroupThemeTokens,
  shortcutsMenuTokens,
  ShortcutsMenuThemeTokens,
  bannerTokens,
  BannerThemeTokens,
  benefitsGoalsTokens,
  BenefitsGoalsThemeTokens,
  benefitsContentCardTokens,
  BenefitsContentCardThemeTokens,
  benefitsCardVerticalTokens,
  BenefitsCardVerticalThemeTokens,
  bottomMenuTokens,
  BottomMenuThemeTokens,
  buttonTokens,
  ButtonThemeTokens,
  cardStoreItemTokens,
  CardStoreItemThemeTokens,
  sectionTitleTokens,
  SectionTitleThemeTokens,
  dotnavTokens,
  DotnavThemeTokens,
  inputTokens,
  InputThemeTokens,
  cameraTokens,
  CameraThemeTokens,
  progressBarTokens,
  ProgressBarThemeTokens,
  radioIconTokens,
  RadioIconThemeTokens,
  ThemeName,
} from './themes';

interface ThemeContextValue {
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
  avatar: AvatarThemeTokens;
  bottomSheet: BottomSheetThemeTokens;
  button: ButtonThemeTokens;
  bottomMenu: BottomMenuThemeTokens;
  cardOptions: CardOptionsThemeTokens;
  benefitsCardVertical: BenefitsCardVerticalThemeTokens;
  benefitsGoals: BenefitsGoalsThemeTokens;
  benefitsContentCard: BenefitsContentCardThemeTokens;
  dotnav: DotnavThemeTokens;
  banner: BannerThemeTokens;
  cardStoreItem: CardStoreItemThemeTokens;
  carouselStore: CarouselStoreThemeTokens;
  headerHome: HeaderHomeThemeTokens;
  sectionTitle: SectionTitleThemeTokens;
  badge: BadgeThemeTokens;
  link: LinkThemeTokens;
  modalMobile: ModalMobileThemeTokens;
  menuItem: MenuItemThemeTokens;
  moviePoster: MoviePosterThemeTokens;
  eventCard: EventCardThemeTokens;
  fiquePorDentroCard: FiquePorDentroCardThemeTokens;
  toolbar: ToolbarThemeTokens;
  shortcuts: ShortcutsThemeTokens;
  notificationIconGroup: NotificationIconGroupThemeTokens;
  shortcutsMenu: ShortcutsMenuThemeTokens;
  input: InputThemeTokens;
  camera: CameraThemeTokens;
  progressBar: ProgressBarThemeTokens;
  radioIcon: RadioIconThemeTokens;
  fontsLoaded: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  themeName: 'neutral',
  setTheme: () => {},
  avatar: avatarTokens.neutral,
  bottomSheet: bottomSheetTokens.neutral,
  button: buttonTokens.neutral,
  bottomMenu: bottomMenuTokens.neutral,
  cardOptions: cardOptionsTokens.neutral,
  benefitsCardVertical: benefitsCardVerticalTokens.neutral,
  benefitsGoals: benefitsGoalsTokens.neutral,
  benefitsContentCard: benefitsContentCardTokens.neutral,
  dotnav: dotnavTokens.neutral,
  banner: bannerTokens.neutral,
  cardStoreItem: cardStoreItemTokens.neutral,
  carouselStore: carouselStoreTokens.neutral,
  headerHome: headerHomeTokens.neutral,
  sectionTitle: sectionTitleTokens.neutral,
  badge: badgeTokens.neutral,
  link: linkTokens.neutral,
  modalMobile: modalMobileTokens.neutral,
  menuItem: menuItemTokens.neutral,
  moviePoster: moviePosterTokens.neutral,
  eventCard: eventCardTokens.neutral,
  fiquePorDentroCard: fiquePorDentroCardTokens.neutral,
  toolbar: toolbarTokens.neutral,
  shortcuts: shortcutsTokens.neutral,
  notificationIconGroup: notificationIconGroupTokens.neutral,
  shortcutsMenu: shortcutsMenuTokens.neutral,
  input: inputTokens.neutral,
  camera: cameraTokens.neutral,
  progressBar: progressBarTokens.neutral,
  radioIcon: radioIconTokens.neutral,
  fontsLoaded: false,
});

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: ThemeName;
  /**
   * Rendered while fonts are loading. Defaults to null (nothing).
   * Pass a splash screen or skeleton to avoid a flash of unstyled text.
   */
  fallback?: React.ReactNode;
}

export function ThemeProvider({
  children,
  initialTheme = 'neutral',
  fallback = null,
}: ThemeProviderProps) {
  const [themeName, setTheme] = useState<ThemeName>(initialTheme);
  const [fontsLoaded] = useFonts({
    BeVietnamPro_400Regular,
    BeVietnamPro_600SemiBold,
    BeVietnamPro_700Bold,
  });

  return (
    <ThemeContext.Provider
      value={{
        themeName,
        setTheme,
        avatar: avatarTokens[themeName],
        bottomSheet: bottomSheetTokens[themeName],
        button: buttonTokens[themeName],
        bottomMenu: bottomMenuTokens[themeName],
        cardOptions: cardOptionsTokens[themeName],
        benefitsCardVertical: benefitsCardVerticalTokens[themeName],
        benefitsGoals: benefitsGoalsTokens[themeName],
        benefitsContentCard: benefitsContentCardTokens[themeName],
        dotnav: dotnavTokens[themeName],
        banner: bannerTokens[themeName],
        cardStoreItem: cardStoreItemTokens[themeName],
        carouselStore: carouselStoreTokens[themeName],
        headerHome: headerHomeTokens[themeName],
        sectionTitle: sectionTitleTokens[themeName],
        badge: badgeTokens[themeName],
        link: linkTokens[themeName],
        modalMobile: modalMobileTokens[themeName],
        menuItem: menuItemTokens[themeName],
        moviePoster: moviePosterTokens[themeName],
        eventCard: eventCardTokens[themeName],
        fiquePorDentroCard: fiquePorDentroCardTokens[themeName],
        toolbar: toolbarTokens[themeName],
        shortcuts: shortcutsTokens[themeName],
        notificationIconGroup: notificationIconGroupTokens[themeName],
        shortcutsMenu: shortcutsMenuTokens[themeName],
        input: inputTokens[themeName],
        camera: cameraTokens[themeName],
        progressBar: progressBarTokens[themeName],
        radioIcon: radioIconTokens[themeName],
        fontsLoaded,
      }}
    >
      {/* Render children immediately — font loads async, system font shows as fallback */}
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
