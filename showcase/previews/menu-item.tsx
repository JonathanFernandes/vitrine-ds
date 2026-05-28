import { MenuItem } from '@vitrine-ds/react-native';
import React from 'react';
import { View } from 'react-native';

import { PreviewScreen, PreviewSection, previewStyles } from '@/components/PreviewScreen';

export default function MenuItemPreview() {
  return (
    <PreviewScreen title="Menu Item" specFile="menu-item.md">
      <PreviewSection label="Estilos">
        <View style={[previewStyles.column, previewStyles.maxWidth]}>
          <MenuItem label="Conectar ao Wi-Fi" onPress={() => {}} />
          <MenuItem label="Central de ajuda" icon={false} onPress={() => {}} />
        </View>
      </PreviewSection>
      <PreviewSection label="Negative" dark>
        <View style={previewStyles.maxWidth}>
          <MenuItem label="Sair da conta" style="negative" onPress={() => {}} />
        </View>
      </PreviewSection>
    </PreviewScreen>
  );
}
