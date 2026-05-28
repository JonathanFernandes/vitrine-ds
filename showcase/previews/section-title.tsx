import { SectionTitle } from '@vitrine-ds/react-native';
import React from 'react';
import { View } from 'react-native';

import { PreviewScreen, PreviewSection, previewStyles } from '@/components/PreviewScreen';

export default function SectionTitlePreview() {
  return (
    <PreviewScreen title="Section Title">
      <PreviewSection label="Default">
        <View style={previewStyles.maxWidth}>
          <SectionTitle title="Destaques" onLinkPress={() => {}} />
        </View>
      </PreviewSection>
      <PreviewSection label="Negative" dark>
        <View style={previewStyles.maxWidth}>
          <SectionTitle title="Em alta" variant="negative" onLinkPress={() => {}} />
        </View>
      </PreviewSection>
    </PreviewScreen>
  );
}
