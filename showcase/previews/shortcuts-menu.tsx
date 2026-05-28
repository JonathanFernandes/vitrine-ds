import { ShortcutsMenu } from '@vitrine-ds/react-native';
import React from 'react';
import { View } from 'react-native';

import { PreviewScreen, PreviewSection, previewStyles } from '@/components/PreviewScreen';

export default function ShortcutsMenuPreview() {
  return (
    <PreviewScreen title="Shortcuts Menu">
      <PreviewSection label="Menu · estados">
        <View style={previewStyles.row}>
          <ShortcutsMenu application="menu" feature="reserva-de-mesa" label="Reservar mesa" />
          <ShortcutsMenu application="menu" state="active" feature="fila-online" label="Fila online" />
          <ShortcutsMenu application="menu" state="number" feature="cardapio-digital" label="Cardápio" number="3" />
          <ShortcutsMenu application="menu" state="disabled" feature="reserva-de-mesa" label="Indisponível" disabled />
        </View>
      </PreviewSection>
      <PreviewSection label="Category">
        <ShortcutsMenu application="category" label="Restaurantes" onPress={() => {}} />
      </PreviewSection>
    </PreviewScreen>
  );
}
