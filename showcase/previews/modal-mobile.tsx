import { ModalMobile } from '@vitrine-ds/react-native';
import React from 'react';
import { View } from 'react-native';

import { PreviewScreen, PreviewSection, previewStyles } from '@/components/PreviewScreen';

export default function ModalMobilePreview() {
  return (
    <PreviewScreen title="Modal Mobile" specFile="modal-mobile.md">
      <PreviewSection label="Type = simples">
        <View style={previewStyles.maxWidth}>
          <ModalMobile
            type="simples"
            title="Confirmar ação"
            body="Deseja continuar com esta operação?"
            primaryLabel="Confirmar"
            secondaryLabel="Cancelar"
            linkLabel="Saiba mais"
            onClose={() => {}}
          />
        </View>
      </PreviewSection>
      <PreviewSection label="Type = destructive">
        <View style={previewStyles.maxWidth}>
          <ModalMobile
            type="destructive"
            title="Excluir item"
            body="Esta ação não pode ser desfeita."
            primaryLabel="Excluir"
            secondaryLabel="Voltar"
            linkLabel=""
            onClose={() => {}}
          />
        </View>
      </PreviewSection>
    </PreviewScreen>
  );
}
