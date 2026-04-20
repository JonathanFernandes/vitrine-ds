import React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';

export type RadioIconVisualState =
  | 'default'
  | 'hover'
  | 'checked'
  | 'disabled'
  | 'disabled-checked'
  | 'error'
  | 'indeterminate'
  | 'focused'
  | 'focus-selected';

export interface RadioIconProps {
  /** Visual variant aligned with Figma's `Variables` property. */
  state?: RadioIconVisualState;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

export function RadioIcon({
  state = 'default',
  testID,
  style,
}: RadioIconProps) {
  const { radioIcon } = useTheme();

  const isSelected = state === 'checked' || state === 'focus-selected';
  const isDisabledChecked = state === 'disabled-checked';
  const isFocused = state === 'focused' || state === 'focus-selected';
  const isDisabled = state === 'disabled' || isDisabledChecked;
  const isIndeterminate = state === 'indeterminate';

  let trackStateStyle: ViewStyle;

  if (isSelected) {
    trackStateStyle = {
      borderColor: radioIcon.indicator.selected,
      backgroundColor: radioIcon.bg.canvas,
    };
  } else if (isDisabledChecked) {
    trackStateStyle = {
      borderColor: radioIcon.indicator.disabledOuter,
      backgroundColor: radioIcon.fill.disabledTrack,
    };
  } else if (isDisabled) {
    trackStateStyle = {
      borderColor: radioIcon.border.disabled,
      backgroundColor: radioIcon.fill.disabledTrack,
    };
  } else if (state === 'error') {
    trackStateStyle = {
      borderColor: radioIcon.border.error,
      backgroundColor: radioIcon.bg.canvas,
    };
  } else if (state === 'hover') {
    trackStateStyle = {
      borderColor: radioIcon.border.hover,
      backgroundColor: radioIcon.bg.canvas,
    };
  } else if (isIndeterminate) {
    trackStateStyle = {
      borderColor: radioIcon.indeterminate.track,
      backgroundColor: radioIcon.indeterminate.track,
    };
  } else {
    trackStateStyle = {
      borderColor: radioIcon.border.default,
      backgroundColor: radioIcon.bg.canvas,
    };
  }

  const dotColor = isDisabledChecked
    ? radioIcon.indicator.disabledMid
    : radioIcon.indicator.selected;

  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[styles.root, style]}
      testID={testID}
    >
      {isFocused ? (
        <View
          style={[
            styles.focusRing,
            {
              borderColor: radioIcon.border.focusRing,
              borderRadius: radioIcon.radius,
            },
          ]}
        />
      ) : null}
      <View
        style={[
          styles.track,
          {
            borderRadius: radioIcon.radius,
          },
          trackStateStyle,
        ]}
      >
        {isSelected || isDisabledChecked ? (
          <View
            style={[
              styles.dot,
              {
                backgroundColor: dotColor,
                borderRadius: radioIcon.radius,
              },
            ]}
          />
        ) : null}
        {isIndeterminate ? (
          <View
            style={[
              styles.indeterminateLine,
              {
                backgroundColor: radioIcon.indeterminate.icon,
                borderRadius: radioIcon.radius,
              },
            ]}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  focusRing: {
    position: 'absolute',
    top: -2.4,
    left: -2.4,
    width: 28.8,
    height: 28.8,
    borderWidth: 2,
  },
  track: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  dot: {
    width: 10,
    height: 10,
  },
  indeterminateLine: {
    width: 14,
    height: 2,
  },
});
