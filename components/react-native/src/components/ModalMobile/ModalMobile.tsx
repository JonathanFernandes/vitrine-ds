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
import { Button } from '../Button';
import { Link } from '../Link';

export type ModalMobileType = 'simples' | 'destructive' | 'illustration';

export interface ModalMobileProps {
  /** Visual variant aligned with Figma's `type` property. */
  type?: ModalMobileType;
  title: string;
  body: string;
  primaryLabel: string;
  secondaryLabel: string;
  linkLabel: string;
  onPrimaryPress?: () => void;
  onSecondaryPress?: () => void;
  onLinkPress?: () => void;
  onClose?: () => void;
  /** Required for `type="illustration"` in product usage. */
  illustration?: React.ReactNode;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

const noop = () => {};

function CloseIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6.75 6.75 17.25 17.25M17.25 6.75 6.75 17.25"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={1.8}
      />
    </Svg>
  );
}

function InfoIcon({ color }: { color: string }) {
  return (
    <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
      <Circle cx={24} cy={24} r={14} stroke={color} strokeWidth={3} />
      <Path
        d="M24 21v10"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={3}
      />
      <Circle cx={24} cy={16.5} fill={color} r={1.7} />
    </Svg>
  );
}

function ErrorIcon({ color }: { color: string }) {
  return (
    <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
      <Circle cx={24} cy={24} r={14} stroke={color} strokeWidth={3} />
      <Path
        d="M18.75 18.75 29.25 29.25M29.25 18.75 18.75 29.25"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={3}
      />
    </Svg>
  );
}

function renderIllustration(illustration?: React.ReactNode) {
  if (!illustration) {
    return null;
  }

  if (!React.isValidElement(illustration)) {
    return illustration;
  }

  return React.cloneElement(
    illustration as React.ReactElement<{ width?: number; height?: number }>,
    { width: 135, height: 135 },
  );
}

/**
 * Centered mobile modal based on Figma node `7601:18126`.
 * Use React Native `Modal` outside this shell when focus trapping/backdrop behavior is needed.
 */
export function ModalMobile({
  type = 'simples',
  title,
  body,
  primaryLabel,
  secondaryLabel,
  linkLabel,
  onPrimaryPress,
  onSecondaryPress,
  onLinkPress,
  onClose,
  illustration,
  testID,
  style,
}: ModalMobileProps) {
  const { modalMobile } = useTheme();
  const isIllustration = type === 'illustration';
  const isDestructive = type === 'destructive';

  return (
    <View
      accessibilityRole="alert"
      style={[
        styles.shell,
        isIllustration ? styles.illustrationShell : styles.defaultShell,
        {
          backgroundColor: modalMobile.surface.bg,
          borderRadius: modalMobile.radius,
          shadowColor: modalMobile.elevation.shadowColor,
        },
        style,
      ]}
      testID={testID}
    >
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[styles.visualSlot, isIllustration && styles.illustrationVisualSlot]}
      >
        {isIllustration ? (
          <View style={styles.illustration}>
            {renderIllustration(illustration)}
          </View>
        ) : isDestructive ? (
          <ErrorIcon color={modalMobile.icon.error} />
        ) : (
          <InfoIcon color={modalMobile.icon.info} />
        )}
      </View>

      <View style={[styles.titleSlot, isIllustration && styles.illustrationTitleSlot]}>
        <Text
          numberOfLines={2}
          style={[styles.title, { color: modalMobile.text.title }]}
        >
          {title}
        </Text>
      </View>

      <View style={styles.bodySlot}>
        <Text style={[styles.body, { color: modalMobile.text.body }]}>
          {body}
        </Text>
      </View>

      <View style={styles.actions}>
        <Button
          fullWidth
          onPress={onPrimaryPress ?? noop}
          size="medium"
          status={isDestructive ? 'destructive' : 'primary'}
        >
          {primaryLabel}
        </Button>
        <Button
          fullWidth
          onPress={onSecondaryPress ?? noop}
          size="medium"
          status="secondary"
        >
          {secondaryLabel}
        </Button>
        <Link
          containerStyle={styles.link}
          onPress={onLinkPress ?? noop}
          showChevronRight={false}
          size="small"
        >
          {linkLabel}
        </Link>
      </View>

      <Pressable
        accessibilityLabel="Fechar"
        accessibilityRole="button"
        hitSlop={10}
        onPress={onClose}
        style={styles.closeButton}
      >
        <CloseIcon color={modalMobile.icon.close} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    width: 328,
    maxWidth: '100%',
    alignItems: 'center',
    position: 'relative',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 16,
  },
  defaultShell: {
    minHeight: 384,
    paddingVertical: 24,
  },
  illustrationShell: {
    minHeight: 471,
    paddingVertical: 16,
  },
  visualSlot: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationVisualSlot: {
    paddingTop: 16,
  },
  illustration: {
    width: 135,
    height: 135,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  titleSlot: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  illustrationTitleSlot: {
    paddingVertical: 4,
    minHeight: 48,
  },
  title: {
    width: 280,
    maxWidth: '100%',
    fontFamily: 'BeVietnamPro_700Bold',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: -0.18,
    textAlign: 'center',
    includeFontPadding: false,
  },
  bodySlot: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  body: {
    width: '100%',
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    textAlign: 'center',
    includeFontPadding: false,
  },
  actions: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  link: {
    alignSelf: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
