import { BenefitsCardVertical } from '@vitrine-ds/react-native';
import React from 'react';
import { View } from 'react-native';

import { PreviewScreen, PreviewSection, previewStyles } from '@/components/PreviewScreen';
import { SAMPLE_IMAGE } from './shared';

export default function BenefitsCardVerticalPreview() {
  return (
    <PreviewScreen title="Benefits Card Vertical">
      <PreviewSection label="Estados">
        <View style={previewStyles.row}>
          <BenefitsCardVertical
            storeName="Abbraccio"
            categoryLabel="Sorteio"
            description="Ganhe 20% de desconto"
            expirationDate="Vence 12/06"
            productImageSource={SAMPLE_IMAGE}
            onButtonPress={() => {}}
          />
          <BenefitsCardVertical
            action="disabled"
            storeName="Outback"
            categoryLabel="Bloqueado"
            description="Benefício indisponível"
            productImageSource={SAMPLE_IMAGE}
          />
        </View>
      </PreviewSection>
    </PreviewScreen>
  );
}
