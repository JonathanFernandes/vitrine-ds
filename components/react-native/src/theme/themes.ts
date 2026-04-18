/**
 * Theme token contracts consumed by the ds-react app.
 *
 * Values are generated from the official Design System repo into `themes.generated.ts`.
 * This file intentionally stays stable so component imports and ThemeContext API do not change.
 */

export type ThemeName = 'neutral' | 'leblon' | 'red' | 'green';

export interface ButtonThemeTokens {
  radius: number;
  primary: {
    bg: { default: string; pressed: string; disabled: string };
    label: { default: string; disabled: string };
    focus: { borderColor: string };
  };
  primaryInverse: {
    bg: {
      default: string;
      focus: string;
      pressed: string;
      loading: string;
      disabled: string;
    };
    border: { focus: string };
    label: {
      default: string;
      focus: string;
      pressed: string;
      loading: string;
      disabled: string;
    };
  };
  secondary: {
    bg: { focus: string; pressed: string; loading: string; disabled: string };
    border: { default: string; focus: string };
    label: {
      default: string;
      focus: string;
      pressed: string;
      loading: string;
      disabled: string;
    };
  };
  secondaryInverse: {
    bg: { focus: string; pressed: string; loading: string; disabled: string };
    border: { default: string; focus: string };
    label: {
      default: string;
      focus: string;
      pressed: string;
      loading: string;
      disabled: string;
    };
  };
  danger: {
    bg: { default: string; pressed: string; loading: string; disabled: string };
    label: { default: string; disabled: string };
    focus: { borderColor: string };
  };
}

export interface BottomMenuThemeTokens {
  bg: string;
  border: string;
  itemRadius: number;
  bgFrameRadius: number;
  label: { default: string; active: string };
  icon: { default: string; active: string };
  backgroundActive: string;
}

export interface BenefitsCardVerticalThemeTokens {
  radius: number;
  imageBg: string;
  containerBg: string;
  logoBorder: string;
  secondary: string;
  text: string;
  onDark: string;
  lockBg: string;
  action: {
    active: string;
    disabled: string;
    disabledBg: string;
  };
}

export interface ProgressBarThemeTokens {
  track: string;
  fill: {
    primary: string;
    success: string;
    disabled: string;
  };
}

export interface BenefitsGoalsThemeTokens {
  title: string;
  subtitle: string;
}

export interface BenefitsContentCardThemeTokens {
  surface: string;
  border: string;
  text: string;
  star: string;
  radius: number;
}

export interface DotnavThemeTokens {
  active: {
    default: string;
    negative: string;
  };
  inactive: {
    default: string;
    negative: string;
  };
}

export interface BannerThemeTokens {
  bg: string;
}

export interface CardStoreItemThemeTokens {
  radius: number;
  logoBg: string;
  logoBorder: string;
  logoInnerBg: string;
  logoInnerBorder: string;
  imageFill: string;
  imageBorder: string;
  name: string;
}

export interface CarouselStoreThemeTokens {
  gap: number;
}

export interface HeaderHomeThemeTokens {
  contentBg: string;
  title: string;
  highlight: string;
  meta: string;
  banner: {
    loggedOut: {
      bg: string;
      text: string;
      link: string;
    };
  };
  summary: {
    bg: string;
    radius: number;
  };
  spacing: {
    blockGap: number;
    paddingInline: number;
    paddingStack: number;
  };
}

export interface SectionTitleThemeTokens {
  title: {
    default: string;
    negative: string;
  };
  link: {
    default: string;
    negative: string;
  };
}

export interface BadgeThemeStatusTokens {
  bg: string;
  fg: string;
  border?: string;
}

export interface BadgeThemeTokens {
  radius: number;
  success: BadgeThemeStatusTokens;
  warning: BadgeThemeStatusTokens;
  error: BadgeThemeStatusTokens;
  info: BadgeThemeStatusTokens;
  neutral1: BadgeThemeStatusTokens;
  neutral2: BadgeThemeStatusTokens;
  neutral3: BadgeThemeStatusTokens;
  promo: BadgeThemeStatusTokens;
  premiere: BadgeThemeStatusTokens;
  blog: BadgeThemeStatusTokens;
  filterDefault: BadgeThemeStatusTokens;
  filterActive: BadgeThemeStatusTokens;
  disabled: BadgeThemeStatusTokens;
}

export interface LinkThemeTokens {
  primary: {
    text: {
      default: string;
      hover: string;
      pressed: string;
      disabled: string;
    };
    focusStroke: string;
  };
  destructive: {
    text: {
      default: string;
      hover: string;
      pressed: string;
      disabled: string;
    };
    focusStroke: string;
  };
  negative: {
    text: {
      default: string;
      hover: string;
      disabled: string;
    };
    focusStroke: string;
  };
}

export interface MoviePosterThemeTokens {
  radius: number;
  text: string;
}

export interface ShortcutsMenuThemeTokens {
  radius: number;
  active: {
    bg: string;
    border: string;
    icon: string;
    label: string;
  };
  default: {
    bg: string;
    border: string;
    iconFill: string;
    iconStroke: string;
    label: string;
  };
  disabled: {
    iconStroke: string;
    label: string;
  };
  menu: {
    bg: string;
    border: string;
    icon: string;
    iconAccent: string;
    iconBg: string;
    label: string;
  };
}

export interface ShortcutsThemeTokens {
  radius: number;
  bg: string;
  border: string;
  icon: string;
  label: string;
  moreBorder: string;
}

export interface NotificationIconGroupThemeTokens {
  icon: {
    default: string;
  };
  counter: {
    bg: string;
    bgStrong: string;
    text: string;
  };
}

export interface EventCardThemeTokens {
  radius: number;
  bg: string;
  border: string;
  icon: string;
  date: string;
  title: string;
}

export interface FiquePorDentroCardThemeTokens {
  radius: number;
  bg: string;
  border: string;
  icon: string;
  date: string;
  title: string;
}

export interface ToolbarThemeTokens {
  icon: {
    default: string;
    negative: string;
  };
  label: {
    default: string;
    negative: string;
  };
  chevron: {
    default: string;
  };
}

export interface InputThemeTokens {
  radius: number;
  bg: {
    default: string;
    disabled: string;
    viewOnly: string;
  };
  border: {
    default: string;
    focus: string;
    disabled: string;
    viewOnly: string;
    error: string;
  };
  borderWidth: {
    default: number;
    focus: number;
  };
  label: {
    default: string;
    disabled: string;
    error: string;
  };
  placeholder: string;
  value: {
    default: string;
    error: string;
  };
  prefix: {
    default: string;
    disabled: string;
    error: string;
  };
  icon: {
    default: string;
    disabled: string;
    error: string;
  };
  helper: {
    default: string;
    disabled: string;
    error: string;
  };
  cancel: {
    text: string;
  };
}

export interface CameraThemeTokens {
  strokeDefault: string;
  strokeWidth: number;
  defaultSize: number;
}

export {
  bottomMenuTokens,
  benefitsCardVerticalTokens,
  progressBarTokens,
  benefitsGoalsTokens,
  benefitsContentCardTokens,
  dotnavTokens,
  bannerTokens,
  cardStoreItemTokens,
  carouselStoreTokens,
  headerHomeTokens,
  sectionTitleTokens,
  badgeTokens,
  linkTokens,
  moviePosterTokens,
  shortcutsMenuTokens,
  shortcutsTokens,
  notificationIconGroupTokens,
  eventCardTokens,
  fiquePorDentroCardTokens,
  toolbarTokens,
  inputTokens,
  cameraTokens,
  buttonTokens,
} from './themes.generated';
