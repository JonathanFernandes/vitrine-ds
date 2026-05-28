import { EventCard } from '@vitrine-ds/react-native';
import React from 'react';
import { View } from 'react-native';

import { PreviewScreen, PreviewSection, previewStyles } from '@/components/PreviewScreen';
import { SAMPLE_IMAGE_WIDE } from './shared';

export default function EventCardPreview() {
  return (
    <PreviewScreen title="Event Card">
      <PreviewSection label="Exemplo">
        <View style={previewStyles.cardWrap}>
          <EventCard
            imageUrl={SAMPLE_IMAGE_WIDE.uri}
            title="Festival de Jazz"
            date="15 Jun · 20h"
            tags={[
              { label: 'Música', status: 'info' },
              { label: 'Grátis', status: 'success' },
            ]}
            onPress={() => {}}
          />
        </View>
      </PreviewSection>
    </PreviewScreen>
  );
}
