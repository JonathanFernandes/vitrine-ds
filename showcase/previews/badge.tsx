import { Badge, type BadgeStatus } from '@vitrine-ds/react-native';
import React from 'react';
import { View } from 'react-native';

import { PreviewScreen, PreviewSection, previewStyles } from '@/components/PreviewScreen';

const STATUSES: BadgeStatus[] = [
  'success',
  'warning',
  'error',
  'info',
  'neutral-1',
  'neutral-2',
  'neutral-3',
  'promo',
  'premiere',
  'blog',
  'filter-default',
  'filter-active',
  'disabled',
];

export default function BadgePreview() {
  return (
    <PreviewScreen title="Badge">
      <PreviewSection label="Status (medium)">
        <View style={previewStyles.row}>
          {STATUSES.map((status) => (
            <Badge key={status} status={status} label={status} />
          ))}
        </View>
      </PreviewSection>
      <PreviewSection label="Tamanho small">
        <View style={previewStyles.row}>
          <Badge status="success" size="small" label="Small" />
          <Badge status="info" size="small" label="Info" onPress={() => {}} />
        </View>
      </PreviewSection>
    </PreviewScreen>
  );
}
