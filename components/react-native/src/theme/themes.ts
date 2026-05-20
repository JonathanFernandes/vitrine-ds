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

/** Horizontal benefits card — Figma `7810:5098` (tokens alinhados à spec em `specs/component-spec/benefits-card-horizontal.md`). */
export interface BenefitsCardHorizontalThemeTokens {
  rootRadius: number;
  columnGap: number;
  brandingBg: string;
  /** Estado bloqueado: máscara atrás do logo (fill no Figma usa token de borda do card vertical). */
  brandingMaskBg: string;
  storeLogoBg: string;
  logoBorder: string;
  logoBorderWidth: number;
  cardSurface: string;
  secondary: string;
  text: string;
  lockBadgeBg: string;
  onDark: string;
  actionActive: string;
  actionDisabled: string;
  actionDisabledBg: string;
  contentGap: number;
  textStackGap: number;
  categoryRowGap: number;
  titleBlockGap: number;
}

/** Benefits Levels — Figma `7935:14175` (spec `specs/component-spec/benefits-levels.md`). */
export interface BenefitsLevelsThemeTokens {
  width: number;
  radius: number;
  borderWidth: number;
  surface: string;
  border: string;
  heading: string;
  description: string;
  benefitTitle: string;
  benefitCaption: string;
  benefitTextDisabled: string;
  iconCheck: string;
  iconCloseDisabled: string;
  iconStar: string;
  badgeBg: string;
  badgeLabel: string;
  spacing: {
    padding: number;
    sectionGap: number;
    headerBlockGap: number;
    headerRowGap: number;
    titleStackGap: number;
    benefitRowGap: number;
    benefitTextGap: number;
    starRowGap: number;
    badgePaddingH: number;
    badgePaddingV: number;
    badgeHeight: number;
  };
  sizes: {
    star: number;
    rowIcon: number;
  };
}

/** Accordion — Figma `7922:5670` (spec `specs/component-spec/accordion.md`). */
export interface AccordionThemeTokens {
  width: number;
  title: { default: string; negative: string };
  icon: { default: string; negative: string };
  subtitle: { default: string; negative: string };
  badge: {
    bg: { default: string; negative: string };
    number: { default: string; negative: string };
  };
  spacing: {
    headerPaddingH: number;
    headerContentGap: number;
    simplePaddingH: number;
    listRowGap: number;
    listItemGap: number;
    badgePadding: number;
    badgeSize: number;
    badgeRadius: number;
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
  { default: string; action: string; focus: string; light: string }
> = {
  neutral: {
    default: '#4274D6',
    action: '#1B3C7E',
    focus: '#4274D6',
    light: '#D5E0F6',
  },
  leblon: {
    default: '#D9B48C',
    action: '#734E26',
    focus: '#D9B48C',
    light: '#F2E6D9',
  },
  red: {
    default: '#E44E62',
    action: '#590D18',
    focus: '#E44E62',
    light: '#F2A6B1',
  },
  green: {
    default: '#94D1A8',
    action: '#265937',
    focus: '#94D1A8',
    light: '#DBF0E2',
  },
};

function createBenefitsLevelsTokens(themeName: ThemeName): BenefitsLevelsThemeTokens {
  const primary = primaryByTheme[themeName];

  return {
    width: 303,
    radius: 4,
    borderWidth: 1,
    surface: '#FAFAFA',
    border: '#E6E6E6',
    heading: '#414958',
    description: '#414958',
    benefitTitle: '#414958',
    benefitCaption: '#414958',
    benefitTextDisabled: '#999999',
    iconCheck: primary.action,
    iconCloseDisabled: '#999999',
    iconStar: '#EDC41E',
    badgeBg: '#A7AFBE',
    badgeLabel: '#09142A',
    spacing: {
      padding: 24,
      sectionGap: 24,
      headerBlockGap: 16,
      headerRowGap: 8,
      titleStackGap: 8,
      benefitRowGap: 12,
      benefitTextGap: 4,
      starRowGap: 8,
      badgePaddingH: 16,
      badgePaddingV: 8,
      badgeHeight: 24,
    },
    sizes: {
      star: 32,
      rowIcon: 24,
    },
  };
}

function createAccordionTokens(themeName: ThemeName): AccordionThemeTokens {
  const primary = primaryByTheme[themeName];

  return {
    width: 343,
    title: { default: '#1A1A1A', negative: '#FAFAFA' },
    icon: { default: '#1A1A1A', negative: '#FAFAFA' },
    subtitle: { default: '#1A1A1A', negative: '#FAFAFA' },
    badge: {
      bg: { default: '#1A1A1A', negative: '#FAFAFA' },
      number: { default: primary.light, negative: primary.action },
    },
    spacing: {
      headerPaddingH: 8,
      headerContentGap: 20,
      simplePaddingH: 16,
      listRowGap: 12,
      listItemGap: 12,
      badgePadding: 4,
      badgeSize: 24,
      badgeRadius: 999,
    },
  };
}

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

export const benefitsLevelsTokens: Record<ThemeName, BenefitsLevelsThemeTokens> = {
  neutral: createBenefitsLevelsTokens('neutral'),
  leblon: createBenefitsLevelsTokens('leblon'),
  red: createBenefitsLevelsTokens('red'),
  green: createBenefitsLevelsTokens('green'),
};

export const accordionTokens: Record<ThemeName, AccordionThemeTokens> = {
  neutral: createAccordionTokens('neutral'),
  leblon: createAccordionTokens('leblon'),
  red: createAccordionTokens('red'),
  green: createAccordionTokens('green'),
};

export const benefitsCardHorizontalTokens: Record<ThemeName, BenefitsCardHorizontalThemeTokens> = {
  neutral: {
    rootRadius: 4,
    columnGap: 16,
    brandingBg: '#4274d6',
    brandingMaskBg: '#e6e6e6',
    storeLogoBg: '#016435',
    logoBorder: '#e6e6e6',
    logoBorderWidth: 2,
    cardSurface: '#ffffff',
    secondary: '#666666',
    text: '#2b303b',
    lockBadgeBg: 'rgba(26, 26, 26, 0.9)',
    onDark: '#fafafa',
    actionActive: '#0f4e57',
    actionDisabled: '#b3b3b3',
    actionDisabledBg: '#f2f2f2',
    contentGap: 12,
    textStackGap: 8,
    categoryRowGap: 4,
    titleBlockGap: 4,
  },
  leblon: {
    rootRadius: 4,
    columnGap: 16,
    brandingBg: '#bf8240',
    brandingMaskBg: '#e6e6e6',
    storeLogoBg: '#016435',
    logoBorder: '#e6e6e6',
    logoBorderWidth: 2,
    cardSurface: '#ffffff',
    secondary: '#666666',
    text: '#3d3a29',
    lockBadgeBg: 'rgba(26, 26, 26, 0.9)',
    onDark: '#fafafa',
    actionActive: '#39604c',
    actionDisabled: '#b3b3b3',
    actionDisabledBg: '#f2f2f2',
    contentGap: 12,
    textStackGap: 8,
    categoryRowGap: 4,
    titleBlockGap: 4,
  },
  red: {
    rootRadius: 4,
    columnGap: 16,
    brandingBg: '#b11b2f',
    brandingMaskBg: '#e6e6e6',
    storeLogoBg: '#016435',
    logoBorder: '#e6e6e6',
    logoBorderWidth: 2,
    cardSurface: '#ffffff',
    secondary: '#666666',
    text: '#4d1a20',
    lockBadgeBg: 'rgba(26, 26, 26, 0.9)',
    onDark: '#fafafa',
    actionActive: '#684531',
    actionDisabled: '#b3b3b3',
    actionDisabledBg: '#f2f2f2',
    contentGap: 12,
    textStackGap: 8,
    categoryRowGap: 4,
    titleBlockGap: 4,
  },
  green: {
    rootRadius: 4,
    columnGap: 16,
    brandingBg: '#367d4d',
    brandingMaskBg: '#e6e6e6',
    storeLogoBg: '#016435',
    logoBorder: '#e6e6e6',
    logoBorderWidth: 2,
    cardSurface: '#ffffff',
    secondary: '#666666',
    text: '#2b3b30',
    lockBadgeBg: 'rgba(26, 26, 26, 0.9)',
    onDark: '#fafafa',
    actionActive: '#26736c',
    actionDisabled: '#b3b3b3',
    actionDisabledBg: '#f2f2f2',
    contentGap: 12,
    textStackGap: 8,
    categoryRowGap: 4,
    titleBlockGap: 4,
  },
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
