import { HeaderHome } from '@vitrine-ds/react-native';
import React from 'react';

import { PreviewScreen, PreviewSection } from '@/components/PreviewScreen';

export default function HeaderHomePreview() {
  return (
    <PreviewScreen title="Header Home" contentStyle={{ paddingHorizontal: 0 }}>
      <PreviewSection label="Logada">
        <HeaderHome
          userName="Maria"
          membershipLabel="Nível 2"
          spentCurrentValue={350}
          spentTotalValue={500}
          purchasesCurrentValue={3}
          purchasesTotalValue={5}
          shortcutsVariant="hub-home-logada"
          notificationVariant="with-counter"
          notificationCount={3}
          onNotificationPress={() => {}}
          onInfoPress={() => {}}
        />
      </PreviewSection>
      <PreviewSection label="Deslogada">
        <HeaderHome shortcutsVariant="hub-home-deslogada" />
      </PreviewSection>
    </PreviewScreen>
  );
}
