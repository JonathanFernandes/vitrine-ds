import { CarouselStore } from '@vitrine-ds/react-native';
import React from 'react';

import { PreviewScreen, PreviewSection } from '@/components/PreviewScreen';
import { SAMPLE_LOGO } from './shared';

const STORES = [
  { id: '1', name: 'Abbraccio', logoUri: SAMPLE_LOGO.uri },
  { id: '2', name: 'Outback', logoUri: SAMPLE_LOGO.uri },
  { id: '3', name: 'Zara' },
  { id: '4', name: 'Renner', logoUri: SAMPLE_LOGO.uri },
  { id: '5', name: 'C&A' },
];

export default function CarouselStorePreview() {
  return (
    <PreviewScreen title="Carousel Store">
      <PreviewSection label="Horizontal">
        <CarouselStore stores={STORES} onStorePress={() => {}} />
      </PreviewSection>
    </PreviewScreen>
  );
}
