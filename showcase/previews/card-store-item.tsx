import { CardStoreItem } from '@vitrine-ds/react-native';
import React from 'react';
import { View } from 'react-native';

import { PreviewScreen, PreviewSection, previewStyles } from '@/components/PreviewScreen';
import { SAMPLE_LOGO } from './shared';

export default function CardStoreItemPreview() {
  return (
    <PreviewScreen title="Card Store Item">
      <PreviewSection label="Variantes">
        <View style={previewStyles.row}>
          <CardStoreItem storeName="Abbraccio" logoUri={SAMPLE_LOGO.uri} onPress={() => {}} />
          <CardStoreItem storeName="Sem logo" onPress={() => {}} />
          <CardStoreItem storeName="Desabilitado" disabled />
        </View>
      </PreviewSection>
    </PreviewScreen>
  );
}
