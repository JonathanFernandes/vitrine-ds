import { Camera } from '@vitrine-ds/react-native';
import React from 'react';
import { View } from 'react-native';

import { PreviewScreen, PreviewSection, previewStyles } from '@/components/PreviewScreen';

export default function CameraPreview() {
  return (
    <PreviewScreen title="Camera">
      <PreviewSection label="Viewfinder">
        <View style={previewStyles.row}>
          <Camera size={120} accessibilityLabel="Área de captura" />
          <Camera size={180} />
        </View>
      </PreviewSection>
    </PreviewScreen>
  );
}
