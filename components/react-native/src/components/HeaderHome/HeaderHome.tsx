import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useTheme } from '../../theme';
import { SvgAssetIcon } from '../SvgAssetIcon';
import {
  Shortcuts,
  ShortcutItemProps,
  ShortcutsVariant,
} from '../Shortcuts';
import {
  NotificationIconGroup,
  NotificationIconGroupVariant,
} from '../NotificationIconGroup';
import { BenefitsGoals } from '../BenefitsGoals';

export interface HeaderHomeProps {
  userName?: string;
  membershipLabel?: string;
  backgroundColor?: string;
  spentCurrentValue?: number;
  spentTotalValue?: number;
  purchasesCurrentValue?: number;
  purchasesTotalValue?: number;
  shortcutsVariant?: Extract<
    ShortcutsVariant,
    'hub-home-deslogada' | 'hub-home-logada'
  >;
  shortcutItems?: ShortcutItemProps[];
  notificationVariant?: NotificationIconGroupVariant;
  notificationCount?: number;
  notificationAccessibilityLabel?: string;
  onNotificationPress?: () => void;
  onInfoPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

function LoyaltyStarIcon({ size = 48 }: { size?: number }) {
  return <SvgAssetIcon name="estrela-loyalt" width={size} height={size} />;
}

function InfoIcon({ color }: { color: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Circle cx={8} cy={8} r={6.3} stroke={color} strokeWidth={1.4} />
      <Path
        d="M8 7V10.2"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={1.4}
      />
      <Circle cx={8} cy={5.2} r={0.9} fill={color} />
    </Svg>
  );
}

export function HeaderHome({
  userName = 'Mariana',
  membershipLabel = '2 estrelas.',
  backgroundColor,
  spentCurrentValue = 4619.9,
  spentTotalValue = 15500.41,
  purchasesCurrentValue = 8,
  purchasesTotalValue = 15,
  shortcutsVariant = 'hub-home-logada',
  shortcutItems,
  notificationVariant = 'default',
  notificationCount = 10,
  notificationAccessibilityLabel,
  onNotificationPress,
  onInfoPress,
  style,
}: HeaderHomeProps) {
  const { headerHome } = useTheme();
  const resolvedBackgroundColor = backgroundColor ?? headerHome.contentBg;
  const infoColor = headerHome.meta;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: resolvedBackgroundColor,
          gap: headerHome.spacing.blockGap,
          paddingHorizontal: headerHome.spacing.paddingInline,
          paddingVertical: headerHome.spacing.paddingStack,
        },
        style,
      ]}
    >
      <View style={styles.headerIntro}>
        <View style={styles.headerUserRow}>
          <LoyaltyStarIcon size={48} />
          <View style={styles.headerTextBlock}>
            <View style={styles.greetingRow}>
              <Text style={[styles.headerGreeting, { color: headerHome.title }]}>
                Olá, {userName} :)
              </Text>
              <NotificationIconGroup
                accessibilityLabel={notificationAccessibilityLabel}
                count={notificationCount}
                counterTone="strong"
                onPress={onNotificationPress}
                variant={notificationVariant}
              />
            </View>

            <View style={styles.membershipRow}>
              <Text style={[styles.headerSubline, { color: headerHome.meta }]}>
                Você é cliente
              </Text>
              <Text style={[styles.headerSublineBold, { color: headerHome.highlight }]}>
                {membershipLabel}
              </Text>
              <Pressable
                accessibilityLabel="Informações sobre categoria do cliente"
                accessibilityRole="button"
                hitSlop={8}
                onPress={onInfoPress}
                style={({ pressed }) => [styles.infoButton, pressed && styles.pressed]}
              >
                <InfoIcon color={infoColor} />
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.metricsCard,
          {
            backgroundColor: headerHome.summary.bg,
            borderRadius: headerHome.summary.radius,
          },
        ]}
      >
        <View style={styles.goalsRow}>
          <BenefitsGoals
            type="reais-gastos"
            currentValue={spentCurrentValue}
            totalValue={spentTotalValue}
          />
          <BenefitsGoals
            type="compras"
            currentValue={purchasesCurrentValue}
            totalValue={purchasesTotalValue}
          />
        </View>
      </View>

      <Shortcuts
        items={shortcutItems}
        style={styles.shortcuts}
        variant={shortcutsVariant}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  headerIntro: {
    width: '100%',
  },
  topRow: {
    gap: 16,
  },
  headerUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTextBlock: {
    flex: 1,
    gap: 4,
    flexShrink: 1,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  headerGreeting: {
    flex: 1,
    fontFamily: 'BeVietnamPro_600SemiBold',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: -0.16,
    includeFontPadding: false,
  },
  membershipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },
  headerSubline: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    includeFontPadding: false,
  },
  headerSublineBold: {
    fontFamily: 'BeVietnamPro_700Bold',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    includeFontPadding: false,
  },
  infoButton: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricsCard: {
    padding: 16,
  },
  goalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  shortcuts: {
    width: '100%',
  },
  pressed: {
    opacity: 0.8,
  },
});
