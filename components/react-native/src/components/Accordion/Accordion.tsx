import React, { useCallback, useMemo, useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import { useTheme } from '../../theme';
import { ChevronBottomIcon, ChevronTopIcon } from './icons';

export type AccordionAction = 'closed' | 'open-simple' | 'open-list';

/** Maps Figma `Type`: dark = default palette; light = inverse (on dark surfaces). */
export type AccordionType = 'dark' | 'light';

export interface AccordionListItem {
  badgeLabel: string;
  label: string;
}

export interface AccordionProps {
  /** Static Figma variant for docs/showcase; prefer `expanded` + `onToggle` in product. */
  action?: AccordionAction;
  type?: AccordionType;
  title: string;
  /** Shown when expanded in simple mode. */
  subtitle?: string;
  /** Shown when expanded in list mode. */
  items?: AccordionListItem[];
  expanded?: boolean;
  defaultExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  testID?: string;
  accessibilityLabel?: string;
}

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function resolveExpandedContent(
  isExpanded: boolean,
  action: AccordionAction | undefined,
  items: AccordionListItem[] | undefined,
  subtitle: string | undefined,
): 'none' | 'simple' | 'list' {
  if (action === 'open-list') return 'list';
  if (action === 'open-simple') return 'simple';
  if (action === 'closed') return 'none';
  if (!isExpanded) return 'none';
  if (items && items.length > 0) return 'list';
  if (subtitle) return 'simple';
  return 'none';
}

/**
 * Expandable disclosure — Figma `COMPONENT_SET` accordion `7922:5670`.
 * @see specs/component-spec/accordion.md
 */
export function Accordion({
  action,
  type = 'dark',
  title,
  subtitle,
  items,
  expanded: expandedProp,
  defaultExpanded = false,
  onToggle,
  testID,
  accessibilityLabel,
}: AccordionProps) {
  const { accordion: tokens } = useTheme();
  const isInverse = type === 'light';
  const palette = useMemo(
    () => ({
      title: isInverse ? tokens.title.negative : tokens.title.default,
      icon: isInverse ? tokens.icon.negative : tokens.icon.default,
      subtitle: isInverse ? tokens.subtitle.negative : tokens.subtitle.default,
      badgeBg: isInverse ? tokens.badge.bg.negative : tokens.badge.bg.default,
      badgeNumber: isInverse ? tokens.badge.number.negative : tokens.badge.number.default,
    }),
    [isInverse, tokens],
  );

  const isControlled = expandedProp !== undefined;
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  const isExpandedFromState = isControlled ? Boolean(expandedProp) : internalExpanded;
  const isExpanded =
    action !== undefined ? action !== 'closed' : isExpandedFromState;

  const contentMode = resolveExpandedContent(isExpanded, action, items, subtitle);

  const setExpanded = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalExpanded(next);
      onToggle?.(next);
    },
    [isControlled, onToggle],
  );

  const handleToggle = useCallback(() => {
    if (action !== undefined) return;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!isExpandedFromState);
  }, [action, isExpandedFromState, setExpanded]);

  const headerA11yLabel =
    accessibilityLabel ??
    `${title}, ${isExpanded ? 'expandido' : 'recolhido'}${
      contentMode === 'list' && items?.length
        ? `, ${items.length} itens`
        : ''
    }`;

  const header = (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ expanded: isExpanded }}
      accessibilityLabel={headerA11yLabel}
      disabled={action !== undefined}
      hitSlop={{ top: 14, bottom: 14, left: 8, right: 8 }}
      onPress={handleToggle}
      style={[
        styles.header,
        {
          paddingHorizontal: tokens.spacing.headerPaddingH,
          minHeight: 44,
        },
      ]}
    >
      <Text style={[styles.title, { color: palette.title }]} numberOfLines={2}>
        {title}
      </Text>
      <View style={styles.chevron} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        {isExpanded ? (
          <ChevronTopIcon color={palette.icon} size={16} />
        ) : (
          <ChevronBottomIcon color={palette.icon} size={16} />
        )}
      </View>
    </Pressable>
  );

  const simpleBody =
    contentMode === 'simple' && subtitle ? (
      <View
        style={[styles.simpleBody, { paddingHorizontal: tokens.spacing.simplePaddingH }]}
        accessibilityRole="none"
      >
        <Text style={[styles.subtitle, { color: palette.subtitle }]}>{subtitle}</Text>
      </View>
    ) : null;

  const listBody =
    contentMode === 'list' && items && items.length > 0 ? (
      <View style={[styles.listBody, { gap: tokens.spacing.listItemGap }]} accessibilityRole="none">
        {items.map((item, index) => (
          <View
            key={`${item.badgeLabel}-${index}`}
            style={[
              styles.listRow,
              {
                gap: tokens.spacing.listRowGap,
                paddingHorizontal: tokens.spacing.headerPaddingH,
              },
            ]}
            accessibilityLabel={`${item.badgeLabel}, ${item.label}`}
          >
            <View
              style={[
                styles.badge,
                {
                  width: tokens.spacing.badgeSize,
                  height: tokens.spacing.badgeSize,
                  padding: tokens.spacing.badgePadding,
                  borderRadius: tokens.spacing.badgeRadius,
                  backgroundColor: palette.badgeBg,
                },
              ]}
            >
              <Text style={[styles.badgeLabel, { color: palette.badgeNumber }]}>{item.badgeLabel}</Text>
            </View>
            <Text style={[styles.subtitle, styles.listLabel, { color: palette.subtitle }]}>{item.label}</Text>
          </View>
        ))}
      </View>
    ) : null;

  return (
    <View style={[styles.root, { width: tokens.width, gap: isExpanded ? tokens.spacing.headerContentGap : 0 }]} testID={testID}>
      {header}
      {simpleBody}
      {listBody}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    flex: 1,
    flexShrink: 1,
    maxWidth: 277,
    fontFamily: 'BeVietnamPro_700Bold',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
    includeFontPadding: false,
  },
  chevron: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  simpleBody: {
    width: '100%',
    alignItems: 'flex-start',
  },
  subtitle: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    includeFontPadding: false,
  },
  listBody: {
    width: '100%',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 24,
  },
  listLabel: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
  },
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLabel: {
    fontFamily: 'BeVietnamPro_700Bold',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 14,
    textAlign: 'center',
    includeFontPadding: false,
  },
});
