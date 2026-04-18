import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { ProgressBar } from '../ProgressBar';

export type BenefitsGoalsType = 'compras' | 'reais-gastos';

export interface BenefitsGoalsProps {
  type: BenefitsGoalsType;
  currentValue: number;
  totalValue: number;
  progress?: number;
  width?: number;
  accessibilityLabel?: string;
}

function clampProgress(progress: number) {
  return Math.min(100, Math.max(0, progress));
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatTitle(type: BenefitsGoalsType, value: number) {
  if (type === 'reais-gastos') {
    return formatCurrency(value);
  }

  return `${value} ${value === 1 ? 'compra' : 'compras'}`;
}

function formatSubtitle(type: BenefitsGoalsType, value: number) {
  if (type === 'reais-gastos') {
    return `de ${formatCurrency(value)}`;
  }

  return `de ${value} ${value === 1 ? 'compra' : 'compras'}`;
}

export function BenefitsGoals({
  type,
  currentValue,
  totalValue,
  progress,
  width,
  accessibilityLabel,
}: BenefitsGoalsProps) {
  const { benefitsGoals } = useTheme();
  const resolvedProgress =
    progress ?? (totalValue > 0 ? Math.round((currentValue / totalValue) * 100) : 0);
  const clampedProgress = clampProgress(resolvedProgress);
  const title = formatTitle(type, currentValue);
  const subtitle = formatSubtitle(type, totalValue);
  const rootStyle: ViewStyle | undefined =
    typeof width === 'number' ? { width } : undefined;
  const resolvedAccessibilityLabel =
    accessibilityLabel ??
    `${title}, ${subtitle}, ${clampedProgress}% do objetivo`;

  return (
    <View style={[styles.root, rootStyle]} accessibilityLabel={resolvedAccessibilityLabel}>
      <View style={styles.titleRow}>
        <Text style={[styles.title, { color: benefitsGoals.title }]}>{title}</Text>
      </View>

      <ProgressBar
        progress={clampedProgress}
        size="small"
        color="primary"
        animated
        width="100%"
        accessibilityLabel="Progresso da meta"
      />

      <Text style={[styles.subtitle, { color: benefitsGoals.subtitle }]}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 146,
    gap: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'BeVietnamPro_700Bold',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    includeFontPadding: false,
  },
  subtitle: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    includeFontPadding: false,
  },
});
