import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme';

/** Logical viewBox side — Figma component `Camera` (7367:2978). */
const VIEWBOX = 220;
/** Approx. L-arm length from Figma vector bounds (~25px at 220 scale). */
const ARM = 25;

export interface CameraProps {
  /** Width and height; defaults to Figma frame (220). */
  size?: number;
  /** Override stroke; defaults to `component.camera.stroke.default` from theme. */
  strokeColor?: string;
  testID?: string;
  /** Decorative overlay — hide from screen readers when parent supplies the label. */
  accessibilityElementsHidden?: boolean;
  accessibilityLabel?: string;
}

/**
 * Viewfinder (four corner brackets) for capture / focus framing.
 * Spec: `specs/camera.md` — stroke `component.camera.stroke.default`, weight 3, SVG paths.
 */
export function Camera({
  size,
  strokeColor,
  testID,
  accessibilityElementsHidden,
  accessibilityLabel,
}: CameraProps) {
  const { camera } = useTheme();
  const side = size ?? camera.defaultSize;
  const stroke = strokeColor ?? camera.strokeDefault;
  const w = camera.strokeWidth;

  const tl = `M 0 ${ARM} L 0 0 L ${ARM} 0`;
  const tr = `M ${VIEWBOX - ARM} 0 L ${VIEWBOX} 0 L ${VIEWBOX} ${ARM}`;
  const br = `M ${VIEWBOX} ${VIEWBOX - ARM} L ${VIEWBOX} ${VIEWBOX} L ${
    VIEWBOX - ARM
  } ${VIEWBOX}`;
  const bl = `M ${ARM} ${VIEWBOX} L 0 ${VIEWBOX} L 0 ${VIEWBOX - ARM}`;

  const hideFromA11y = Boolean(accessibilityElementsHidden);
  const isExplicitlyLabeled =
    accessibilityLabel != null && accessibilityLabel !== '';

  return (
    <View
      testID={testID}
      accessibilityElementsHidden={hideFromA11y}
      importantForAccessibility={hideFromA11y ? 'no-hide-descendants' : 'auto'}
      accessibilityLabel={accessibilityLabel}
      accessible={isExplicitlyLabeled && !hideFromA11y}
    >
      <Svg
        width={side}
        height={side}
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        fill="none"
      >
        <Path
          d={tl}
          stroke={stroke}
          strokeWidth={w}
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <Path
          d={tr}
          stroke={stroke}
          strokeWidth={w}
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <Path
          d={br}
          stroke={stroke}
          strokeWidth={w}
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <Path
          d={bl}
          stroke={stroke}
          strokeWidth={w}
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </Svg>
    </View>
  );
}
