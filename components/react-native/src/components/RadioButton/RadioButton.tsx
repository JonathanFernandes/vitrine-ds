import React from 'react';
import {
  AccessibilityRole,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { RadioIcon, RadioIconVisualState } from '../RadioIcon';
import { useRadioGroup } from './RadioGroup';

export type RadioButtonVisualState =
  | 'default'
  | 'hover'
  | 'checked'
  | 'error'
  | 'disabled'
  | 'disabled-checked'
  | 'focused'
  | 'focus-selected';

export type RadioButtonOptionSide = 'left' | 'right';

export interface RadioButtonProps {
  /** Aligned with Figma VARIANT `Variable`. Overrides derived state when set. */
  state?: RadioButtonVisualState;
  /** Aligned with Figma `Option side`. */
  optionSide?: RadioButtonOptionSide;
  /** Option label (replaces Figma placeholder "Type something"). */
  label: string;
  /** Selected within a radio group. */
  selected?: boolean;
  disabled?: boolean;
  error?: boolean;
  /** Keyboard / TV focus — maps to Focused / Focus-selected when combined with `selected`. */
  focused?: boolean;
  /** Show bottom divider (default true for list layouts). */
  showDivider?: boolean;
  /** Value used when nested inside `RadioGroup`. */
  value?: string;
  onPress?: () => void;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
  style?: StyleProp<ViewStyle>;
}

function resolveVisualState({
  state,
  selected,
  disabled,
  error,
  focused,
}: Pick<
  RadioButtonProps,
  'state' | 'selected' | 'disabled' | 'error' | 'focused'
>): RadioButtonVisualState {
  if (state) {
    return state;
  }

  if (disabled && selected) {
    return 'disabled-checked';
  }

  if (disabled) {
    return 'disabled';
  }

  if (error) {
    return 'error';
  }

  if (focused && selected) {
    return 'focus-selected';
  }

  if (focused) {
    return 'focused';
  }

  if (selected) {
    return 'checked';
  }

  return 'default';
}

function resolveIconState(
  visualState: RadioButtonVisualState,
): RadioIconVisualState {
  switch (visualState) {
    case 'checked':
    case 'focus-selected':
      return 'checked';
    case 'disabled-checked':
      return 'disabled-checked';
    case 'disabled':
      return 'disabled';
    case 'error':
      return 'error';
    case 'hover':
    case 'focused':
      return 'hover';
    default:
      return 'default';
  }
}

function resolveLabelColor(
  visualState: RadioButtonVisualState,
  label: {
    default: string;
    brand: string;
    error: string;
    disabled: string;
    disabledChecked: string;
  },
): string {
  switch (visualState) {
    case 'hover':
    case 'checked':
    case 'focused':
    case 'focus-selected':
      return label.brand;
    case 'error':
      return label.error;
    case 'disabled':
      return label.disabled;
    case 'disabled-checked':
      return label.disabledChecked;
    default:
      return label.default;
  }
}

/**
 * List row with radio control + label + divider — Figma node `8041:6995`.
 * Composes `RadioIcon`; focus ring wraps the full row per spec.
 */
export function RadioButton({
  state,
  optionSide = 'left',
  label,
  selected = false,
  disabled = false,
  error = false,
  focused = false,
  showDivider = true,
  value,
  onPress,
  testID,
  accessibilityLabel,
  accessibilityRole = 'radio',
  style,
}: RadioButtonProps) {
  const { radioButton } = useTheme();
  const group = useRadioGroup();
  const isGroupSelected = value != null && group.value === value;
  const resolvedSelected = selected || isGroupSelected;
  const resolvedOnPress =
    onPress ??
    (value != null && group.onChange
      ? () => group.onChange?.(value)
      : undefined);
  const visualState = resolveVisualState({
    state,
    selected: resolvedSelected,
    disabled,
    error,
    focused,
  });
  const isChecked =
    visualState === 'checked' ||
    visualState === 'focus-selected' ||
    visualState === 'disabled-checked';
  const isDisabled =
    visualState === 'disabled' || visualState === 'disabled-checked';
  const hasFocusRing =
    visualState === 'focused' || visualState === 'focus-selected';
  const labelColor = resolveLabelColor(visualState, radioButton.label);
  const icon = (
    <RadioIcon state={resolveIconState(visualState)} testID={testID ? `${testID}-icon` : undefined} />
  );
  const resolvedAccessibilityLabel = accessibilityLabel ?? label;

  const content = (
    <View
      style={[
        styles.root,
        {
          paddingTop: radioButton.spacing.paddingTop,
          paddingHorizontal: radioButton.spacing.paddingHorizontal,
          gap: radioButton.spacing.columnGap,
        },
        hasFocusRing && {
          borderColor: radioButton.focusRing.border,
          borderWidth: radioButton.focusRing.borderWidth,
          borderRadius: radioButton.focusRing.radius,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.contentFrame,
          hasFocusRing && {
            paddingLeft: radioButton.spacing.focusContentPaddingLeft,
          },
        ]}
      >
        <View
          style={[
            styles.labelRow,
            { gap: radioButton.spacing.rowGap },
          ]}
        >
          {optionSide === 'left' ? icon : null}
          <Text
            numberOfLines={2}
            style={[styles.label, { color: labelColor }]}
          >
            {label}
          </Text>
          {optionSide === 'right' ? icon : null}
        </View>
      </View>
      {showDivider ? (
        <View
          style={[
            styles.divider,
            { backgroundColor: radioButton.divider },
          ]}
        />
      ) : null}
    </View>
  );

  if (resolvedOnPress && !isDisabled) {
    return (
      <Pressable
        accessibilityLabel={resolvedAccessibilityLabel}
        accessibilityRole={accessibilityRole}
        accessibilityState={{
          checked: isChecked,
          disabled: isDisabled,
        }}
        hitSlop={8}
        onPress={resolvedOnPress}
        style={({ pressed }) => [pressed && styles.pressed]}
        testID={testID}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View
      accessibilityLabel={resolvedAccessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityState={{
        checked: isChecked,
        disabled: isDisabled,
      }}
      testID={testID}
    >
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 344,
    maxWidth: '100%',
  },
  contentFrame: {
    width: '100%',
  },
  labelRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    flex: 1,
    minWidth: 0,
    fontFamily: 'BeVietnamPro_400Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    includeFontPadding: false,
  },
  divider: {
    width: '100%',
    height: 1,
  },
  pressed: {
    opacity: 0.88,
  },
});
