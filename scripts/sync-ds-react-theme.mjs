#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const themeNames = ['neutral', 'leblon', 'red', 'green'];
const defaultTargetRoot = path.resolve(repoRoot, '../ds-react');

const targetRoot = process.argv[2]
  ? path.resolve(process.argv[2])
  : defaultTargetRoot;

const distThemesRoot = path.join(repoRoot, 'tokens/dist/react-native/themes');
const targetThemeRoot = path.join(targetRoot, 'src/theme');
const generatedFilePath = path.join(targetThemeRoot, 'themes.generated.ts');
const wrapperFilePath = path.join(targetThemeRoot, 'themes.ts');

const flatThemes = Object.fromEntries(
  await Promise.all(
    themeNames.map(async (themeName) => {
      const filePath = path.join(distThemesRoot, themeName, 'flat.json');
      const content = await fs.readFile(filePath, 'utf8');
      return [themeName, JSON.parse(content)];
    }),
  ),
);

function readToken(themeName, tokenPath) {
  const value = flatThemes[themeName]?.[tokenPath];

  if (value === undefined) {
    throw new Error(`Token not found for theme "${themeName}": ${tokenPath}`);
  }

  return value;
}

function readColor(themeName, tokenPath) {
  const value = readToken(themeName, tokenPath);

  if (typeof value !== 'string') {
    throw new Error(
      `Expected string token for "${tokenPath}" in theme "${themeName}", got ${typeof value}`,
    );
  }

  return value;
}

function readNumber(themeName, tokenPath) {
  const value = readToken(themeName, tokenPath);

  if (typeof value !== 'number') {
    throw new Error(
      `Expected numeric token for "${tokenPath}" in theme "${themeName}", got ${typeof value}`,
    );
  }

  return value;
}

function mapByTheme(factory) {
  return Object.fromEntries(themeNames.map((themeName) => [themeName, factory(themeName)]));
}

function formatTs(value) {
  return JSON.stringify(value, null, 2);
}

const bottomMenuTokens = mapByTheme((themeName) => ({
  bg: readColor(themeName, 'component.navigation-bar.bg'),
  border: readColor(themeName, 'component.navigation-bar.border.top'),
  itemRadius: readNumber(themeName, 'border.radius.xs'),
  bgFrameRadius: readNumber(themeName, 'border.radius.sm'),
  label: {
    default: readColor(themeName, 'component.navigation-bar.item.default.label'),
    active: readColor(themeName, 'component.navigation-bar.item.active.label'),
  },
  icon: {
    default: readColor(themeName, 'component.navigation-bar.item.default.icon'),
    active: readColor(themeName, 'component.navigation-bar.item.active.icon'),
  },
  backgroundActive: readColor(themeName, 'component.navigation-bar.item.active.bg'),
}));

const benefitsCardVerticalTokens = mapByTheme((themeName) => ({
  radius: readNumber(themeName, 'border.radius.xs'),
  imageBg: readColor(themeName, 'component.benefits-card.image-bg.default'),
  containerBg: readColor(themeName, 'component.benefits-card.container-bg.default'),
  logoBorder: readColor(themeName, 'component.benefits-card.logo-border.default'),
  secondary: readColor(themeName, 'component.benefits-card.secondary.default'),
  text: readColor(themeName, 'component.benefits-card.text.default'),
  onDark: readColor(themeName, 'component.benefits-card.on-dark.default'),
  lockBg: readColor(themeName, 'component.benefits-card.lock-bg.default'),
  action: {
    active: readColor(themeName, 'component.benefits-card.action.default'),
    disabled: readColor(themeName, 'component.benefits-card.action.disabled'),
    disabledBg: readColor(themeName, 'component.benefits-card.action-bg.disabled'),
  },
}));

const progressBarTokens = mapByTheme((themeName) => ({
  track: readColor(themeName, 'component.progress-bar.track.default'),
  fill: {
    primary: readColor(themeName, 'component.progress-bar.fill.primary'),
    success: readColor(themeName, 'component.progress-bar.fill.success'),
    disabled: readColor(themeName, 'component.progress-bar.fill.disabled'),
  },
}));

const benefitsGoalsTokens = mapByTheme((themeName) => ({
  title: readColor(themeName, 'component.benefits-goals.title.default'),
  subtitle: readColor(themeName, 'component.benefits-goals.subtitle.default'),
}));

const benefitsContentCardTokens = mapByTheme((themeName) => ({
  surface: readColor(themeName, 'component.benefits-content-card.surface.default'),
  border: readColor(themeName, 'component.benefits-content-card.border.default'),
  text: readColor(themeName, 'component.benefits-content-card.text.default'),
  star: readColor(themeName, 'component.benefits-content-card.icon.star.default'),
  radius: readNumber(themeName, 'border.radius.xs'),
}));

const dotnavTokens = mapByTheme((themeName) => ({
  active: {
    default: readColor(themeName, 'component.dotnav.dot.active'),
    negative: readColor(themeName, 'component.dotnav.dot.active-negative'),
  },
  inactive: {
    default: readColor(themeName, 'component.dotnav.dot.inactive'),
    negative: readColor(themeName, 'component.dotnav.dot.inactive-negative'),
  },
}));

const bannerTokens = mapByTheme((themeName) => ({
  bg: readColor(themeName, 'component.banner.bg.default'),
}));

const cardStoreItemTokens = mapByTheme((themeName) => ({
  radius: readNumber(themeName, 'border.radius.xs'),
  logoBg: readColor(themeName, 'component.card-store-item.logo-bg.default'),
  logoBorder: readColor(themeName, 'component.card-store-item.logo-border.default'),
  logoInnerBg: readColor(themeName, 'component.card-store-item.logo-inner-bg.default'),
  logoInnerBorder: readColor(themeName, 'component.card-store-item.logo-inner-border.default'),
  imageFill: readColor(themeName, 'component.card-store-item.image-fill.default'),
  imageBorder: readColor(themeName, 'component.card-store-item.image-border.default'),
  name: readColor(themeName, 'component.card-store-item.name.default'),
}));

const carouselStoreTokens = mapByTheme((themeName) => ({
  gap: readNumber(themeName, 'component.carousel-store.gap.default'),
}));

const headerHomeTokens = mapByTheme((themeName) => ({
  contentBg: readColor(themeName, 'component.header-home.content.bg'),
  title: readColor(themeName, 'component.header-home.title.default'),
  highlight: readColor(themeName, 'component.header-home.highlight.default'),
  meta: readColor(themeName, 'component.header-home.meta.default'),
  banner: {
    loggedOut: {
      bg: readColor(themeName, 'component.header-home.banner.logged-out.bg'),
      text: readColor(themeName, 'component.header-home.banner.logged-out.text'),
      link: readColor(themeName, 'component.header-home.banner.logged-out.link'),
    },
  },
  summary: {
    bg: readColor(themeName, 'component.header-home.summary.bg'),
    radius: readNumber(themeName, 'component.header-home.summary.radius'),
  },
  spacing: {
    blockGap: readNumber(themeName, 'component.header-home.spacing.block-gap'),
    paddingInline: readNumber(themeName, 'component.header-home.spacing.padding-inline'),
    paddingStack: readNumber(themeName, 'component.header-home.spacing.padding-stack'),
  },
}));

const sectionTitleTokens = mapByTheme((themeName) => ({
  title: {
    default: readColor(themeName, 'component.section-title.title.default'),
    negative: readColor(themeName, 'component.section-title.title.negative'),
  },
  link: {
    default: readColor(themeName, 'component.section-title.link.default'),
    negative: readColor(themeName, 'component.section-title.link.negative'),
  },
}));

const badgeTokens = mapByTheme((themeName) => ({
  radius: readNumber(themeName, 'border.radius.xs'),
  success: {
    bg: readColor(themeName, 'component.badge.success.bg'),
    fg: readColor(themeName, 'component.badge.success.fg'),
  },
  warning: {
    bg: readColor(themeName, 'component.badge.warning.bg'),
    fg: readColor(themeName, 'component.badge.warning.fg'),
  },
  error: {
    bg: readColor(themeName, 'component.badge.error.bg'),
    fg: readColor(themeName, 'component.badge.error.fg'),
  },
  info: {
    bg: readColor(themeName, 'component.badge.info.bg'),
    fg: readColor(themeName, 'component.badge.info.fg'),
  },
  neutral1: {
    bg: readColor(themeName, 'component.badge.neutral-1.bg'),
    fg: readColor(themeName, 'component.badge.neutral-1.fg'),
  },
  neutral2: {
    bg: readColor(themeName, 'component.badge.neutral-2.bg'),
    fg: readColor(themeName, 'component.badge.neutral-2.fg'),
  },
  neutral3: {
    bg: readColor(themeName, 'component.badge.neutral-3.bg'),
    fg: readColor(themeName, 'component.badge.neutral-3.fg'),
  },
  promo: {
    bg: readColor(themeName, 'component.badge.promo.bg'),
    fg: readColor(themeName, 'component.badge.promo.fg'),
  },
  premiere: {
    bg: readColor(themeName, 'component.badge.premiere.bg'),
    fg: readColor(themeName, 'component.badge.premiere.fg'),
  },
  blog: {
    bg: readColor(themeName, 'component.badge.blog.bg'),
    fg: readColor(themeName, 'component.badge.blog.fg'),
  },
  filterDefault: {
    bg: 'transparent',
    fg: readColor(themeName, 'component.badge.filter-default.fg'),
    border: readColor(themeName, 'component.badge.filter-default.border'),
  },
  filterActive: {
    bg: readColor(themeName, 'component.badge.filter-active.bg'),
    fg: readColor(themeName, 'component.badge.filter-active.fg'),
  },
  disabled: {
    bg: readColor(themeName, 'component.badge.disabled.bg'),
    fg: readColor(themeName, 'component.badge.disabled.fg'),
  },
}));

const linkTokens = mapByTheme((themeName) => ({
  primary: {
    text: {
      default: readColor(themeName, 'component.link.primary.text.default'),
      hover: readColor(themeName, 'component.link.primary.text.hover'),
      pressed: readColor(themeName, 'component.link.primary.text.pressed'),
      disabled: readColor(themeName, 'component.link.primary.text.disabled'),
    },
    focusStroke: readColor(themeName, 'component.link.primary.focus-stroke'),
  },
  destructive: {
    text: {
      default: readColor(themeName, 'component.link.destructive.text.default'),
      hover: readColor(themeName, 'component.link.destructive.text.hover'),
      pressed: readColor(themeName, 'component.link.destructive.text.pressed'),
      disabled: readColor(themeName, 'component.link.destructive.text.disabled'),
    },
    focusStroke: readColor(themeName, 'component.link.destructive.focus-stroke'),
  },
  negative: {
    text: {
      default: readColor(themeName, 'component.link.negative.text.default'),
      hover: readColor(themeName, 'component.link.negative.text.hover'),
      disabled: readColor(themeName, 'component.link.negative.text.disabled'),
    },
    focusStroke: readColor(themeName, 'component.link.negative.focus-stroke'),
  },
}));

const moviePosterTokens = mapByTheme((themeName) => ({
  radius: readNumber(themeName, 'border.radius.xs'),
  text: readColor(themeName, 'component.movie-poster.text.default'),
}));

const menuItemTokens = mapByTheme((themeName) => ({
  default: {
    icon: readColor(themeName, 'component.menu-item.icon.leading.default'),
    text: readColor(themeName, 'component.menu-item.text.default'),
    chevron: readColor(themeName, 'component.menu-item.chevron.default'),
    divider: readColor(themeName, 'component.menu-item.divider.default'),
  },
  negative: {
    icon: readColor(themeName, 'component.menu-item.icon.leading.negative'),
    text: readColor(themeName, 'component.menu-item.text.negative'),
    chevron: readColor(themeName, 'component.menu-item.chevron.negative'),
    divider: readColor(themeName, 'component.menu-item.divider.negative'),
  },
}));

const shortcutsMenuTokens = mapByTheme((themeName) => ({
  radius: readNumber(themeName, 'border.radius.xs'),
  active: {
    bg: readColor(themeName, 'component.shortcuts-menu.active.bg'),
    border: readColor(themeName, 'component.shortcuts-menu.active.border'),
    icon: readColor(themeName, 'component.shortcuts-menu.active.icon'),
    label: readColor(themeName, 'component.shortcuts-menu.active.label'),
  },
  default: {
    bg: readColor(themeName, 'component.shortcuts-menu.default.bg'),
    border: readColor(themeName, 'component.shortcuts-menu.default.border'),
    iconFill: readColor(themeName, 'component.shortcuts-menu.default.icon-fill'),
    iconStroke: readColor(themeName, 'component.shortcuts-menu.default.icon-stroke'),
    label: readColor(themeName, 'component.shortcuts-menu.default.label'),
  },
  disabled: {
    iconStroke: readColor(themeName, 'component.shortcuts-menu.disabled.icon-stroke'),
    label: readColor(themeName, 'component.shortcuts-menu.disabled.label'),
  },
  menu: {
    bg: readColor(themeName, 'component.shortcuts-menu.menu.bg'),
    border: readColor(themeName, 'component.shortcuts-menu.menu.border'),
    icon: readColor(themeName, 'component.shortcuts-menu.menu.icon'),
    iconAccent: readColor(themeName, 'component.shortcuts-menu.menu.icon-accent'),
    iconBg: readColor(themeName, 'component.shortcuts-menu.menu.icon-bg'),
    label: readColor(themeName, 'component.shortcuts-menu.menu.label'),
  },
}));

const shortcutsTokens = mapByTheme((themeName) => ({
  radius: readNumber(themeName, 'border.radius.xs'),
  bg: readColor(themeName, 'component.shortcuts.bg.default'),
  border: readColor(themeName, 'component.shortcuts.border.default'),
  icon: readColor(themeName, 'component.shortcuts.icon.default'),
  label: readColor(themeName, 'component.shortcuts.label.default'),
  moreBorder: readColor(themeName, 'component.shortcuts.more-border.default'),
}));

const notificationIconGroupTokens = mapByTheme((themeName) => ({
  icon: {
    default: readColor(themeName, 'component.notification-icon-group.icon.default'),
  },
  counter: {
    bg: readColor(themeName, 'component.notification-icon-group.counter.bg-subtle'),
    bgStrong: readColor(themeName, 'component.notification-icon-group.counter.bg'),
    text: readColor(themeName, 'component.notification-icon-group.counter.text'),
  },
}));

const eventCardTokens = mapByTheme((themeName) => ({
  radius: readNumber(themeName, 'border.radius.xs'),
  bg: readColor(themeName, 'component.event-card.bg.default'),
  border: readColor(themeName, 'component.event-card.border.default'),
  icon: readColor(themeName, 'component.event-card.icon.default'),
  date: readColor(themeName, 'component.event-card.date.default'),
  title: readColor(themeName, 'component.event-card.title.default'),
}));

const fiquePorDentroCardTokens = mapByTheme((themeName) => ({
  radius: readNumber(themeName, 'border.radius.xs'),
  bg: readColor(themeName, 'component.fique-por-dentro-card.bg.default'),
  border: readColor(themeName, 'component.fique-por-dentro-card.border.default'),
  icon: readColor(themeName, 'component.fique-por-dentro-card.icon.default'),
  date: readColor(themeName, 'component.fique-por-dentro-card.date.default'),
  title: readColor(themeName, 'component.fique-por-dentro-card.title.default'),
}));

const toolbarTokens = mapByTheme((themeName) => ({
  icon: {
    default: readColor(themeName, 'component.toolbar.icon.default'),
    negative: readColor(themeName, 'component.toolbar.icon.negative'),
  },
  label: {
    default: readColor(themeName, 'component.toolbar.label.default'),
    negative: readColor(themeName, 'component.toolbar.label.negative'),
  },
  chevron: {
    default: readColor(themeName, 'component.toolbar.chevron.default'),
  },
}));

const inputTokens = mapByTheme((themeName) => ({
  radius: readNumber(themeName, 'component.input.radius'),
  bg: {
    default: readColor(themeName, 'component.input.bg.default'),
    disabled: readColor(themeName, 'component.input.bg.disabled'),
    viewOnly: readColor(themeName, 'component.input.bg.view-only'),
  },
  border: {
    default: readColor(themeName, 'component.input.border.default'),
    focus: readColor(themeName, 'component.input.border.focus'),
    disabled: readColor(themeName, 'component.input.border.disabled'),
    viewOnly: readColor(themeName, 'component.input.border.view-only'),
    error: readColor(themeName, 'component.input.border.error'),
  },
  borderWidth: {
    default: readNumber(themeName, 'component.input.border-width'),
    focus: readNumber(themeName, 'component.input.border.focus-width'),
  },
  label: {
    default: readColor(themeName, 'component.input.label.default'),
    disabled: readColor(themeName, 'component.input.label.disabled'),
    error: readColor(themeName, 'component.input.label.error'),
  },
  placeholder: readColor(themeName, 'component.input.placeholder.default'),
  value: {
    default: readColor(themeName, 'component.input.value.default'),
    error: readColor(themeName, 'component.input.value.error'),
  },
  prefix: {
    default: readColor(themeName, 'component.input.prefix.default'),
    disabled: readColor(themeName, 'component.input.prefix.disabled'),
    error: readColor(themeName, 'component.input.prefix.error'),
  },
  icon: {
    default: readColor(themeName, 'component.input.icon.default'),
    disabled: readColor(themeName, 'component.input.icon.disabled'),
    error: readColor(themeName, 'component.input.icon.error'),
  },
  helper: {
    default: readColor(themeName, 'component.input.helper.default'),
    disabled: readColor(themeName, 'component.input.helper.disabled'),
    error: readColor(themeName, 'component.input.helper.error'),
  },
  cancel: {
    text: readColor(themeName, 'component.input.cancel.text'),
  },
}));

const cameraTokens = mapByTheme((themeName) => ({
  strokeDefault: readColor(themeName, 'component.camera.stroke.default'),
  strokeWidth: readNumber(themeName, 'component.camera.stroke-width'),
  defaultSize: readNumber(themeName, 'component.camera.default-size'),
}));

const buttonTokens = mapByTheme((themeName) => ({
  radius: readNumber(themeName, 'component.button.radius'),
  primary: {
    bg: {
      default: readColor(themeName, 'component.button.primary.bg.default'),
      pressed: readColor(themeName, 'component.button.primary.bg.pressed'),
      disabled: readColor(themeName, 'component.button.primary.bg.disabled'),
    },
    label: {
      default: readColor(themeName, 'component.button.primary.label.default'),
      disabled: readColor(themeName, 'component.button.primary.label.disabled'),
    },
    focus: {
      borderColor: readColor(themeName, 'color.function.primary.active'),
    },
  },
  primaryInverse: {
    bg: {
      default: readColor(themeName, 'component.button.primary-inverse.bg.default'),
      focus: readColor(themeName, 'component.button.primary-inverse.bg.focus'),
      pressed: readColor(themeName, 'component.button.primary-inverse.bg.pressed'),
      loading: readColor(themeName, 'component.button.primary-inverse.bg.loading'),
      disabled: readColor(themeName, 'component.button.primary-inverse.bg.disabled'),
    },
    border: {
      focus: readColor(themeName, 'component.button.primary-inverse.border.focus'),
    },
    label: {
      default: readColor(themeName, 'component.button.primary-inverse.label.default'),
      focus: readColor(themeName, 'component.button.primary-inverse.label.focus'),
      pressed: readColor(themeName, 'component.button.primary-inverse.label.pressed'),
      loading: readColor(themeName, 'component.button.primary-inverse.label.loading'),
      disabled: readColor(themeName, 'component.button.primary-inverse.label.disabled'),
    },
  },
  secondary: {
    bg: {
      focus: readColor(themeName, 'component.button.secondary.bg.focus'),
      pressed: readColor(themeName, 'component.button.secondary.bg.pressed'),
      loading: readColor(themeName, 'component.button.secondary.bg.loading'),
      disabled: readColor(themeName, 'component.button.secondary.bg.disabled'),
    },
    border: {
      default: readColor(themeName, 'component.button.secondary.border.default'),
      focus: readColor(themeName, 'component.button.secondary.border.focus'),
    },
    label: {
      default: readColor(themeName, 'component.button.secondary.label.default'),
      focus: readColor(themeName, 'component.button.secondary.label.focus'),
      pressed: readColor(themeName, 'component.button.secondary.label.pressed'),
      loading: readColor(themeName, 'component.button.secondary.label.loading'),
      disabled: readColor(themeName, 'component.button.secondary.label.disabled'),
    },
  },
  secondaryInverse: {
    bg: {
      focus: readColor(themeName, 'component.button.secondary-inverse.bg.focus'),
      pressed: readColor(themeName, 'component.button.secondary-inverse.bg.pressed'),
      loading: readColor(themeName, 'component.button.secondary-inverse.bg.loading'),
      disabled: readColor(themeName, 'component.button.secondary-inverse.bg.disabled'),
    },
    border: {
      default: readColor(themeName, 'component.button.secondary-inverse.border.default'),
      focus: readColor(themeName, 'component.button.secondary-inverse.border.focus'),
    },
    label: {
      default: readColor(themeName, 'component.button.secondary-inverse.label.default'),
      focus: readColor(themeName, 'component.button.secondary-inverse.label.focus'),
      pressed: readColor(themeName, 'component.button.secondary-inverse.label.pressed'),
      loading: readColor(themeName, 'component.button.secondary-inverse.label.loading'),
      disabled: readColor(themeName, 'component.button.secondary-inverse.label.disabled'),
    },
  },
  danger: {
    bg: {
      default: readColor(themeName, 'component.button.danger.bg.default'),
      pressed: readColor(themeName, 'component.button.danger.bg.pressed'),
      loading: readColor(themeName, 'component.button.danger.bg.pressed'),
      disabled: readColor(themeName, 'component.button.primary.bg.disabled'),
    },
    label: {
      default: readColor(themeName, 'component.button.primary.label.default'),
      disabled: readColor(themeName, 'component.button.primary.label.disabled'),
    },
    focus: {
      borderColor: readColor(themeName, 'color.feedback.error.default'),
    },
  },
}));

const generatedExports = [
  ['bottomMenuTokens', 'BottomMenuThemeTokens', bottomMenuTokens],
  ['benefitsCardVerticalTokens', 'BenefitsCardVerticalThemeTokens', benefitsCardVerticalTokens],
  ['progressBarTokens', 'ProgressBarThemeTokens', progressBarTokens],
  ['benefitsGoalsTokens', 'BenefitsGoalsThemeTokens', benefitsGoalsTokens],
  ['benefitsContentCardTokens', 'BenefitsContentCardThemeTokens', benefitsContentCardTokens],
  ['dotnavTokens', 'DotnavThemeTokens', dotnavTokens],
  ['bannerTokens', 'BannerThemeTokens', bannerTokens],
  ['cardStoreItemTokens', 'CardStoreItemThemeTokens', cardStoreItemTokens],
  ['carouselStoreTokens', 'CarouselStoreThemeTokens', carouselStoreTokens],
  ['headerHomeTokens', 'HeaderHomeThemeTokens', headerHomeTokens],
  ['sectionTitleTokens', 'SectionTitleThemeTokens', sectionTitleTokens],
  ['badgeTokens', 'BadgeThemeTokens', badgeTokens],
  ['linkTokens', 'LinkThemeTokens', linkTokens],
  ['moviePosterTokens', 'MoviePosterThemeTokens', moviePosterTokens],
  ['menuItemTokens', 'MenuItemThemeTokens', menuItemTokens],
  ['shortcutsMenuTokens', 'ShortcutsMenuThemeTokens', shortcutsMenuTokens],
  ['shortcutsTokens', 'ShortcutsThemeTokens', shortcutsTokens],
  ['notificationIconGroupTokens', 'NotificationIconGroupThemeTokens', notificationIconGroupTokens],
  ['eventCardTokens', 'EventCardThemeTokens', eventCardTokens],
  ['fiquePorDentroCardTokens', 'FiquePorDentroCardThemeTokens', fiquePorDentroCardTokens],
  ['toolbarTokens', 'ToolbarThemeTokens', toolbarTokens],
  ['inputTokens', 'InputThemeTokens', inputTokens],
  ['cameraTokens', 'CameraThemeTokens', cameraTokens],
  ['buttonTokens', 'ButtonThemeTokens', buttonTokens],
];

const generatedFile = `/**
 * This file is auto-generated from the Vitrine Design System dist output.
 * Run \`npm run tokens:sync-ds-react\` from the design system repository to refresh it.
 */

import type {
  ThemeName,
  BottomMenuThemeTokens,
  BenefitsCardVerticalThemeTokens,
  ProgressBarThemeTokens,
  BenefitsGoalsThemeTokens,
  BenefitsContentCardThemeTokens,
  DotnavThemeTokens,
  BannerThemeTokens,
  CardStoreItemThemeTokens,
  CarouselStoreThemeTokens,
  HeaderHomeThemeTokens,
  SectionTitleThemeTokens,
  BadgeThemeTokens,
  LinkThemeTokens,
  MoviePosterThemeTokens,
  MenuItemThemeTokens,
  ShortcutsMenuThemeTokens,
  ShortcutsThemeTokens,
  NotificationIconGroupThemeTokens,
  EventCardThemeTokens,
  FiquePorDentroCardThemeTokens,
  ToolbarThemeTokens,
  InputThemeTokens,
  CameraThemeTokens,
  ButtonThemeTokens
} from './themes';

${generatedExports
  .map(
    ([exportName, typeName, exportValue]) =>
      `export const ${exportName}: Record<ThemeName, ${typeName}> = ${formatTs(exportValue)};`,
  )
  .join('\n\n')}
`;

const wrapperFile = `/**
 * Theme token contracts consumed by the ds-react app.
 *
 * Values are generated from the official Design System repo into \`themes.generated.ts\`.
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
`;

await fs.mkdir(targetThemeRoot, { recursive: true });
await fs.writeFile(generatedFilePath, generatedFile, 'utf8');
await fs.writeFile(wrapperFilePath, wrapperFile, 'utf8');

console.log(`Synced ds-react theme contract from ${repoRoot}`);
console.log(`Generated: ${generatedFilePath}`);
console.log(`Generated: ${wrapperFilePath}`);
