import type { ComponentType } from 'react';

import AccordionPreview from './accordion';
import AvatarPreview from './avatar';
import BadgePreview from './badge';
import BannerPreview from './banner';
import BenefitsCardHorizontalPreview from './benefits-card-horizontal';
import BenefitsCardVerticalPreview from './benefits-card-vertical';
import BenefitsContentCardPreview from './benefits-content-card';
import BenefitsGoalsPreview from './benefits-goals';
import BenefitsLevelsPreview from './benefits-levels';
import BottomMenuPreview from './bottom-menu';
import BottomSheetPreview from './bottom-sheet';
import ButtonPreview from './button';
import CameraPreview from './camera';
import CardOptionsPreview from './card-options';
import CardStoreItemPreview from './card-store-item';
import CarouselStorePreview from './carousel-store';
import DotnavPreview from './dotnav';
import EventCardPreview from './event-card';
import FiquePorDentroCardPreview from './fique-por-dentro-card';
import HeaderHomePreview from './header-home';
import InputPreview from './input';
import LinkPreview from './link';
import MenuItemPreview from './menu-item';
import ModalMobilePreview from './modal-mobile';
import MoviePosterPreview from './movie-poster';
import NotificationIconGroupPreview from './notification-icon-group';
import ProgressBarPreview from './progress-bar';
import RadioButtonPreview from './radio-button';
import RadioIconPreview from './radio-icon';
import SectionTitlePreview from './section-title';
import ShortcutsPreview from './shortcuts';
import ShortcutsMenuPreview from './shortcuts-menu';
import StoreCardPreview from './store-card';
import ToolbarPreview from './toolbar';

export const PREVIEW_SCREENS: Record<string, ComponentType> = {
  accordion: AccordionPreview,
  avatar: AvatarPreview,
  badge: BadgePreview,
  banner: BannerPreview,
  'benefits-card-horizontal': BenefitsCardHorizontalPreview,
  'benefits-card-vertical': BenefitsCardVerticalPreview,
  'benefits-content-card': BenefitsContentCardPreview,
  'benefits-goals': BenefitsGoalsPreview,
  'benefits-levels': BenefitsLevelsPreview,
  'bottom-menu': BottomMenuPreview,
  'bottom-sheet': BottomSheetPreview,
  button: ButtonPreview,
  camera: CameraPreview,
  'card-options': CardOptionsPreview,
  'card-store-item': CardStoreItemPreview,
  'carousel-store': CarouselStorePreview,
  dotnav: DotnavPreview,
  'event-card': EventCardPreview,
  'fique-por-dentro-card': FiquePorDentroCardPreview,
  'header-home': HeaderHomePreview,
  input: InputPreview,
  link: LinkPreview,
  'menu-item': MenuItemPreview,
  'modal-mobile': ModalMobilePreview,
  'movie-poster': MoviePosterPreview,
  'notification-icon-group': NotificationIconGroupPreview,
  'progress-bar': ProgressBarPreview,
  'radio-button': RadioButtonPreview,
  'radio-icon': RadioIconPreview,
  'section-title': SectionTitlePreview,
  shortcuts: ShortcutsPreview,
  'shortcuts-menu': ShortcutsMenuPreview,
  'store-card': StoreCardPreview,
  toolbar: ToolbarPreview,
};
