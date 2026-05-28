import { FiquePorDentroCard } from '@vitrine-ds/react-native';
import React from 'react';
import { View } from 'react-native';

import { PreviewScreen, PreviewSection, previewStyles } from '@/components/PreviewScreen';
import { SAMPLE_IMAGE_WIDE } from './shared';

export default function FiquePorDentroCardPreview() {
  return (
    <PreviewScreen title="Fique Por Dentro Card">
      <PreviewSection label="Com badges e data">
        <View style={previewStyles.cardWrap}>
          <FiquePorDentroCard
            imageUrl={SAMPLE_IMAGE_WIDE.uri}
            title="Novidades do shopping"
            date="12 Jun 2026"
            badges={[
              { label: 'Destaque', variant: 'neutral-1' },
              { label: 'Eventos', variant: 'neutral-2' },
            ]}
            onPress={() => {}}
          />
        </View>
      </PreviewSection>
    </PreviewScreen>
  );
}
