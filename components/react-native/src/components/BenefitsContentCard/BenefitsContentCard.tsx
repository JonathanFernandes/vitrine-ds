import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { Button } from '../Button';
import { SvgAssetIcon } from '../SvgAssetIcon';

const CARD_MAX_WIDTH = 343;
/** spacing.padding.positive.sm */
const PADDING = 16;
/** spacing.padding.positive.xs (vertical stack gap) */
const STACK_GAP = 12;
/** gap between stars */
const STAR_ROW_GAP = 4;

export interface BenefitsContentCardProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  onPressSubmit?: () => void;
  buttonDisabled?: boolean;
  buttonLoading?: boolean;
  /** Acessibilidade do bloco (card) */
  accessibilityLabel?: string;
  testID?: string;
  style?: ViewStyle;
}

const DEFAULT_TITLE = 'Desbloqueie benefícios';
const DEFAULT_DESCRIPTION =
  'Envie notas fiscais e participe do Programa de Relacionamento';
const DEFAULT_BUTTON = 'Enviar nota';

export function BenefitsContentCard({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  buttonLabel = DEFAULT_BUTTON,
  onPressSubmit,
  buttonDisabled = false,
  buttonLoading = false,
  accessibilityLabel,
  testID,
  style,
}: BenefitsContentCardProps) {
  const { benefitsContentCard: t, fontsLoaded } = useTheme();

  const cardA11yLabel =
    accessibilityLabel ?? `${title}. ${description}. ${buttonLabel}.`;

  return (
    <View
      accessibilityRole="none"
      accessibilityLabel={cardA11yLabel}
      testID={testID}
      style={[styles.root, themedCard(t), style]}
    >
      <View style={styles.starsRow}>
        <SvgAssetIcon name="estrela-loyalt" width={16} height={16} />
        <SvgAssetIcon name="estrela-loyalt" width={32} height={32} />
        <SvgAssetIcon name="estrela-loyalt" width={16} height={16} />
      </View>

      <Text
        style={[
          styles.title,
          { color: t.text },
          !fontsLoaded && styles.titleSystemFallback,
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          styles.description,
          { color: t.text },
          !fontsLoaded && styles.descriptionSystemFallback,
        ]}
      >
        {description}
      </Text>

      <Button
        status="primary"
        size="small"
        fullWidth
        disabled={buttonDisabled}
        loading={buttonLoading}
        onPress={onPressSubmit}
        iconLeft={<SvgAssetIcon name="qr-code-nav" width={16} height={16} />}
        accessibilityLabel={buttonLabel}
        testID={testID ? `${testID}-submit` : undefined}
      >
        {buttonLabel}
      </Button>
    </View>
  );
}

function themedCard(t: {
  surface: string;
  border: string;
  radius: number;
}): ViewStyle {
  return {
    backgroundColor: t.surface,
    borderColor: t.border,
    borderRadius: t.radius,
  };
}

const styles = StyleSheet.create({
  root: {
    maxWidth: CARD_MAX_WIDTH,
    width: '100%',
    alignSelf: 'center',
    borderWidth: 1,
    padding: PADDING,
    gap: STACK_GAP,
    alignItems: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: STAR_ROW_GAP,
  },
  title: {
    fontFamily: 'BeVietnamPro_600SemiBold',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: -0.16,
    textAlign: 'center',
    includeFontPadding: false,
  },
  titleSystemFallback: {
    fontFamily: undefined,
    fontWeight: '600',
  },
  description: {
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    textAlign: 'center',
    alignSelf: 'stretch',
    includeFontPadding: false,
  },
  descriptionSystemFallback: {
    fontFamily: undefined,
    fontWeight: '400',
  },
});
