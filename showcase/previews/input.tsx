import { Input } from '@vitrine-ds/react-native';
import React, { useState } from 'react';
import { View } from 'react-native';

import { PreviewScreen, PreviewSection, previewStyles } from '@/components/PreviewScreen';

export default function InputPreview() {
  const [value, setValue] = useState('');

  return (
    <PreviewScreen title="Input">
      <PreviewSection label="Padrão">
        <View style={[previewStyles.column, previewStyles.maxWidth]}>
          <Input
            label="E-mail"
            placeholder="seu@email.com"
            value={value}
            onChangeText={setValue}
            helperText="Usaremos para enviar seus benefícios"
          />
        </View>
      </PreviewSection>
      <PreviewSection label="Estados">
        <View style={[previewStyles.column, previewStyles.maxWidth]}>
          <Input label="Erro" placeholder="Campo" error helperText="Campo obrigatório" />
          <Input label="Desabilitado" placeholder="Campo" disabled />
          <Input label="Somente leitura" value="Valor fixo" viewOnly />
          <Input
            label="Com cancelar"
            placeholder="Buscar"
            showCancel
            value={value}
            onChangeText={setValue}
            onCancel={() => setValue('')}
            onClear={() => setValue('')}
          />
        </View>
      </PreviewSection>
    </PreviewScreen>
  );
}
