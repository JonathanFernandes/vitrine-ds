import { BottomSheet } from '@vitrine-ds/react-native';
import React from 'react';
import { View } from 'react-native';

import { PreviewScreen, PreviewSection, previewStyles } from '@/components/PreviewScreen';

export default function BottomSheetPreview() {
  return (
    <PreviewScreen title="Bottom Sheet" specFile="bottom-sheet.md">
      <PreviewSection label="Type = simple">
        <View style={previewStyles.maxWidth}>
          <BottomSheet type="simple" title="Título do bottom sheet" onClose={() => {}} />
        </View>
      </PreviewSection>
      <PreviewSection label="Type = form">
        <View style={previewStyles.maxWidth}>
          <BottomSheet type="form" title="Preencha os dados" onClose={() => {}} />
        </View>
      </PreviewSection>
      <PreviewSection label="Type = benefits-list">
        <View style={previewStyles.maxWidth}>
          <BottomSheet type="benefits-list" title="Seus benefícios" onClose={() => {}} />
        </View>
      </PreviewSection>
      <PreviewSection label="Type = radio-options">
        <View style={previewStyles.maxWidth}>
          <BottomSheet type="radio-options" title="Escolha uma opção" onClose={() => {}} />
        </View>
      </PreviewSection>
    </PreviewScreen>
  );
}
