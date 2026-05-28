import { Banner } from '@vitrine-ds/react-native';
import React, { useState } from 'react';

import { PreviewScreen, PreviewSection } from '@/components/PreviewScreen';
import { SAMPLE_IMAGE_WIDE } from './shared';

export default function BannerPreview() {
  const [slide, setSlide] = useState(0);

  return (
    <PreviewScreen title="Banner">
      <PreviewSection label="Carrossel interativo">
        <Banner
          imageSource={SAMPLE_IMAGE_WIDE}
          imageAccessibilityLabel="Banner promocional"
          slideCount={3}
          currentSlide={slide}
          onSlideChange={setSlide}
          width={343}
        />
      </PreviewSection>
    </PreviewScreen>
  );
}
