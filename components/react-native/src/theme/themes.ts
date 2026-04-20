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

export interface AvatarThemeTokens {
  radius: number;
  bg: {
    default: string;
  };
  border: {
    default: string;
  };
  label: {
    default: string;
  };
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

export interface MenuItemThemeTokens {
  default: {
    icon: string;
    text: string;
    chevron: string;
    divider: string;
  };
  negative: {
    icon: string;
    text: string;
    chevron: string;
    divider: string;
  };
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

export interface RadioIconThemeTokens {
  radius: number;
  bg: {
    canvas: string;
  };
  border: {
    default: string;
    hover: string;
    disabled: string;
    error: string;
    focusRing: string;
  };
  fill: {
    disabledTrack: string;
  };
  indicator: {
    selected: string;
    disabledOuter: string;
    disabledMid: string;
  };
  indeterminate: {
    track: string;
    icon: string;
  };
}

export interface CardOptionsThemeTokens {
  container: {
    bg: string;
    radius: number;
    border: {
      default: string;
      selected: string;
    };
  };
  icon: {
    leading: string;
  };
  title: string;
  subtitle: string;
}

export interface BottomSheetThemeTokens {
  radius: number;
  benefitRadius: number;
  surface: {
    shell: string;
    muted: string;
  };
  chrome: {
    tab: string;
  };
  text: {
    title: string;
    body: string;
    listTitle: string;
    caption: string;
  };
  icon: {
    primary: string;
    action: string;
    close: string;
  };
  scrollbar: {
    surface: string;
    thumb: string;
  };
}

export interface ModalMobileThemeTokens {
  radius: number;
  surface: {
    bg: string;
  };
  text: {
    title: string;
    body: string;
  };
  icon: {
    info: string;
    error: string;
    close: string;
  };
  elevation: {
    shadowColor: string;
  };
}

// Local fallback until Avatar tokens are included in the generated theme payload.
export const avatarTokens: Record<ThemeName, AvatarThemeTokens> = {
  neutral: {
    radius: 999,
    bg: { default: '#F0F2F4' },
    border: { default: '#C4C9D4' },
    label: { default: '#1A1A1A' },
  },
  leblon: {
    radius: 999,
    bg: { default: '#F0F2F4' },
    border: { default: '#C4C9D4' },
    label: { default: '#1A1A1A' },
  },
  red: {
    radius: 999,
    bg: { default: '#F0F2F4' },
    border: { default: '#C4C9D4' },
    label: { default: '#1A1A1A' },
  },
  green: {
    radius: 999,
    bg: { default: '#F0F2F4' },
    border: { default: '#C4C9D4' },
    label: { default: '#1A1A1A' },
  },
};

const primaryByTheme: Record<
  ThemeName,
  { default: string; action: string; focus: string }
> = {
  neutral: { default: '#4274D6', action: '#1B3C7E', focus: '#4274D6' },
  leblon: { default: '#D9B48C', action: '#734E26', focus: '#D9B48C' },
  red: { default: '#E44E62', action: '#590D18', focus: '#E44E62' },
  green: { default: '#94D1A8', action: '#265937', focus: '#94D1A8' },
};

function createRadioIconTokens(themeName: ThemeName): RadioIconThemeTokens {
  const primary = primaryByTheme[themeName];

  return {
    radius: 999,
    bg: { canvas: '#FFFFFF' },
    border: {
      default: '#CCCCCC',
      hover: primary.action,
      disabled: '#999999',
      error: '#DF2020',
      focusRing: primary.focus,
    },
    fill: { disabledTrack: '#E6E6E6' },
    indicator: {
      selected: primary.action,
      disabledOuter: '#999999',
      disabledMid: '#B3B3B3',
    },
    indeterminate: {
      track: primary.default,
      icon: '#F2F2F2',
    },
  };
}

function createCardOptionsTokens(themeName: ThemeName): CardOptionsThemeTokens {
  const primary = primaryByTheme[themeName];

  return {
    container: {
      bg: '#FFFFFF',
      radius: themeName === 'leblon' ? 2 : 4,
      border: {
        default: '#E6E6E6',
        selected: primary.action,
      },
    },
    icon: {
      leading: primary.default,
    },
    title: '#333333',
    subtitle: '#808080',
  };
}

function createBottomSheetTokens(themeName: ThemeName): BottomSheetThemeTokens {
  const primary = primaryByTheme[themeName];

  return {
    radius: 16,
    benefitRadius: 4,
    surface: {
      shell: '#FAFAFA',
      muted: '#F2F2F2',
    },
    chrome: {
      tab: '#E6E6E6',
    },
    text: {
      title: '#1A1A1A',
      body: '#4D4D4D',
      listTitle: '#2B303B',
      caption: '#666666',
    },
    icon: {
      primary: primary.default,
      action: primary.action,
      close: '#1A1A1A',
    },
    scrollbar: {
      surface: '#FFFFFF',
      thumb: '#B3B3B3',
    },
  };
}

function createModalMobileTokens(): ModalMobileThemeTokens {
  return {
    radius: 16,
    surface: {
      bg: '#FFFFFF',
    },
    text: {
      title: '#1A1A1A',
      body: '#666666',
    },
    icon: {
      info: '#4D4D4D',
      error: '#DF2020',
      close: '#1A1A1A',
    },
    elevation: {
      shadowColor: '#52647A',
    },
  };
}

// Local fallbacks until these component tokens are included in generated theme payload.
export const radioIconTokens: Record<ThemeName, RadioIconThemeTokens> = {
  neutral: createRadioIconTokens('neutral'),
  leblon: createRadioIconTokens('leblon'),
  red: createRadioIconTokens('red'),
  green: createRadioIconTokens('green'),
};

export const cardOptionsTokens: Record<ThemeName, CardOptionsThemeTokens> = {
  neutral: createCardOptionsTokens('neutral'),
  leblon: createCardOptionsTokens('leblon'),
  red: createCardOptionsTokens('red'),
  green: createCardOptionsTokens('green'),
};

export const bottomSheetTokens: Record<ThemeName, BottomSheetThemeTokens> = {
  neutral: createBottomSheetTokens('neutral'),
  leblon: createBottomSheetTokens('leblon'),
  red: createBottomSheetTokens('red'),
  green: createBottomSheetTokens('green'),
};

export const modalMobileTokens: Record<ThemeName, ModalMobileThemeTokens> = {
  neutral: createModalMobileTokens(),
  leblon: createModalMobileTokens(),
  red: createModalMobileTokens(),
  green: createModalMobileTokens(),
};

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
  menuItemTokens,
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
