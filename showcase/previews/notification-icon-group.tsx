import {
  NotificationIconGroup,
  type NotificationIconGroupVariant,
} from '@vitrine-ds/react-native';
import React from 'react';
import { View } from 'react-native';

import { PreviewScreen, PreviewSection, previewStyles } from '@/components/PreviewScreen';

const VARIANTS: NotificationIconGroupVariant[] = [
  'default',
  'with-counter',
  'dot',
  'filled',
];

export default function NotificationIconGroupPreview() {
  return (
    <PreviewScreen title="Notification Icon Group">
      <PreviewSection label="Variantes">
        <View style={previewStyles.row}>
          {VARIANTS.map((variant) => (
            <NotificationIconGroup
              key={variant}
              variant={variant}
              count={variant === 'with-counter' ? 5 : undefined}
              onPress={() => {}}
              accessibilityLabel={`Notificações ${variant}`}
            />
          ))}
        </View>
      </PreviewSection>
    </PreviewScreen>
  );
}
