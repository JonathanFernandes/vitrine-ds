import { ProgressBar, type ProgressBarColor } from '@vitrine-ds/react-native';
import React from 'react';
import { View } from 'react-native';

import { PreviewScreen, PreviewSection, previewStyles } from '@/components/PreviewScreen';

const COLORS: ProgressBarColor[] = ['primary', 'success', 'disabled'];

export default function ProgressBarPreview() {
  return (
    <PreviewScreen title="Progress Bar">
      <PreviewSection label="Cores">
        <View style={[previewStyles.column, previewStyles.maxWidth]}>
          {COLORS.map((color) => (
            <ProgressBar
              key={color}
              color={color}
              progress={65}
              accessibilityLabel={`Progresso ${color}`}
            />
          ))}
        </View>
      </PreviewSection>
      <PreviewSection label="Tamanhos">
        <View style={[previewStyles.column, previewStyles.maxWidth]}>
          <ProgressBar size="small" progress={40} />
          <ProgressBar size="medium" progress={60} />
          <ProgressBar size="large" progress={80} />
        </View>
      </PreviewSection>
    </PreviewScreen>
  );
}
