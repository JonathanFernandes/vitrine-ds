import { BenefitsGoals } from '@vitrine-ds/react-native';
import React from 'react';
import { View } from 'react-native';

import { PreviewScreen, PreviewSection, previewStyles } from '@/components/PreviewScreen';

export default function BenefitsGoalsPreview() {
  return (
    <PreviewScreen title="Benefits Goals">
      <PreviewSection label="Tipos">
        <View style={[previewStyles.column, previewStyles.maxWidth]}>
          <BenefitsGoals type="compras" currentValue={2} totalValue={5} />
          <BenefitsGoals type="reais-gastos" currentValue={350} totalValue={500} />
        </View>
      </PreviewSection>
    </PreviewScreen>
  );
}
