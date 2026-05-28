import { Toolbar, type ToolbarVariant } from '@vitrine-ds/react-native';
import React from 'react';

import { PreviewScreen, PreviewSection } from '@/components/PreviewScreen';

const VARIANTS: ToolbarVariant[] = ['default', 'negative', 'icons', 'onboarding'];

export default function ToolbarPreview() {
  return (
    <PreviewScreen title="Toolbar" contentStyle={{ paddingHorizontal: 0 }}>
      {VARIANTS.map((variant) => (
        <PreviewSection key={variant} label={`variant = ${variant}`}>
          <Toolbar
            variant={variant}
            backLabel="Voltar"
            onBackPress={() => {}}
            rightLabel={variant === 'default' ? 'Ajuda' : undefined}
            onRightPress={() => {}}
            onSearchPress={() => {}}
            onMenuPress={() => {}}
          />
        </PreviewSection>
      ))}
    </PreviewScreen>
  );
}
