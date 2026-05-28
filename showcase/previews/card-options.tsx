import { CardOptions } from '@vitrine-ds/react-native';
import React, { useState } from 'react';
import { View } from 'react-native';

import { PreviewScreen, PreviewSection, previewStyles } from '@/components/PreviewScreen';

export default function CardOptionsPreview() {
  const [selected, setSelected] = useState<'a' | 'b'>('a');

  return (
    <PreviewScreen title="Card Options" specFile="card-options.md">
      <PreviewSection label="Seleção">
        <View style={[previewStyles.column, previewStyles.maxWidth]}>
          <CardOptions
            title="Receber por e-mail"
            subtitle="Enviaremos o comprovante"
            state={selected === 'a' ? 'selected' : 'default'}
            onPress={() => setSelected('a')}
          />
          <CardOptions
            title="Receber por SMS"
            subtitle="Mensagem com o código"
            state={selected === 'b' ? 'selected' : 'default'}
            onPress={() => setSelected('b')}
          />
        </View>
      </PreviewSection>
    </PreviewScreen>
  );
}
