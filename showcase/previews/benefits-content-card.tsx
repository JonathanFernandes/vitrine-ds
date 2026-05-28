import { BenefitsContentCard } from '@vitrine-ds/react-native';
import React from 'react';
import { View } from 'react-native';

import { PreviewScreen, PreviewSection, previewStyles } from '@/components/PreviewScreen';

export default function BenefitsContentCardPreview() {
  return (
    <PreviewScreen title="Benefits Content Card">
      <PreviewSection label="Padrão">
        <View style={previewStyles.maxWidth}>
          <BenefitsContentCard onPressSubmit={() => {}} />
        </View>
      </PreviewSection>
    </PreviewScreen>
  );
}
