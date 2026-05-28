import { Avatar } from '@vitrine-ds/react-native';
import React from 'react';
import { View } from 'react-native';

import { PreviewScreen, PreviewSection, previewStyles } from '@/components/PreviewScreen';

export default function AvatarPreview() {
  return (
    <PreviewScreen title="Avatar" specFile="avatar.md">
      <PreviewSection label="Tamanhos">
        <View style={previewStyles.row}>
          <Avatar label="JF" size="small" accessibilityLabel="João Fernandes" />
          <Avatar label="AB" size="large" accessibilityLabel="Ana Brasil" />
        </View>
      </PreviewSection>
    </PreviewScreen>
  );
}
