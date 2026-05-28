import { Shortcuts, type ShortcutsVariant } from '@vitrine-ds/react-native';
import React from 'react';

import { PreviewScreen, PreviewSection } from '@/components/PreviewScreen';

const VARIANTS: ShortcutsVariant[] = [
  'hub-home-deslogada',
  'hub-home-logada',
  'hub-menu',
  'hub-beneficios',
];

export default function ShortcutsPreview() {
  return (
    <PreviewScreen title="Shortcuts" contentStyle={{ paddingHorizontal: 0 }}>
      {VARIANTS.map((variant) => (
        <PreviewSection key={variant} label={variant}>
          <Shortcuts variant={variant} />
        </PreviewSection>
      ))}
    </PreviewScreen>
  );
}
