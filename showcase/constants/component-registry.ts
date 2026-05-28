export type ComponentRegistryItem = {
  slug: string;
  title: string;
  exportName: string;
  specFile?: string;
  hasPreview: boolean;
};

export const COMPONENT_REGISTRY: ComponentRegistryItem[] = [
  {
    slug: 'accordion',
    title: 'Accordion',
    exportName: 'Accordion',
    specFile: 'accordion.md',
    hasPreview: true,
  },
  {
    slug: 'avatar',
    title: 'Avatar',
    exportName: 'Avatar',
    specFile: 'avatar.md',
    hasPreview: true,
  },
  {
    slug: 'badge',
    title: 'Badge',
    exportName: 'Badge',
    hasPreview: true,
  },
  {
    slug: 'banner',
    title: 'Banner',
    exportName: 'Banner',
    hasPreview: true,
  },
  {
    slug: 'benefits-card-horizontal',
    title: 'Benefits Card Horizontal',
    exportName: 'BenefitsCardHorizontal',
    specFile: 'benefits-card-horizontal.md',
    hasPreview: true,
  },
  {
    slug: 'benefits-card-vertical',
    title: 'Benefits Card Vertical',
    exportName: 'BenefitsCardVertical',
    hasPreview: true,
  },
  {
    slug: 'benefits-content-card',
    title: 'Benefits Content Card',
    exportName: 'BenefitsContentCard',
    hasPreview: true,
  },
  {
    slug: 'benefits-goals',
    title: 'Benefits Goals',
    exportName: 'BenefitsGoals',
    hasPreview: true,
  },
  {
    slug: 'benefits-levels',
    title: 'Benefits Levels',
    exportName: 'BenefitsLevels',
    specFile: 'benefits-levels.md',
    hasPreview: true,
  },
  {
    slug: 'bottom-menu',
    title: 'Bottom Menu',
    exportName: 'BottomMenu',
    hasPreview: true,
  },
  {
    slug: 'bottom-sheet',
    title: 'Bottom Sheet',
    exportName: 'BottomSheet',
    specFile: 'bottom-sheet.md',
    hasPreview: true,
  },
  {
    slug: 'button',
    title: 'Button',
    exportName: 'Button',
    hasPreview: true,
  },
  {
    slug: 'camera',
    title: 'Camera',
    exportName: 'Camera',
    hasPreview: true,
  },
  {
    slug: 'card-options',
    title: 'Card Options',
    exportName: 'CardOptions',
    specFile: 'card-options.md',
    hasPreview: true,
  },
  {
    slug: 'card-store-item',
    title: 'Card Store Item',
    exportName: 'CardStoreItem',
    hasPreview: true,
  },
  {
    slug: 'carousel-store',
    title: 'Carousel Store',
    exportName: 'CarouselStore',
    hasPreview: true,
  },
  {
    slug: 'dotnav',
    title: 'Dotnav',
    exportName: 'Dotnav',
    hasPreview: true,
  },
  {
    slug: 'event-card',
    title: 'Event Card',
    exportName: 'EventCard',
    hasPreview: true,
  },
  {
    slug: 'fique-por-dentro-card',
    title: 'Fique Por Dentro Card',
    exportName: 'FiquePorDentroCard',
    hasPreview: true,
  },
  {
    slug: 'header-home',
    title: 'Header Home',
    exportName: 'HeaderHome',
    hasPreview: true,
  },
  {
    slug: 'input',
    title: 'Input',
    exportName: 'Input',
    hasPreview: true,
  },
  {
    slug: 'link',
    title: 'Link',
    exportName: 'Link',
    hasPreview: true,
  },
  {
    slug: 'menu-item',
    title: 'Menu Item',
    exportName: 'MenuItem',
    specFile: 'menu-item.md',
    hasPreview: true,
  },
  {
    slug: 'modal-mobile',
    title: 'Modal Mobile',
    exportName: 'ModalMobile',
    specFile: 'modal-mobile.md',
    hasPreview: true,
  },
  {
    slug: 'movie-poster',
    title: 'Movie Poster',
    exportName: 'MoviePoster',
    hasPreview: true,
  },
  {
    slug: 'notification-icon-group',
    title: 'Notification Icon Group',
    exportName: 'NotificationIconGroup',
    hasPreview: true,
  },
  {
    slug: 'progress-bar',
    title: 'Progress Bar',
    exportName: 'ProgressBar',
    hasPreview: true,
  },
  {
    slug: 'radio-button',
    title: 'Radio Button',
    exportName: 'RadioButton',
    specFile: 'radio-button.md',
    hasPreview: true,
  },
  {
    slug: 'radio-icon',
    title: 'Radio Icon',
    exportName: 'RadioIcon',
    specFile: 'radio-icon.md',
    hasPreview: true,
  },
  {
    slug: 'section-title',
    title: 'Section Title',
    exportName: 'SectionTitle',
    hasPreview: true,
  },
  {
    slug: 'shortcuts',
    title: 'Shortcuts',
    exportName: 'Shortcuts',
    hasPreview: true,
  },
  {
    slug: 'shortcuts-menu',
    title: 'Shortcuts Menu',
    exportName: 'ShortcutsMenu',
    hasPreview: true,
  },
  {
    slug: 'store-card',
    title: 'Store Card',
    exportName: 'StoreCard',
    specFile: 'store-card.md',
    hasPreview: true,
  },
  {
    slug: 'toolbar',
    title: 'Toolbar',
    exportName: 'Toolbar',
    hasPreview: true,
  },
];

export function getComponentBySlug(slug: string): ComponentRegistryItem | undefined {
  return COMPONENT_REGISTRY.find((item) => item.slug === slug);
}

export const TOTAL_COMPONENT_COUNT = COMPONENT_REGISTRY.length;
export const PREVIEW_COUNT = COMPONENT_REGISTRY.filter((c) => c.hasPreview).length;
