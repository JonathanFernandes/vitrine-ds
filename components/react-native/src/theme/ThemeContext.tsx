import {
  BeVietnamPro_400Regular,
  BeVietnamPro_600SemiBold,
  BeVietnamPro_700Bold,
  useFonts,
} from '@expo-google-fonts/be-vietnam-pro';
import React, { createContext, useContext, useState } from 'react';
import {
  badgeTokens,
  BadgeThemeTokens,
  carouselStoreTokens,
  CarouselStoreThemeTokens,
  headerHomeTokens,
  HeaderHomeThemeTokens,
  linkTokens,
  LinkThemeTokens,
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
  ThemeName,
} from './themes';

interface ThemeContextValue {
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
  button: ButtonThemeTokens;
  bottomMenu: BottomMenuThemeTokens;
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
  fontsLoaded: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  themeName: 'neutral',
  setTheme: () => {},
  button: buttonTokens.neutral,
  bottomMenu: bottomMenuTokens.neutral,
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
        button: buttonTokens[themeName],
        bottomMenu: bottomMenuTokens[themeName],
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
