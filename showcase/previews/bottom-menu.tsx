import { BottomMenu, type BottomMenuItemType } from '@vitrine-ds/react-native';
import React, { useState } from 'react';

import { PreviewScreen, PreviewSection } from '@/components/PreviewScreen';

export default function BottomMenuPreview() {
  const [tab, setTab] = useState<BottomMenuItemType>('home');

  return (
    <PreviewScreen title="Bottom Menu">
      <PreviewSection label="Interativo">
        <BottomMenu activeTab={tab} onTabPress={setTab} />
      </PreviewSection>
    </PreviewScreen>
  );
}
